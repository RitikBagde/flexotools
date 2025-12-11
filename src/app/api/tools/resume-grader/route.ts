import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ============================================================================
// RATE LIMITING
// ============================================================================

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  if (forwarded) return forwarded.split(',')[0].trim();
  if (realIp) return realIp;
  if (cfConnectingIp) return cfConnectingIp;
  
  return 'unknown';
}

async function checkRateLimit(ip: string): Promise<{ 
  allowed: boolean; 
  remaining: number; 
  resetTime: number 
}> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour ago

  const { data: existingRecord } = await supabase
    .from('text_tool_rate_limits')
    .select('*')
    .eq('ip', ip)
    .gte('window_start', windowStart.toISOString())
    .single();

  if (!existingRecord) {
    return {
      allowed: true,
      remaining: 4, // 5 total per hour
      resetTime: now.getTime() + 60 * 60 * 1000
    };
  }

  if (existingRecord.count >= 5) {
    const resetTime = new Date(existingRecord.window_start).getTime() + 60 * 60 * 1000;
    return {
      allowed: false,
      remaining: 0,
      resetTime
    };
  }

  const resetTime = new Date(existingRecord.window_start).getTime() + 60 * 60 * 1000;
  return {
    allowed: true,
    remaining: 5 - existingRecord.count ,
    resetTime
  };
}

async function incrementRateLimit(ip: string): Promise<void> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - 60 * 60 * 1000);

  const { data: existingRecord } = await supabase
    .from('text_tool_rate_limits')
    .select('*')
    .eq('ip', ip)
    .gte('window_start', windowStart.toISOString())
    .single();

  if (existingRecord) {
    await supabase
      .from('text_tool_rate_limits')
      .update({ count: existingRecord.count + 1 })
      .eq('id', existingRecord.id);
  } else {
    await supabase
      .from('text_tool_rate_limits')
      .insert({
        ip,
        window_start: now.toISOString(),
        count: 1
      });
  }
}

// ============================================================================
// PDF TEXT EXTRACTION (using pdf-parse-fork)
// ============================================================================

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    console.log('Starting PDF text extraction with pdf-parse-fork...');
    const pdfParse = (await import('pdf-parse-fork')).default;
    const data = await pdfParse(buffer);
    
    console.log('PDF parsed successfully');
    console.log('Pages:', data.numpages);
    console.log('Extracted text length:', data.text.length);
    console.log('First 200 chars:', data.text.substring(0, 200));
    
    return data.text.trim();
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF. Ensure your resume is not password-protected or corrupted.');
  }
}

// ============================================================================
// ENHANCED RESUME ANALYSIS - REALISTIC & DETAILED
// ============================================================================

interface ResumeAnalysis {
  score: number;
  strengths: string[];
  weaknesses: string[];
  tips: string[];
}

function analyzeResume(text: string): ResumeAnalysis {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const tips: string[] = [];
  let score = 0;

  // Clean text for analysis
  const cleanText = text.toLowerCase();
  const words = text.split(/\s+/).length;
  const lines = text.split('\n').filter(line => line.trim().length > 0).length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20).length;

  console.log('Analysis starting - Words:', words, 'Lines:', lines, 'Sentences:', sentences);

  // ========================================
  // 1. LENGTH & STRUCTURE (20 points)
  // ========================================
  if (words >= 300 && words <= 600) {
    score += 20;
    strengths.push(`Optimal resume length with ${words} words - concise yet comprehensive. This length ensures recruiters can quickly scan while getting sufficient detail about your qualifications.`);
  } else if (words >= 200 && words < 300) {
    score += 14;
    weaknesses.push(`Your resume is somewhat brief at ${words} words. While conciseness is valued, you may be missing opportunities to showcase your achievements and responsibilities in detail.`);
    tips.push('Expand each role to include 3-5 bullet points with specific accomplishments. Aim for 350-500 words total to provide adequate context without overwhelming readers.');
  } else if (words >= 600 && words <= 900) {
    score += 16;
    weaknesses.push(`At ${words} words, your resume is on the longer side. Busy recruiters typically spend only 6-7 seconds on initial screening, so brevity is crucial.`);
    tips.push('Edit ruthlessly: Remove redundant phrases, combine similar points, and focus on your most impressive 2-3 achievements per role. Target 400-600 words.');
  } else if (words > 900) {
    score += 10;
    weaknesses.push(`Your resume is significantly lengthy (${words} words), which may cause recruiters to miss key information. Most effective resumes fit on 1-2 pages.`);
    tips.push('Prioritize impact over volume. Keep only achievements from the last 10-15 years, remove older positions or summarize them briefly, and eliminate generic responsibilities.');
  } else {
    score += 8;
    weaknesses.push(`Your resume is very short at ${words} words, suggesting insufficient detail about your experience and achievements. This makes it difficult for employers to evaluate your qualifications.`);
    tips.push('Add substantial detail: Include 3-5 bullet points per position, quantify your achievements, and describe the scope of your responsibilities. Target at least 300 words.');
  }

  // ========================================
  // 2. CONTACT INFORMATION (12 points)
  // ========================================
  const hasEmail = /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/i.test(text);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text);
  const hasLinkedIn = /linkedin\.com|linkedin/i.test(text);
  const hasGitHub = /github\.com|github/i.test(text);
  const hasPortfolio = /portfolio|website|personal site|behance|dribbble/i.test(text);
  
  let contactScore = 0;
  const contactMissing: string[] = [];
  
  if (hasEmail) {
    contactScore += 5;
  } else {
    contactMissing.push('professional email');
  }
  
  if (hasPhone) {
    contactScore += 4;
  } else {
    contactMissing.push('phone number');
  }
  
  if (hasLinkedIn) {
    contactScore += 2;
  } else {
    contactMissing.push('LinkedIn URL');
  }
  
  if (hasGitHub || hasPortfolio) {
    contactScore += 1;
  }
  
  score += contactScore;
  
  if (contactScore >= 11) {
    strengths.push('Complete professional contact information is prominently displayed, making it easy for recruiters to reach you through multiple channels.');
  } else if (contactScore >= 7) {
    weaknesses.push(`Contact information is incomplete - missing ${contactMissing.slice(0, 2).join(' and ')}. This creates friction in the hiring process and may cause recruiters to skip your application.`);
    tips.push(`Add missing contact details at the top of your resume. LinkedIn profiles increase callback rates by 71% according to recruitment studies.`);
  } else {
    weaknesses.push(`Critical contact information is missing (${contactMissing.join(', ')}). Without easy ways to contact you, recruiters will move on to other candidates.`);
    tips.push('Include at minimum: professional email address, phone number with area code, and LinkedIn profile URL. Consider adding a portfolio or GitHub link if relevant to your field.');
  }

  // ========================================
  // 3. QUANTIFIED ACHIEVEMENTS (28 points)
  // ========================================
  const percentages = text.match(/\d+%/g) || [];
  const dollarAmounts = text.match(/\$[\d,]+[kmb]?/gi) || [];
  const timeframes = text.match(/\d+\s*(year|month|week|day|hour)s?/gi) || [];
  const counts = text.match(/\d{2,}(?![\d%])\s*(user|customer|client|project|team member|employee|sale|lead|report|product)/gi) || [];
  const multipliers = text.match(/\d+x\s|grew\s+(?:by\s+)?\d+/gi) || [];
  
  const totalMetrics = percentages.length + dollarAmounts.length + counts.length + multipliers.length;
  const metricsPerHundredWords = (totalMetrics / words) * 100;
  
  console.log('Metrics breakdown - Percentages:', percentages.length, 'Dollar amounts:', dollarAmounts.length, 
              'Counts:', counts.length, 'Total:', totalMetrics, 'Density:', metricsPerHundredWords.toFixed(2));
  
  if (totalMetrics >= 8 && metricsPerHundredWords >= 1.5) {
    score += 28;
    strengths.push(`Exceptional use of quantification with ${totalMetrics} specific metrics throughout your resume. You effectively demonstrate measurable impact, which is exactly what hiring managers look for. This data-driven approach significantly strengthens your candidacy.`);
  } else if (totalMetrics >= 5 && metricsPerHundredWords >= 1.0) {
    score += 22;
    strengths.push(`Good quantification with ${totalMetrics} measurable results. Your achievements have concrete numbers backing them up, making your contributions tangible and credible.`);
    tips.push('To reach excellence, add 2-3 more quantified achievements. Consider: budget sizes managed, team sizes led, percentage improvements, or timelines beaten.');
  } else if (totalMetrics >= 3) {
    score += 14;
    weaknesses.push(`Limited quantification - only ${totalMetrics} metrics found. While some impact is demonstrated, most of your accomplishments lack specific numbers, making it harder for employers to gauge your effectiveness.`);
    tips.push('CRITICAL: Add numbers to at least 60-70% of your bullet points. Transform "improved system performance" into "improved system performance by 45%, reducing load time from 8s to 4.4s." Be specific with team sizes, budgets, timelines, and outcomes.');
  } else if (totalMetrics >= 1) {
    score += 8;
    weaknesses.push(`Severely lacking quantification with only ${totalMetrics} metric(s). Your resume reads as a job description rather than a track record of achievements. Numbers are crucial for credibility.`);
    tips.push('ACTION REQUIRED: Add specific metrics to every accomplishment. Ask yourself: How many? How much? How fast? What percentage? Examples: "Managed $2M budget", "Led team of 12", "Increased sales 35%", "Reduced costs by $50K annually".');
  } else {
    score += 4;
    weaknesses.push('No quantified achievements found. Your resume lacks any measurable results, making it impossible for employers to assess your actual impact. This is a critical weakness that will significantly hurt your chances.');
    tips.push('URGENT: Every bullet point should include a number. Start with: How many people/projects did you work with? What was the timeline? What results did you achieve? Even estimates are better than no numbers.');
  }

  // ========================================
  // 4. ACTION VERBS & LANGUAGE QUALITY (16 points)
  // ========================================
  const strongVerbs = [
    'achieved', 'accelerated', 'accomplished', 'improved', 'increased', 'boosted',
    'decreased', 'reduced', 'managed', 'led', 'directed', 'spearheaded', 'pioneered',
    'developed', 'created', 'designed', 'engineered', 'architected', 'built',
    'implemented', 'launched', 'deployed', 'delivered', 'established', 'founded',
    'optimized', 'streamlined', 'automated', 'transformed', 'restructured',
    'generated', 'exceeded', 'surpassed', 'collaborated', 'partnered',
    'analyzed', 'researched', 'identified', 'diagnosed', 'resolved',
    'coordinated', 'orchestrated', 'executed', 'initiated', 'drove',
    'trained', 'mentored', 'coached', 'facilitated'
  ];
  
  const weakPhrases = [
    'responsible for', 'duties include', 'worked on', 'helped with', 'assisted with',
    'involved in', 'participated in', 'tasked with', 'in charge of'
  ];
  
  let verbCount = 0;
  const verbsUsed: string[] = [];
  strongVerbs.forEach(verb => {
    const regex = new RegExp(`\\b${verb}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) {
      verbCount += matches.length;
      verbsUsed.push(verb);
    }
  });
  
  let weakPhraseCount = 0;
  weakPhrases.forEach(phrase => {
    const matches = cleanText.match(new RegExp(phrase, 'g'));
    if (matches) weakPhraseCount += matches.length;
  });
  
  console.log('Strong verbs found:', verbCount, 'Weak phrases:', weakPhraseCount);
  
  if (verbCount >= 12 && weakPhraseCount === 0) {
    score += 16;
    strengths.push(`Outstanding use of ${verbCount} strong action verbs with no passive language. Your resume demonstrates clear ownership of achievements and creates a dynamic, engaging narrative that captures attention.`);
  } else if (verbCount >= 8 && weakPhraseCount <= 1) {
    score += 13;
    strengths.push(`Good use of action verbs throughout your resume, creating an active and engaging tone. Your language effectively conveys initiative and impact.`);
  } else if (verbCount >= 5) {
    score += 9;
    weaknesses.push(`Moderate action verb usage (${verbCount} instances), but your resume would benefit from more dynamic language. ${weakPhraseCount > 0 ? `Found ${weakPhraseCount} instances of weak phrases like "responsible for" which dilute impact.` : ''}`);
    tips.push('Replace weak phrases with strong action verbs. Instead of "Responsible for managing a team," write "Led team of 8 engineers." Start each bullet with an achievement-focused verb: achieved, drove, delivered, optimized.');
  } else {
    score += 5;
    weaknesses.push(`Weak language throughout with only ${verbCount} action verbs and ${weakPhraseCount} instances of passive phrases. Your resume reads like a job description rather than an achievement record, significantly reducing its impact.`);
    tips.push('REWRITE all bullet points to start with powerful action verbs. Never use "responsible for" or "duties included." Show what you accomplished, not what you were supposed to do. Example: Transform "Responsible for database maintenance" to "Optimized database performance, reducing query time by 60%".');
  }

  // ========================================
  // 5. ESSENTIAL SECTIONS (18 points)
  // ========================================
  const hasExperience = /(experience|work history|employment|professional experience|career history)/i.test(text);
  const hasProjects = /(projects|portfolio|work samples)/i.test(text);
  const hasEducation = /(education|academic|degree|university|college|pursuing|bvoc|btech|mtech|bachelor|master|phd)/i.test(text);
  const hasSkills = /(skills|technical skills|competencies|expertise|proficiencies|technologies|core competencies)/i.test(text);
  const hasCertifications = /(certification|certificate|licensed|accredited)/i.test(text);
  
  let sectionScore = 0;
  const missingSections: string[] = [];
  
  if (hasExperience || hasProjects) {
    sectionScore += 8;
  } else {
    missingSections.push('Experience/Projects');
  }
  
  if (hasEducation) {
    sectionScore += 6;
  } else {
    missingSections.push('Education');
  }
  
  if (hasSkills) {
    sectionScore += 4;
  } else {
    missingSections.push('Skills');
  }
  
  score += sectionScore;
  
  if (sectionScore >= 17) {
    strengths.push('Comprehensive structure with all essential sections clearly organized. Your resume is easy to navigate and ensures recruiters can quickly find relevant information.');
  } else if (sectionScore >= 12) {
    if (missingSections.length > 0) {
      weaknesses.push(`Resume structure is incomplete - missing ${missingSections.join(' and ')} section${missingSections.length > 1 ? 's' : ''}. These are standard sections that recruiters expect to see.`);
      tips.push(`Add ${missingSections[0]} section to meet industry standards. ${missingSections[0] === 'Skills' ? 'List 8-12 relevant technical and professional skills to improve ATS matching.' : ''}`);
    }
  } else {
    weaknesses.push(`Critical sections missing: ${missingSections.join(', ')}. Your resume lacks the fundamental structure expected by hiring managers and ATS systems.`);
    tips.push('Restructure your resume to include these essential sections in order: Contact → Summary (optional) → Experience → Education → Skills. This standard format ensures compatibility with applicant tracking systems.');
  }
  
  console.log('Sections - Experience:', hasExperience, 'Projects:', hasProjects, 'Education:', hasEducation, 'Skills:', hasSkills);

  // ========================================
  // 6. FORMATTING & READABILITY (12 points)
  // ========================================
  const bulletPoints = (text.match(/[•\-\*●○]\s/g) || []).length;
  const hasDates = /\b(20\d{2}|19[89]\d)\b|\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+20\d{2}|\b(present|current)\b/i.test(text);
  const hasConsistentDates = (text.match(/\b(20\d{2}|19[89]\d)\b/g) || []).length >= 2;
  const properNouns = (text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g) || []).length;
  
  console.log('Format analysis - Bullets:', bulletPoints, 'Has dates:', hasDates, 'Consistent dates:', hasConsistentDates, 'Proper nouns:', properNouns);
  
  let formatScore = 0;
  
  if (bulletPoints >= 10 && hasConsistentDates) {
    formatScore = 12;
    strengths.push(`Excellent formatting with ${bulletPoints} well-organized bullet points and consistent date formatting. Your resume is highly scannable, allowing recruiters to quickly extract key information.`);
  } else if (bulletPoints >= 6 && hasDates) {
    formatScore = 9;
    weaknesses.push(`Formatting is adequate but could be improved. ${bulletPoints < 8 ? `Consider using more bullet points (aim for 3-5 per position) for better readability.` : ''} ${!hasConsistentDates ? 'Date formatting appears inconsistent.' : ''}`);
    tips.push('Use bullet points consistently throughout, with 3-5 per role. Format dates uniformly (e.g., "Jan 2020 - Present" or "2020-Present") and align them for visual consistency.');
  } else if (bulletPoints >= 3 || hasDates) {
    formatScore = 5;
    weaknesses.push(`Poor formatting significantly impacts readability. ${bulletPoints < 4 ? 'Insufficient bullet points make your resume look like dense paragraphs.' : ''} ${!hasDates ? 'Missing or unclear dates make it difficult to assess your experience timeline.' : ''}`);
    tips.push('Critical formatting fixes needed: (1) Convert all paragraph text into bullet points, (2) Add clear dates to all positions and education, (3) Use consistent spacing and alignment, (4) Limit each bullet to 1-2 lines.');
  } else {
    formatScore = 2;
    weaknesses.push('Severely poor formatting with minimal structure. Dense paragraphs without bullets, missing dates, and lack of visual hierarchy make your resume difficult to read. Most recruiters will skip poorly formatted resumes.');
    tips.push('MAJOR REFORMAT NEEDED: Break all content into bullet points, add dates to every position, use bold for company/role names, ensure consistent spacing, and create clear section headers. Consider using a professional resume template.');
  }
  
  score += formatScore;

  // ========================================
  // 7. KEYWORD OPTIMIZATION & ATS (9 points)
  // ========================================
  const technicalTerms = text.match(/\b[A-Z]{2,}\b|\b[A-Z][a-z]+(?:[A-Z][a-z]+)+\b/g) || [];
  const industryKeywords = cleanText.match(/\b(agile|scrum|devops|cloud|saas|api|database|analytics|strategy|leadership|stakeholder|roi|kpi|automation|optimization|compliance|budget|revenue|customer|client|team|project management)\b/g) || [];
  
  const uniqueKeywords = new Set([...technicalTerms, ...industryKeywords]).size;
  
  console.log('Keywords found:', uniqueKeywords);
  
  if (uniqueKeywords >= 18) {
    score += 9;
    strengths.push(`Strong keyword optimization with ${uniqueKeywords} industry-relevant terms. Your resume is well-positioned to pass Applicant Tracking Systems (ATS) and match job descriptions effectively.`);
  } else if (uniqueKeywords >= 10) {
    score += 7;
    tips.push('Good keyword presence, but you can improve ATS compatibility by reviewing target job descriptions and incorporating 5-8 more relevant technical terms or industry buzzwords that match your experience.');
  } else if (uniqueKeywords >= 5) {
    score += 4;
    weaknesses.push(`Limited keyword optimization (${uniqueKeywords} industry terms found). Many companies use ATS software that filters resumes based on keyword matching - your resume may not pass these initial screens.`);
    tips.push('Analyze 3-5 target job postings and identify common keywords. Naturally incorporate these terms into your experience descriptions. Include: technologies used, methodologies followed, and industry-standard terminology.');
  } else {
    score += 2;
    weaknesses.push('Severely lacking industry keywords and technical terminology. Your resume will likely be filtered out by ATS systems before any human reviewer sees it.');
    tips.push('URGENT ATS FIX: Add specific technologies, tools, methodologies, and industry terms relevant to your field. Use exact terms from job postings (e.g., "Python, AWS, Agile" rather than generic "programming").');
  }

  // ========================================
  // PENALTIES (Critical Issues)
  // ========================================
  
  // Personal pronouns penalty
  const firstPersonPronouns = cleanText.match(/\b(i\s|i'm|i've|my\s|me\s)/g) || [];
  if (firstPersonPronouns.length >= 5) {
    score -= 10;
    weaknesses.push(`Excessive use of personal pronouns (${firstPersonPronouns.length} instances of "I", "my", "me"). Resumes should be written in third person without pronouns - this is a fundamental resume writing standard.`);
    tips.push('Remove ALL personal pronouns immediately. Change "I managed a team of 10" to "Managed team of 10 engineers." This makes your resume more professional and impactful.');
  } else if (firstPersonPronouns.length >= 2) {
    score -= 5;
    weaknesses.push('Contains personal pronouns which is non-standard for resumes. Professional resumes use implied first person (no "I" or "my").');
    tips.push('Edit out pronouns: "Developed software" not "I developed software". This is industry standard.');
  }
  
  // Spelling/grammar red flags (very basic check)
  const commonErrors = cleanText.match(/\b(recieve|occurence|seperaate|managment|experiance|sucessful|acheivement)\b/g);
  if (commonErrors && commonErrors.length > 0) {
    score -= 7;
    weaknesses.push('Spelling errors detected. Even minor typos signal lack of attention to detail and can eliminate you from consideration.');
    tips.push('Proofread carefully and use spell-check. Have 2-3 people review your resume. Common resume killers: misspelled company names, incorrect dates, and grammar mistakes.');
  }
  
  // Too many generic buzzwords without substance
  const fluff = cleanText.match(/\b(hardworking|team player|detail-oriented|self-motivated|go-getter|passionate|innovative|dynamic|results-driven|motivated|dedicated)\b/g) || [];
  if (fluff.length >= 5) {
    score -= 4;
    weaknesses.push('Overuse of generic buzzwords without supporting evidence. Phrases like "team player" and "detail-oriented" are empty claims - show these qualities through specific achievements instead.');
    tips.push('Replace buzzwords with evidence. Instead of "detail-oriented," write "Identified and fixed 47 bugs in legacy code, improving system stability by 99.8%." Show, don\'t tell.');
  }

  // ========================================
  // BONUS POINTS
  // ========================================
  
  // Has professional summary (well-crafted)
  const hasSummary = /(professional summary|career summary|about|profile|objective)/i.test(text);
  const summaryMatch = text.match(/(professional summary|career summary|about|profile)[:\s]+([^]*?)(?=\n\n|\nexperience|\neducation|\nskills)/i);
  if (hasSummary && summaryMatch && summaryMatch[2].split(' ').length >= 30) {
    score += 3;
    strengths.push('Includes a substantive professional summary that provides context and highlights key qualifications, helping recruiters quickly understand your value proposition.');
  }
  
  // Has achievements section or highlights
  if (/(achievements|accomplishments|highlights|awards)/i.test(text)) {
    score += 2;
    strengths.push('Dedicated achievements or awards section showcases your standout accomplishments prominently.');
  }
  
  // Evidence of career progression
  const jobTitles = text.match(/(senior|lead|principal|manager|director|head|chief|vp|vice president)/gi) || [];
  if (jobTitles.length >= 2) {
    score += 2;
    strengths.push('Shows clear career progression with increasing responsibility levels, which demonstrates growth potential and ambition.');
  }

  // ========================================
  // QUALITY ASSURANCE
  // ========================================
  
  // Ensure minimum strengths with realistic details
  if (strengths.length === 0) {
    if (bulletPoints >= 3) {
      strengths.push('Resume uses bullet point formatting which aids readability and allows recruiters to scan efficiently.');
    } else if (words >= 200) {
      strengths.push('Resume provides sufficient detail about work history to understand your background.');
    }
  }
  
  // Ensure we have specific, actionable feedback
  if (weaknesses.length < 2) {
    const additionalWeaknesses = [
      'Lacks specific examples that demonstrate problem-solving abilities or unique contributions that distinguish you from other candidates.',
      'Missing context about company size, industry, or project scope which helps employers gauge the relevance of your experience.',
      'Insufficient emphasis on achievements vs. responsibilities - focus more on outcomes rather than day-to-day tasks.'
    ];
    
    for (const weakness of additionalWeaknesses) {
      if (weaknesses.length >= 4) break;
      if (!weaknesses.some(w => w.includes('specific examples') && weakness.includes('specific examples'))) {
        weaknesses.push(weakness);
      }
    }
  }
  
  // Ensure actionable, specific tips
  if (tips.length < 3) {
    const additionalTips = [
      'Tailor your resume for each application: Match 60-70% of keywords from the job description, reorder bullets to highlight relevant experience, and adjust your summary to align with the role.',
      'Add context to your experience: Include company size, industry, budget managed, team size, or project scope to help employers understand the scale of your responsibilities.',
      'Use the CAR method (Challenge-Action-Result) for bullets: What problem did you face? What did you do? What was the measurable outcome?',
      'Review formatting for ATS compatibility: Avoid tables, text boxes, headers/footers, images, or unusual fonts. Use standard section headers and save as PDF.'
    ];
    
    for (const tip of additionalTips) {
      if (tips.length >= 6) break;
      tips.push(tip);
    }
  }

  // ========================================
  // REALISTIC SCORE CALIBRATION
  // ========================================
  
  // Apply stricter scoring curve to prevent grade inflation
  // Target distribution:
  // Excellent resumes (truly outstanding): 75-85
  // Good resumes (above average): 60-74
  // Average resumes (solid): 50-59
  // Below average resumes: 35-49
  // Poor resumes: 25-34
  
  // Apply compression to prevent inflation
  if (score > 85) {
    score = 82 + (score - 85) * 0.2; // Heavy compression above 85
  } else if (score > 75) {
    score = 72 + (score - 75) * 0.6; // Moderate compression 75-85
  } else if (score > 65) {
    score = 62 + (score - 65) * 0.8; // Light compression 65-75
  }
  
  score = Math.round(score);
  score = Math.max(28, Math.min(score, 85)); // Hard cap at 85
  
  console.log('Final calibrated score:', score);
  console.log('Feedback - Strengths:', strengths.length, 'Weaknesses:', weaknesses.length, 'Tips:', tips.length);

  return {
    score,
    strengths: strengths.slice(0, 5),
    weaknesses: weaknesses.slice(0, 4),
    tips: tips.slice(0, 6)
  };
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    console.log('=== Resume Grader Request Started ===');
    
    // Check for admin bypass
    const bypassKey = request.headers.get('x-bypass-key');
    const shouldBypass = bypassKey === process.env.ADMIN_BYPASS_KEY;

    // Rate limit check
    if (!shouldBypass) {
      const clientIP = getClientIP(request);
      console.log('Checking rate limit for IP:', clientIP);
      
      const rateLimitCheck = await checkRateLimit(clientIP);

      if (!rateLimitCheck.allowed) {
        const minutesRemaining = Math.ceil((rateLimitCheck.resetTime - Date.now()) / (1000 * 60));
        return NextResponse.json(
          { 
            error: `Rate limit exceeded. You can grade 5 resumes per hour. Try again in ${minutesRemaining} minute${minutesRemaining !== 1 ? 's' : ''}.`,
            rateLimitExceeded: true,
            resetTime: rateLimitCheck.resetTime
          },
          { status: 429 }
        );
      }
      
      console.log('Rate limit check passed. Remaining:', rateLimitCheck.remaining);
    }

    // Get file from request
    console.log('Parsing form data...');
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.log('Error: No file provided');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    console.log('File received:', file.name, 'Size:', file.size, 'Type:', file.type);

    if (file.type !== 'application/pdf') {
      console.log('Error: Invalid file type:', file.type);
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      console.log('Error: File too large:', file.size);
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    // Convert to buffer for pdf-parse-fork
    console.log('Converting to buffer...');
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Extract text from PDF
    const resumeText = await extractTextFromPDF(buffer);

    if (!resumeText || resumeText.length < 100) {
      console.log('Error: Insufficient text extracted. Length:', resumeText?.length || 0);
      return NextResponse.json(
        { error: 'Could not extract enough text from PDF. Ensure your resume contains selectable text (not scanned images).' },
        { status: 400 }
      );
    }

    // Analyze resume
    console.log('Analyzing resume...');
    const result = analyzeResume(resumeText);
    console.log('Analysis complete. Score:', result.score);

    // Increment rate limit after success
    if (!shouldBypass) {
      const clientIP = getClientIP(request);
      await incrementRateLimit(clientIP);

      const updatedRateLimit = await checkRateLimit(clientIP);
      
      return NextResponse.json({
        ...result,
        rateLimitInfo: {
          remaining: updatedRateLimit.remaining,
          resetTime: updatedRateLimit.resetTime
        }
      });
    }
    
    return NextResponse.json(result);

  } catch (error) {
    console.error('=== Resume grading error ===', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to grade resume. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Resume Grader API',
    usage: 'POST a PDF resume file',
    rateLimit: '5 resumes per hour per IP',
  });
}