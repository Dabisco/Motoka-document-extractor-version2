
import React from 'react';

interface CameraIconProps extends React.SVGProps<SVGSVGElement> {}

const CameraIcon: React.FC<CameraIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
    {...props}
  >
    <path d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
    <path
      fillRule="evenodd"
      d="M2.25 4.5A2.25 2.25 0 014.5 2.25h15A2.25 2.25 0 0121.75 4.5v15a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 19.5v-15zm11.54 1.72a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72V15a.75.75 0 001.5 0V7.56l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
      clipRule="evenodd"
    />
    <path d="M12 12.75a.75.75 0 00.75-.75V9a.75.75 0 00-1.5 0v3a.75.75 0 00.75.75z" />
    <path
      fillRule="evenodd"
      d="M3.75 6.75a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zM3.75 17.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
      clipRule="evenodd"
    />
    <path d="M4.5 9.75A.75.75 0 015.25 9h3a.75.75 0 010 1.5h-3A.75.75 0 014.5 9.75zm11.25 0a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z" />
  </svg>
);

export default CameraIcon;
