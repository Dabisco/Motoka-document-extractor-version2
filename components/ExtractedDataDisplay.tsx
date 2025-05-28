
import React from 'react';
import { ExtractedDataType } from '../types';

interface ExtractedDataDisplayProps {
  data: ExtractedDataType | null;
  documentTypeLabel: string | undefined;
}

const ExtractedDataDisplay: React.FC<ExtractedDataDisplayProps> = ({ data, documentTypeLabel }) => {
  if (!data) {
    return null;
  }

  const entries = Object.entries(data).filter(([_, value]) => value !== null && value !== undefined && String(value).trim() !== '');

  if (entries.length === 0) {
    return (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-md shadow">
            <p className="text-sm text-yellow-700">No data could be extracted from the document, or the document might be unclear. Please try again with a clearer image.</p>
        </div>
    );
  }

  // Function to format keys (e.g., fullName -> Full Name)
  const formatKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
  };

  return (
    <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-brand-text mb-4">
        Extracted Information for {documentTypeLabel || 'Document'}
      </h3>
      <dl className="divide-y divide-gray-200">
        {entries.map(([key, value]) => (
          <div key={key} className="py-3 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <dt className="text-sm font-medium text-brand-subtext">{formatKey(key)}</dt>
            <dd className="mt-1 text-sm text-brand-text md:mt-0 md:col-span-2 break-words">
              {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ExtractedDataDisplay;
