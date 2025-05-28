
import React, { useState, useCallback, useEffect } from 'react';
import { DocumentType, ExtractedDataType } from './types';
import { APP_TITLE, DOCUMENT_TYPE_OPTIONS } from './constants';
import DocumentSelector from './components/DocumentSelector';
import ImageInput from './components/ImageInput';
import ExtractedDataDisplay from './components/ExtractedDataDisplay';
import Spinner from './components/Spinner';
import DocumentIcon from './components/icons/DocumentIcon';
import { extractDataFromImage } from './services/geminiService';

const App: React.FC = () => {
  const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentType | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  // const [imageMimeType, setImageMimeType] = useState<string | null>(null); // Now extracted in geminiService
  const [extractedData, setExtractedData] = useState<ExtractedDataType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  useEffect(() => {
    if (!process.env.API_KEY) {
        setApiKeyMissing(true);
        setError("Gemini API Key is not configured. Please set the API_KEY environment variable.");
    }
  }, []);


  const handleDocumentTypeChange = useCallback((type: DocumentType) => {
    setSelectedDocumentType(type);
    setExtractedData(null); // Clear previous results when type changes
    setError(null);
  }, []);

  const handleImageSelect = useCallback((dataUrl: string, _mimeType: string) => {
    setImageDataUrl(dataUrl);
    // setImageMimeType(mimeType); // No longer need to store mimeType here
    setExtractedData(null); // Clear previous results when image changes
    setError(null);
  }, []);

  const handleClearImage = useCallback(() => {
    setImageDataUrl(null);
    // setImageMimeType(null);
    setExtractedData(null);
    setError(null);
  }, []);

  const handleExtractData = async () => {
    if (!selectedDocumentType || !imageDataUrl) {
      setError("Please select a document type and upload/capture an image.");
      return;
    }
    if (apiKeyMissing) {
        setError("Cannot process: Gemini API Key is not configured.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setExtractedData(null);

    try {
      const data = await extractDataFromImage(imageDataUrl, selectedDocumentType);
      setExtractedData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during data extraction.");
      }
      setExtractedData(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const selectedDocumentLabel = DOCUMENT_TYPE_OPTIONS.find(opt => opt.value === selectedDocumentType)?.label;

  return (
    <div className="min-h-screen bg-brand-light flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center mb-2">
          <DocumentIcon className="h-12 w-12 text-brand-primary mr-3"/>
          <h1 className="text-4xl font-extrabold text-brand-text tracking-tight">
            {APP_TITLE}
          </h1>
        </div>
        <p className="mt-2 text-lg text-brand-subtext max-w-2xl mx-auto">
          Upload or capture your document, and our AI will extract the key information for you.
        </p>
      </header>

      <main className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
        {apiKeyMissing && !error && ( // Show initial API key warning if no other error is set
             <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-md shadow">
                <p className="text-sm font-medium text-red-700">
                    Warning: Gemini API Key is not configured. Document extraction functionality will be disabled.
                </p>
            </div>
        )}
        <DocumentSelector 
            selectedType={selectedDocumentType} 
            onChange={handleDocumentTypeChange}
            disabled={isLoading}
        />
        <ImageInput 
            onImageSelect={handleImageSelect} 
            clearImage={handleClearImage}
            currentImagePreviewUrl={imageDataUrl}
            disabled={isLoading}
        />

        <button
          type="button"
          onClick={handleExtractData}
          disabled={!selectedDocumentType || !imageDataUrl || isLoading || apiKeyMissing}
          className="w-full mt-6 flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? <Spinner /> : 'Extract Information'}
        </button>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-md shadow">
            <p className="text-sm font-medium text-red-700">Error:</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        )}
        
        {extractedData && !isLoading && !error && (
          <ExtractedDataDisplay data={extractedData} documentTypeLabel={selectedDocumentLabel} />
        )}
      </main>
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Motoka Inc. All rights reserved.</p>
        <p>Powered by AI.</p>
      </footer>
    </div>
  );
};

export default App;
