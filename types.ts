
export enum DocumentType {
  DRIVERS_LICENSE = 'DRIVERS_LICENSE',
  VEHICLE_REGISTRATION = 'VEHICLE_REGISTRATION',
  INSURANCE_PAPERS = 'INSURANCE_PAPERS',
}

export interface DocumentTypeOption {
  value: DocumentType;
  label: string;
}

// This is a generic type. Specific fields will depend on the document.
// Gemini is prompted to return specific keys for each document type.
export interface ExtractedDataType {
  [key: string]: string | number | null | undefined;
}

export interface ImageDimensions {
  width: number;
  height: number;
}
