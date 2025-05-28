
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"
        role="status"
        aria-live="polite"
        aria-label="Loading"
      ></div>
    </div>
  );
};

export default Spinner;
