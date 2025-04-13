import { useState, useRef } from 'react';
import styles from './ImageToPDF.module.css';

const ImageToPDF = () => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [options, setOptions] = useState({
    pageSize: 'A4',
    orientation: 'portrait',
    margin: 10,
    imageFit: 'fit',
    pdfName: '',
    pageNumbers: true,
  });

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Supported image formats
  const supportedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  // Reset component state
  const reset = () => {
    setImages([]);
    setPdfUrl(null);
    setError('');
    setIsProcessing(false);
    setCurrentStep(1);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  // Handle drag-and-drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  // Process uploaded files
  const processFiles = (files) => {
    setError('');
    const validFiles = files.filter(file => supportedFormats.includes(file.type));
    
    if (validFiles.length === 0) {
      setError('No supported image files found. Supported formats: JPG, PNG, GIF, WEBP.');
      return;
    }

    const processedImages = validFiles.map(file => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setImages(prev => [...prev, ...processedImages]);
    setCurrentStep(2);
  };

  // Remove image
  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  // Reorder images
  const moveImage = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setImages(newImages);
  };

  // Handle option changes
  const handleOptionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value,
    }));
  };

  // Generate PDF from images
  const generatePDF = async () => {
    if (images.length === 0) {
      setError('Please upload at least one image.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Create PDF manually
      const pdfBlob = await generatePDFFromImages(images, options);
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      
      // Set default PDF name
      if (!options.pdfName) {
        const defaultName = images.length === 1 
          ? `${images[0].name.replace(/\.[^/.]+$/, '')}.pdf`
          : 'converted_images.pdf';
        setOptions(prev => ({ ...prev, pdfName: defaultName }));
      }

      setCurrentStep(3);
    } catch (err) {
      console.error('PDF generation error:', err);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Download PDF
  const downloadPDF = () => {
    if (!pdfUrl) return;
    
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = options.pdfName || 'converted.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Image to PDF Converter</h1>
        <p>Convert your images to a single PDF document</p>
      </header>

      {/* Progress Steps */}
      <div className={styles.steps}>
        <div className={`${styles.step} ${currentStep >= 1 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepLabel}>Upload Images</div>
        </div>
        <div className={`${styles.step} ${currentStep >= 2 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepLabel}>Set Options</div>
        </div>
        <div className={`${styles.step} ${currentStep >= 3 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepLabel}>Download PDF</div>
        </div>
      </div>

      {/* Step 1: Upload Images */}
      {currentStep === 1 && (
        <section className={styles.uploadSection}>
          <div
            ref={dropZoneRef}
            className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className={styles.dropZoneContent}>
              <svg className={styles.uploadIcon} viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              <h3>Drag & Drop Images Here</h3>
              <p>or</p>
              <button
                className={styles.browseButton}
                onClick={() => fileInputRef.current.click()}
              >
                Browse Files
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={supportedFormats.join(',')}
                multiple
                hidden
              />
              <p className={styles.supportedFormats}>
                Supported formats: JPG, PNG, GIF, WEBP
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Step 2: Options & Preview */}
      {currentStep === 2 && (
        <section className={styles.optionsSection}>
          <div className={styles.previewAndOptions}>
            {/* Image Preview */}
            <div className={styles.imagePreview}>
              <h3>Selected Images ({images.length})</h3>
              
              {images.length > 0 && (
                <div className={styles.imageList}>
                  {images.map((image, index) => (
                    <div key={image.id} className={styles.imageItem}>
                      <div className={styles.imageInfo}>
                        <span className={styles.imageName}>{image.name}</span>
                        <span className={styles.imageSize}>{formatFileSize(image.size)}</span>
                      </div>
                      <div className={styles.imageActions}>
                        {index > 0 && (
                          <button
                            className={styles.moveButton}
                            onClick={() => moveImage(index, index - 1)}
                            aria-label="Move up"
                          >
                            ↑
                          </button>
                        )}
                        {index < images.length - 1 && (
                          <button
                            className={styles.moveButton}
                            onClick={() => moveImage(index, index + 1)}
                            aria-label="Move down"
                          >
                            ↓
                          </button>
                        )}
                        <button
                          className={styles.removeButton}
                          onClick={() => removeImage(image.id)}
                          aria-label="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PDF Options */}
            <div className={styles.pdfOptions}>
              <h3>PDF Options</h3>
              
              <div className={styles.optionGroup}>
                <label htmlFor="pageSize">Page Size:</label>
                <select
                  id="pageSize"
                  name="pageSize"
                  value={options.pageSize}
                  onChange={handleOptionChange}
                >
                  <option value="A4">A4 (210 × 297 mm)</option>
                  <option value="Letter">Letter (216 × 279 mm)</option>
                  <option value="Legal">Legal (216 × 356 mm)</option>
                </select>
              </div>
              
              <div className={styles.optionGroup}>
                <label>Orientation:</label>
                <div className={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      name="orientation"
                      value="portrait"
                      checked={options.orientation === 'portrait'}
                      onChange={handleOptionChange}
                    />
                    Portrait
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="orientation"
                      value="landscape"
                      checked={options.orientation === 'landscape'}
                      onChange={handleOptionChange}
                    />
                    Landscape
                  </label>
                </div>
              </div>
              
              <div className={styles.optionGroup}>
                <label htmlFor="margin">Margin (mm):</label>
                <input
                  type="number"
                  id="margin"
                  name="margin"
                  value={options.margin}
                  onChange={handleOptionChange}
                  min="0"
                  max="50"
                />
              </div>
              
              <div className={styles.optionGroup}>
                <label htmlFor="imageFit">Image Fit:</label>
                <select
                  id="imageFit"
                  name="imageFit"
                  value={options.imageFit}
                  onChange={handleOptionChange}
                >
                  <option value="fit">Fit to Page (keep ratio)</option>
                  <option value="fill">Stretch to Fill</option>
                  <option value="original">Original Size</option>
                </select>
              </div>
              
              <div className={styles.optionGroup}>
                <label htmlFor="pdfName">PDF File Name:</label>
                <input
                  type="text"
                  id="pdfName"
                  name="pdfName"
                  value={options.pdfName}
                  onChange={handleOptionChange}
                  placeholder="Enter PDF name"
                />
              </div>
              
              <div className={styles.optionGroup}>
                <label>
                  <input
                    type="checkbox"
                    name="pageNumbers"
                    checked={options.pageNumbers}
                    onChange={handleOptionChange}
                  />
                  Add Page Numbers
                </label>
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button
              className={styles.backButton}
              onClick={() => setCurrentStep(1)}
            >
              Back
            </button>
            <button
              className={styles.convertButton}
              onClick={generatePDF}
              disabled={isProcessing}
            >
              {isProcessing ? 'Generating PDF...' : 'Generate PDF'}
            </button>
          </div>
        </section>
      )}

      {/* Step 3: Download */}
      {currentStep === 3 && (
        <section className={styles.downloadSection}>
          <div className={styles.downloadContent}>
            <svg className={styles.successIcon} viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            <h3>PDF Ready for Download</h3>
            <p>Your PDF has been successfully generated.</p>
            
            <div className={styles.downloadActions}>
              <button
                className={styles.downloadButton}
                onClick={downloadPDF}
              >
                Download PDF
              </button>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.previewButton}
              >
                Preview in New Tab
              </a>
            </div>
            
            <button
              className={styles.newConversionButton}
              onClick={reset}
            >
              Convert More Images
            </button>
          </div>
        </section>
      )}

      {/* Error Message */}
      {error && (
        <div className={styles.errorMessage}>
          <svg className={styles.errorIcon} viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

// Helper function to generate PDF from images
async function generatePDFFromImages(images, options) {
  // Create a canvas to render each page
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Calculate page dimensions in pixels (assuming 96dpi)
  let pageWidth, pageHeight;
  switch (options.pageSize) {
    case 'A4':
      pageWidth = 794; // A4 width in pixels at 96dpi (210mm)
      pageHeight = 1123; // A4 height in pixels (297mm)
      break;
    case 'Letter':
      pageWidth = 816; // Letter width in pixels (215.9mm)
      pageHeight = 1056; // Letter height in pixels (279.4mm)
      break;
    case 'Legal':
      pageWidth = 816; // Legal width in pixels (215.9mm)
      pageHeight = 1344; // Legal height in pixels (355.6mm)
      break;
    default:
      pageWidth = 794;
      pageHeight = 1123;
  }

  if (options.orientation === 'landscape') {
    [pageWidth, pageHeight] = [pageHeight, pageWidth];
  }

  const margin = options.margin * (96 / 25.4); // Convert mm to pixels
  const contentWidth = pageWidth - (margin * 2);
  const contentHeight = pageHeight - (margin * 2);

  // Create a temporary canvas for each image
  const pages = [];
  
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const img = await loadImage(image.file);
    
    // Calculate image dimensions
    let imgWidth, imgHeight;
    if (options.imageFit === 'fit') {
      // Fit image to page while maintaining aspect ratio
      const ratio = Math.min(
        contentWidth / img.width,
        contentHeight / img.height
      );
      imgWidth = img.width * ratio;
      imgHeight = img.height * ratio;
    } else if (options.imageFit === 'fill') {
      // Stretch image to fill page
      imgWidth = contentWidth;
      imgHeight = contentHeight;
    } else {
      // Original size
      imgWidth = img.width;
      imgHeight = img.height;
      
      // Scale down if too large for page
      if (imgWidth > contentWidth || imgHeight > contentHeight) {
        const ratio = Math.min(
          contentWidth / imgWidth,
          contentHeight / imgHeight
        );
        imgWidth *= ratio;
        imgHeight *= ratio;
      }
    }

    // Calculate position to center image
    const x = margin + (contentWidth - imgWidth) / 2;
    const y = margin + (contentHeight - imgHeight) / 2;

    // Draw image on canvas
    canvas.width = pageWidth;
    canvas.height = pageHeight;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, pageWidth, pageHeight);
    ctx.drawImage(img, x, y, imgWidth, imgHeight);

    // Add page number if enabled
    if (options.pageNumbers) {
      ctx.fillStyle = 'black';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(
        `Page ${i + 1} of ${images.length}`,
        pageWidth / 2,
        pageHeight - 30
      );
    }

    // Add to pages array
    pages.push(canvas.toDataURL('image/jpeg', 0.9));
  }

  // Generate PDF from pages
  const pdfBlob = await imagesToPDF(pages, pageWidth, pageHeight);
  return pdfBlob;
}

// Helper function to load image
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

// Convert array of image data URLs to PDF
async function imagesToPDF(imageUrls, width, height) {
  // Convert width/height from pixels to points (1px = 0.75pt)
  const widthPt = width * 0.75;
  const heightPt = height * 0.75;
  
  // Create PDF manually
  let pdfContent = '%PDF-1.4\n';
  let objCount = 1;
  const objects = [];

  // Catalog
  objects.push(`${objCount} 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj`);
  objCount++;

  // Pages
  objects.push(`${objCount} 0 obj\n<< /Type /Pages /Kids [${imageUrls.map((_, i) => `${3 + i * 2} 0 R`).join(' ')}] /Count ${imageUrls.length} >>\nendobj`);
  objCount++;

  // Pages and images
  for (let i = 0; i < imageUrls.length; i++) {
    const imageData = imageUrls[i].split(',')[1];
    
    // Page
    objects.push(`${objCount} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${widthPt} ${heightPt}] /Contents ${objCount + 1} 0 R /Resources << /XObject << /Img${i} ${objCount + 2} 0 R >> >> >>\nendobj`);
    objCount++;

    // Content stream
    objects.push(`${objCount} 0 obj\n<< /Length 100 >>\nstream\nq\n${widthPt} 0 0 ${heightPt} 0 0 cm\n/Img${i} Do\nQ\nendstream\nendobj`);
    objCount++;

    // Image
    objects.push(`${objCount} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageData.length} >>\nstream\n${imageData}\nendstream\nendobj`);
    objCount++;
  }

  // Assemble PDF
  pdfContent += objects.join('\n');
  pdfContent += `\nxref\n0 ${objCount}\n0000000000 65535 f \n`;

  let offset = pdfContent.length;
  for (let i = 1; i < objCount; i++) {
    const objOffset = offset;
    pdfContent += `${String(objOffset).padStart(10, '0')} 00000 n \n`;
    offset += objects[i - 1].length;
  }

  pdfContent += `trailer\n<< /Size ${objCount} /Root 1 0 R >>\nstartxref\n${offset}\n%%EOF`;

  return new Blob([pdfContent], { type: 'application/pdf' });
}

export default ImageToPDF;
