
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { DocumentType, ExtractedDataType } from '../types';
import { EXTRACTION_PROMPTS, GEMINI_MODEL_TEXT } from '../constants';

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.error("API_KEY for Gemini is not configured. Document extraction will not work.");
}

export const extractDataFromImage = async (
  base64ImageData: string, // This is the full data URL: "data:image/jpeg;base64,..."
  documentType: DocumentType
): Promise<ExtractedDataType> => {
  if (!ai) {
    throw new Error("Gemini API client is not initialized. API Key might be missing.");
  }

  const prompt = EXTRACTION_PROMPTS[documentType];
  if (!prompt) {
    throw new Error(`No prompt configured for document type: ${documentType}`);
  }

  // Extract pure base64 data and mimeType from data URL
  const match = base64ImageData.match(/^data:(image\/\w+);base64,(.*)$/);
  if (!match || match.length < 3) {
    throw new Error("Invalid image data URL format.");
  }
  const mimeType = match[1];
  const pureBase64 = match[2];

  try {
    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: pureBase64,
      },
    };
    const textPart = { text: prompt };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        // No thinkingConfig for document extraction; default (enabled) is preferred for quality.
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s; // Matches ```json ... ``` or ``` ... ```
    const regexMatch = jsonStr.match(fenceRegex);
    if (regexMatch && regexMatch[1]) {
      jsonStr = regexMatch[1].trim();
    }

    try {
      const parsedData = JSON.parse(jsonStr);
      return parsedData as ExtractedDataType;
    } catch (parseError) {
      console.error("Failed to parse JSON response from Gemini:", parseError, "\nRaw response snippet:", jsonStr.substring(0, 500));
      throw new Error(`AI returned an invalid format. Response snippet: ${jsonStr.substring(0, 200)}...`);
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`AI processing failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred during AI processing.");
  }
};
