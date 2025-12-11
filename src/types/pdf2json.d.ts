declare module 'pdf2json' {
  class PDFParser {
    constructor();
    on(event: 'pdfParser_dataError', handler: (errData: any) => void): void;
    on(event: 'pdfParser_dataReady', handler: (pdfData: any) => void): void;
    loadPDF(pdfFilePath: string): void;
  }
  
  export = PDFParser;
}