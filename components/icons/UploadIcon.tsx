
import React from 'react';

interface UploadIconProps extends React.SVGProps<SVGSVGElement> {}

const UploadIcon: React.FC<UploadIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10.5 3.75a2.25 2.25 0 00-2.25 2.25v10.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V6a2.25 2.25 0 00-2.25-2.25h-1.5z"
      clipRule="evenodd"
    />
    <path d="M3.75 9.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" />
  </svg>
);

export default UploadIcon;
