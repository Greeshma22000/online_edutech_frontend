"use client";
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CertificateView({ certificate, user, onClose }) {
  const certificateRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!certificateRef.current) {
      alert('Certificate element not found. Please try again.');
      return;
    }

    setIsDownloading(true);

    try {
      // Scroll to top to ensure certificate is visible
      certificateRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
      
      // Wait a bit to ensure rendering is complete
      await new Promise(resolve => setTimeout(resolve, 200));

      // Get the certificate element
      const element = certificateRef.current;
      
      // Convert to canvas with better options
      // Note: html2canvas doesn't support modern CSS color functions like oklch
      // So we need to use standard colors
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        ignoreElements: (el) => {
          // Ignore elements that might cause issues
          return false;
        },
        onclone: (clonedDoc) => {
          // Convert any modern CSS color functions to standard colors
          const clonedElement = clonedDoc.querySelector('[data-certificate-content]');
          if (clonedElement) {
            // Force standard colors
            const style = clonedElement.style;
            // This will be handled by inline styles
          }
        },
      });

      // Convert to image
      const imgData = canvas.toDataURL('image/png', 1.0);

      // Calculate dimensions for landscape A4
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate image dimensions to fit the PDF
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // If image is taller than PDF, scale it down
      let finalWidth = imgWidth;
      let finalHeight = imgHeight;
      
      if (imgHeight > pdfHeight) {
        finalHeight = pdfHeight;
        finalWidth = (canvas.width * pdfHeight) / canvas.height;
      }
      
      // Center the image
      const xOffset = (pdfWidth - finalWidth) / 2;
      const yOffset = (pdfHeight - finalHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);
      
      // Generate filename
      const filename = `Certificate_${(certificate.title || 'Course').replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.pdf`;
      
      // Save the PDF
      pdf.save(filename);
      
      setIsDownloading(false);
    } catch (error) {
      console.error('Error generating certificate:', error);
      setIsDownloading(false);
      alert('Failed to download certificate: ' + (error.message || 'Unknown error. Please try again.'));
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Certificate Preview</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundImage: 'linear-gradient(135deg,#6366f1 0%, #06b6d4 100%)' }}
            >
              {isDownloading ? 'Generating PDF...' : 'Download PDF'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Close
            </button>
          </div>
        </div>
        <div className="p-6">
          <div
            ref={certificateRef}
            data-certificate-content
            className="relative bg-white border-8 p-16 shadow-2xl"
            style={{
              backgroundColor: '#ffffff',
              background: 'linear-gradient(135deg, #fef3c7 0%, #ffffff 30%, #ffffff 70%, #fef3c7 100%)',
              borderColor: '#fbbf24',
              borderWidth: '8px',
              borderStyle: 'solid',
              minHeight: '700px',
              fontFamily: 'Georgia, serif',
              color: '#1f2937',
              overflow: 'hidden',
              boxSizing: 'border-box',
            }}
          >
            {/* Decorative Corner Elements - All inside borders */}
            <div className="absolute inset-0 pointer-events-none" style={{ padding: '8px' }}>
              {/* Top Left Corner */}
              <div className="absolute top-0 left-0 w-16 h-16">
                <div className="absolute top-0 left-0 w-10 h-10" style={{ borderTopWidth: '3px', borderLeftWidth: '3px', borderTopColor: '#d97706', borderLeftColor: '#d97706', borderTopStyle: 'solid', borderLeftStyle: 'solid' }}></div>
                <div className="absolute top-3 left-3 w-6 h-6" style={{ borderTopWidth: '2px', borderLeftWidth: '2px', borderTopColor: '#f59e0b', borderLeftColor: '#f59e0b', borderTopStyle: 'solid', borderLeftStyle: 'solid' }}></div>
              </div>
              {/* Top Right Corner */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-10 h-10" style={{ borderTopWidth: '3px', borderRightWidth: '3px', borderTopColor: '#d97706', borderRightColor: '#d97706', borderTopStyle: 'solid', borderRightStyle: 'solid' }}></div>
                <div className="absolute top-3 right-3 w-6 h-6" style={{ borderTopWidth: '2px', borderRightWidth: '2px', borderTopColor: '#f59e0b', borderRightColor: '#f59e0b', borderTopStyle: 'solid', borderRightStyle: 'solid' }}></div>
              </div>
              {/* Bottom Left Corner */}
              <div className="absolute bottom-0 left-0 w-16 h-16">
                <div className="absolute bottom-0 left-0 w-10 h-10" style={{ borderBottomWidth: '3px', borderLeftWidth: '3px', borderBottomColor: '#d97706', borderLeftColor: '#d97706', borderBottomStyle: 'solid', borderLeftStyle: 'solid' }}></div>
                <div className="absolute bottom-3 left-3 w-6 h-6" style={{ borderBottomWidth: '2px', borderLeftWidth: '2px', borderBottomColor: '#f59e0b', borderLeftColor: '#f59e0b', borderBottomStyle: 'solid', borderLeftStyle: 'solid' }}></div>
              </div>
              {/* Bottom Right Corner */}
              <div className="absolute bottom-0 right-0 w-16 h-16">
                <div className="absolute bottom-0 right-0 w-10 h-10" style={{ borderBottomWidth: '3px', borderRightWidth: '3px', borderBottomColor: '#d97706', borderRightColor: '#d97706', borderBottomStyle: 'solid', borderRightStyle: 'solid' }}></div>
                <div className="absolute bottom-3 right-3 w-6 h-6" style={{ borderBottomWidth: '2px', borderRightWidth: '2px', borderBottomColor: '#f59e0b', borderRightColor: '#f59e0b', borderBottomStyle: 'solid', borderRightStyle: 'solid' }}></div>
              </div>
              {/* Side Borders - Inside the certificate */}
              <div className="absolute top-24 left-8 right-8 h-0.5" style={{ background: 'linear-gradient(to right, transparent, #fcd34d, transparent)' }}></div>
              <div className="absolute bottom-24 left-8 right-8 h-0.5" style={{ background: 'linear-gradient(to right, transparent, #fcd34d, transparent)' }}></div>
            </div>

            {/* Header */}
            <div className="text-center mb-12 relative">
              <div className="text-7xl font-bold mb-3 tracking-wider" style={{ 
                fontFamily: 'Georgia, serif',
                color: '#92400e',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                letterSpacing: '0.1em'
              }}>
                CERTIFICATE
              </div>
              <div className="text-2xl font-semibold tracking-widest mb-4" style={{ 
                color: '#374151',
                letterSpacing: '0.2em' 
              }}>
                OF COMPLETION
              </div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-20 h-0.5" style={{ background: 'linear-gradient(to right, transparent, #d97706)' }}></div>
                <div className="text-2xl" style={{ color: '#d97706' }}>✦</div>
                <div className="w-20 h-0.5" style={{ background: 'linear-gradient(to left, transparent, #d97706)' }}></div>
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center my-16">
              <div className="text-xl mb-8 leading-relaxed" style={{ 
                fontFamily: 'Georgia, serif', 
                fontSize: '1.25rem',
                color: '#374151'
              }}>
                This is to certify that
              </div>
              <div className="text-5xl font-bold mb-8 py-6 px-8 inline-block" style={{ 
                fontFamily: 'Georgia, serif',
                color: '#111827',
                borderTopWidth: '4px',
                borderBottomWidth: '4px',
                borderTopColor: '#f59e0b',
                borderBottomColor: '#f59e0b',
                borderTopStyle: 'solid',
                borderBottomStyle: 'solid',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                letterSpacing: '0.05em'
              }}>
                {user?.name || user?.email || 'Student Name'}
              </div>
              <div className="text-xl mb-10 mt-8 leading-relaxed" style={{ 
                fontFamily: 'Georgia, serif', 
                fontSize: '1.25rem',
                color: '#374151'
              }}>
                has successfully completed the course
              </div>
              <div className="text-4xl font-bold mb-12 py-4 px-6 inline-block" style={{ 
                fontFamily: 'Georgia, serif',
                color: '#92400e',
                borderWidth: '2px',
                borderColor: '#fcd34d',
                borderStyle: 'solid',
                backgroundColor: '#fffbeb',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                letterSpacing: '0.03em'
              }}>
                {certificate.title}
              </div>
            </div>

            {/* Decorative Seal */}
            <div className="flex items-center justify-center mb-12">
              <div className="relative">
                <div className="w-40 h-40 rounded-full flex items-center justify-center" style={{
                  borderWidth: '4px',
                  borderColor: '#d97706',
                  borderStyle: 'solid',
                  background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}>
                  <div className="text-6xl">🎓</div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-bold whitespace-nowrap tracking-wider" style={{ color: '#92400e' }}>
                  EduVerse
                </div>
                <div className="absolute inset-0 rounded-full" style={{
                  borderWidth: '2px',
                  borderColor: '#fbbf24',
                  borderStyle: 'solid',
                  opacity: 0.5
                }}></div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-16 flex justify-between items-end px-8">
              <div className="flex-1 text-center">
                <div className="w-56 mx-auto pt-3" style={{ borderTopWidth: '2px', borderTopColor: '#6b7280', borderTopStyle: 'solid' }}>
                  <div className="text-sm font-bold mb-1" style={{ color: '#1f2937' }}>Instructor Signature</div>
                  <div className="text-xs" style={{ color: '#6b7280' }}>Course Instructor</div>
                </div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-base font-semibold mb-2" style={{ color: '#374151' }}>{currentDate}</div>
                <div className="w-56 mx-auto pt-3" style={{ borderTopWidth: '2px', borderTopColor: '#6b7280', borderTopStyle: 'solid' }}>
                  <div className="text-sm font-bold mb-1" style={{ color: '#1f2937' }}>Date of Completion</div>
                </div>
              </div>
              <div className="flex-1 text-center">
                <div className="w-56 mx-auto pt-3" style={{ borderTopWidth: '2px', borderTopColor: '#6b7280', borderTopStyle: 'solid' }}>
                  <div className="text-sm font-bold mb-1" style={{ color: '#1f2937' }}>EduVerse Official</div>
                  <div className="text-xs" style={{ color: '#6b7280' }}>Learning Platform</div>
                </div>
              </div>
            </div>

            {/* Certificate Number */}
            <div className="mt-8 text-center text-xs" style={{ color: '#6b7280' }}>
              Certificate ID: {certificate.id || 'CERT-' + Date.now()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
