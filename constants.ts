
import { DocumentType, DocumentTypeOption } from './types';

export const APP_TITLE = "Motoka Document Extractor";

export const DOCUMENT_TYPE_OPTIONS: DocumentTypeOption[] = [
  { value: DocumentType.DRIVERS_LICENSE, label: "Driver's License" },
  { value: DocumentType.VEHICLE_REGISTRATION, label: "Vehicle Registration" },
  { value: DocumentType.INSURANCE_PAPERS, label: "Insurance Papers" },
];

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';

export const EXTRACTION_PROMPTS: Record<DocumentType, string> = {
  [DocumentType.DRIVERS_LICENSE]: `
    You are an expert document analysis AI for Motoka. Analyze the provided image of a driver's license.
    Extract the following information:
    - Full Name (as 'fullName')
    - Date of Birth (as 'dateOfBirth', format YYYY-MM-DD if possible, otherwise as it appears)
    - License Number (as 'licenseNumber')
    - Expiry Date (as 'expiryDate', format YYYY-MM-DD if possible, otherwise as it appears)
    - Issuing State or Authority (as 'issuingAuthority')
    - Address (as 'address')
    - License Class (as 'licenseClass')
    - Blood Group (as 'bloodGroup')

    Return the information STRICTLY as a JSON object. For example:
    {
      "fullName": "John Michael Doe",
      "dateOfBirth": "1990-05-15",
      "licenseNumber": "A123456789",
      "expiryDate": "2028-05-14",
      "issuingAuthority": "California",
      "address": "123 Main St, Anytown, CA 90210",
      "licenseClass": "C",
      "bloodGroup": "O+"
    }
    If a field is not present or unreadable, set its value to null or omit the key. Do not invent data.
  `,
  [DocumentType.VEHICLE_REGISTRATION]: `
    You are an expert document analysis AI for Motoka. Analyze the provided image of a vehicle registration document.
    Extract the following information:
    - Owner's Name (as 'ownerName')
    - Vehicle Identification Number (VIN) (as 'vin')
    - License Plate Number (as 'licensePlateNumber')
    - Vehicle Make (as 'vehicleMake')
    - Vehicle Model (as 'vehicleModel')
    - Vehicle Year (as 'vehicleYear')
    - Registration Expiry Date (as 'registrationExpiryDate', format YYYY-MM-DD if possible)
    - Registered Address (as 'registeredAddress')

    Return the information STRICTLY as a JSON object. For example:
    {
      "ownerName": "Jane Smith",
      "vin": "1HGCM82638A123456",
      "licensePlateNumber": "MOTOKA1",
      "vehicleMake": "Honda",
      "vehicleModel": "Civic",
      "vehicleYear": "2022",
      "registrationExpiryDate": "2025-12-31",
      "registeredAddress": "456 Oak Ave, Mototown, CA 90211"
    }
    If a field is not present or unreadable, set its value to null or omit the key. Do not invent data.
  `,
  [DocumentType.INSURANCE_PAPERS]: `
    You are an expert document analysis AI for Motoka. Analyze the provided image of an auto insurance document/card.
    Extract the following information:
    - Policy Holder's Name (as 'policyHolderName')
    - Insurance Provider Company (as 'insuranceProvider')
    - Policy Number (as 'policyNumber')
    - Policy Effective Date (as 'effectiveDate', format YYYY-MM-DD if possible)
    - Policy Expiry Date (as 'expiryDate', format YYYY-MM-DD if possible)
    - Vehicle(s) Covered (e.g., Make, Model, Year, VIN - as 'coveredVehicleInfo', can be a string or an array of objects if multiple, or a list of strings)

    Return the information STRICTLY as a JSON object. For example:
    {
      "policyHolderName": "Alice Wonderland",
      "insuranceProvider": "Motoka AutoSure",
      "policyNumber": "XYZ987654321",
      "effectiveDate": "2023-01-01",
      "expiryDate": "2024-01-01",
      "coveredVehicleInfo": [
        { "make": "Toyota", "model": "Camry", "year": "2021", "vin": "123XYZ789ABCDEF00" },
        "Ford Focus 2019"
      ]
    }
    If a field is not present or unreadable, set its value to null or omit the key. Do not invent data.
  `,
};
