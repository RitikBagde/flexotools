// src/app/contact/page.tsx
// SERVER COMPONENT wrapper — exports metadata, renders the client form component

import type { Metadata } from 'next'
import ContactForm from './ContactForm' // move the form JSX into ContactForm.tsx

export const metadata: Metadata = {
  title: 'Contact Us | FlexoTools',
  description:
    'Get in touch with the FlexoTools team. Report bugs, request features, ask questions or send feedback. We typically respond within 24-48 hours.',
  alternates: {
    canonical: 'https://flexotools.com/contact',
  },
}

export default function ContactPage() {
  return <ContactForm />
}