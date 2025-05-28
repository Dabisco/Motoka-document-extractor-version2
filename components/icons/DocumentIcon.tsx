
import React from 'react';

interface DocumentIconProps extends React.SVGProps<SVGSVGElement> {}

const DocumentIcon: React.FC<DocumentIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM12.75 12.75a.75.75 0 001.5 0v-2.25h2.25a.75.75 0 000-1.5h-2.25V6.75a.75.75 0 00-1.5 0v2.25H9v.008c-.414 0-.75.336-.75.75V12a.75.75 0 00.75.75h3.75z"
      clipRule="evenodd"
    />
    <path d="M14.25 7.5a1.125 1.125 0 01-1.125-1.125V1.5A1.125 1.125 0 0114.25 0h1.033c.414 0 .79.168 1.06.439l4.5 4.5c.272.271.44.646.44 1.061V7.5h-7.233z" />
  </svg>
);

export default DocumentIcon;
