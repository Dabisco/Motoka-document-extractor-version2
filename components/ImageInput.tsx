
import React, { useState, useRef, useCallback } from 'react';
import CameraIcon from './icons/CameraIcon';
import UploadIcon from './icons/UploadIcon';

interface ImageInputProps {
  onImageSelect: (imageDataUrl: string, mimeType: string) => void;
  clearImage: () => void;
  currentImagePreviewUrl: string | null;
  disabled?: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageSelect, clearImage, currentImagePreviewUrl, disabled }) => {
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, GIF, WEBP, etc.).');
        if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string, file.type);
      };
      reader.readAsDataURL(file);
      setIsCameraMode(false);
      stopCamera();
    }
  };

  const startCamera = useCallback(async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        setCameraError(null);
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraMode(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setCameraError("Could not access camera. Please ensure permissions are granted and no other app is using it.");
        setIsCameraMode(false);
      }
    } else {
      setCameraError("Camera not supported by this browser.");
      setIsCameraMode(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [cameraStream]);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current && cameraStream) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      // Set canvas dimensions to video stream dimensions for best quality
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9); // Use JPEG for smaller size, 0.9 quality
        onImageSelect(imageDataUrl, 'image/jpeg');
        setIsCameraMode(false); 
        stopCamera();
      }
    }
  };

  const handleClearImage = () => {
    stopCamera();
    setIsCameraMode(false);
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
    }
    clearImage();
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-brand-text mb-1">Upload or Capture Document Image</label>
      <div className="mt-2 flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || isCameraMode}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UploadIcon className="mr-2" />
            Upload File
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          
          <button
            type="button"
            onClick={isCameraMode ? stopCamera : startCamera}
            disabled={disabled && !isCameraMode}
            className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed ${
              isCameraMode ? 'bg-red-500 hover:bg-red-600 text-white border-red-500' : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
            }`}
          >
            <CameraIcon className="mr-2" />
            {isCameraMode ? 'Stop Camera' : 'Use Camera'}
          </button>
        </div>

        {cameraError && <p className="text-sm text-red-600">{cameraError}</p>}

        {isCameraMode && videoRef && (
          <div className="w-full max-w-md bg-gray-900 rounded-md overflow-hidden shadow-lg">
            <video ref={videoRef} autoPlay playsInline className="w-full h-auto" />
            <button
              type="button"
              onClick={captureImage}
              disabled={!cameraStream || disabled}
              className="w-full mt-2 px-4 py-2 bg-brand-primary text-white font-semibold rounded-b-md hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Capture Image
            </button>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden"></canvas>

        {currentImagePreviewUrl && !isCameraMode && (
          <div className="mt-4 p-2 border border-gray-300 rounded-md shadow-sm w-full max-w-md">
            <p className="text-sm font-medium text-brand-text mb-1">Image Preview:</p>
            <img src={currentImagePreviewUrl} alt="Preview" className="max-w-full max-h-60 object-contain rounded-md mx-auto" />
            <button
              type="button"
              onClick={handleClearImage}
              disabled={disabled}
              className="mt-2 w-full px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 disabled:opacity-50"
            >
              Clear Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageInput;
