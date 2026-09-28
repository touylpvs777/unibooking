import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";

export interface WatermarkOptions {
  investorName?: string;
  trackingId?: string;
  customText?: string;
}

/**
 * Stamps an enterprise security watermark diagonally across every page of a PDF document.
 * Includes tracking ID, investor identity, and ISO timestamp to prevent confidentiality leaks.
 */
export async function stampWatermarkOnPdf(
  pdfBuffer: Uint8Array | ArrayBuffer,
  options: WatermarkOptions = {}
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();

  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
  const investor = options.investorName || "CONFIDENTIAL INVESTOR";
  const trackingId = options.trackingId || `LUD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  const mainWatermarkText = options.customText || `LUD GROUP VDR • CONFIDENTIAL • ${investor.toUpperCase()}`;
  const subWatermarkText = `TRACKING ID: ${trackingId} • DOWNLOADED: ${timestamp}`;

  for (const page of pages) {
    const { width, height } = page.getSize();
    const fontSize = Math.max(14, Math.min(width, height) / 28);
    const subFontSize = fontSize * 0.55;

    // Center diagonal watermark
    page.drawText(mainWatermarkText, {
      x: width / 2 - (mainWatermarkText.length * fontSize) / 3.8,
      y: height / 2 + 10,
      size: fontSize,
      font: font,
      color: rgb(0.85, 0.2, 0.2), // Light red/coral security tint
      opacity: 0.22,
      rotate: degrees(35),
    });

    page.drawText(subWatermarkText, {
      x: width / 2 - (subWatermarkText.length * subFontSize) / 3.8,
      y: height / 2 - fontSize * 1.2,
      size: subFontSize,
      font: font,
      color: rgb(0.3, 0.3, 0.3),
      opacity: 0.25,
      rotate: degrees(35),
    });

    // Top-right security header badge
    page.drawText(`VDR AUDIT TRAIL: ${trackingId} | ${timestamp}`, {
      x: 30,
      y: height - 20,
      size: 7,
      font: font,
      color: rgb(0.5, 0.5, 0.5),
      opacity: 0.5,
    });

    // Bottom footer confidentiality notice
    page.drawText("RESTRICTED ACCESS • PROPERTY OF LUD HOLDING SOLE CO., LTD. • UNAUTHORIZED SHARING STRICTLY PROHIBITED", {
      x: 30,
      y: 15,
      size: 6.5,
      font: font,
      color: rgb(0.6, 0.1, 0.1),
      opacity: 0.5,
    });
  }

  return await pdfDoc.save();
}
