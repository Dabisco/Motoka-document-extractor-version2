
import React from 'react';
import { DocumentType, DocumentTypeOption } from '../types';
import { DOCUMENT_TYPE_OPTIONS } from '../constants';

interface DocumentSelectorProps {
  selectedType: DocumentType | null;
  onChange: (type: DocumentType) => void;
  disabled?: boolean;
}

const DocumentSelector: React.FC<DocumentSelectorProps> = ({ selectedType, onChange, disabled }) => {
  return (
    <div className="mb-6">
      <label htmlFor="documentType" className="block text-sm font-medium text-brand-text mb-1">
        Select Document Type
      </label>
      <select
        id="documentType"
        name="documentType"
        value={selectedType || ''}
        onChange={(e) => onChange(e.target.value as DocumentType)}
        disabled={disabled}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm rounded-md shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="" disabled>
          -- Choose a document --
        </option>
        {DOCUMENT_TYPE_OPTIONS.map((option: DocumentTypeOption) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DocumentSelector;
