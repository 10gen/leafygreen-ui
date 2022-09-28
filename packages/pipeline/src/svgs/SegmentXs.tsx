import * as React from 'react';
import {
  svgInnerOutlineClassName,
  svgOuterOutlineClassName,
  svgInnerClassName,
} from '../';

const SegmentXs = ({ className }: { className: string }) => {
  return (
    <svg
      width="44"
      height="30"
      viewBox="0 0 44 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMaxYMid slice"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.559665 7.28569C-1.1506 3.95822 1.2654 0 5.00665 0H31.2539C34.6552 0 37.7659 1.9175 39.2942 4.95615L42.3119 10.9562C43.5914 13.5002 43.5914 16.4998 42.3119 19.0439L39.2942 25.0439C37.7659 28.0825 34.6552 30 31.2539 30H5.00665C1.26539 30 -1.1506 26.0418 0.559665 22.7143L4.28975 15.4571C4.43722 15.1702 4.43723 14.8298 4.28975 14.5429L0.559665 7.28569ZM5.00665 4C4.2584 4 3.7752 4.79164 4.11725 5.45714L7.84734 12.7143C8.5847 14.1489 8.5847 15.8511 7.84734 17.2857L4.11725 24.5429C3.7752 25.2084 4.25839 26 5.00665 26H31.2539C33.1435 26 34.8717 24.9347 35.7207 23.2466L38.7384 17.2466C39.4492 15.8332 39.4492 14.1668 38.7384 12.7534L35.7207 6.75342C34.8717 5.06528 33.1435 4 31.2539 4H5.00665Z"
        fill="#0498EC"
        className={svgOuterOutlineClassName}
      />
      <path
        d="M4.11193 5.45714C3.76988 4.79164 4.25308 4 5.00133 4H31.2485C33.1382 4 34.8664 5.06528 35.7154 6.75342L38.7331 12.7534C39.4439 14.1668 39.4439 15.8332 38.7331 17.2466L35.7154 23.2466C34.8664 24.9347 33.1382 26 31.2485 26H5.00133C4.25308 26 3.76988 25.2084 4.11193 24.5429L7.84202 17.2857C8.57938 15.8511 8.57938 14.1489 7.84202 12.7143L4.11193 5.45714Z"
        fill="#C3E7FE"
        className={svgInnerClassName}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.00399 2C2.75924 2 1.30964 4.37493 2.3358 6.37141L6.06589 13.6286C6.5083 14.4893 6.5083 15.5107 6.06589 16.3714L2.3358 23.6286C1.30964 25.6251 2.75923 28 5.00399 28H31.2512C33.8967 28 36.3162 26.5086 37.5048 24.1452L40.5225 18.1452C41.5177 16.1665 41.5177 13.8335 40.5225 11.8548L37.5048 5.85478C36.3162 3.49139 33.8967 2 31.2512 2H5.00399ZM5.00133 4C4.25308 4 3.76988 4.79165 4.11193 5.45714L7.84202 12.7143C8.57938 14.1489 8.57938 15.8511 7.84202 17.2857L4.11193 24.5429C3.76988 25.2084 4.25308 26 5.00133 26H31.2485C33.1382 26 34.8664 24.9347 35.7154 23.2466L38.7331 17.2466C39.4439 15.8332 39.4439 14.1668 38.7331 12.7534L35.7154 6.75342C34.8664 5.06528 33.1382 4 31.2485 4H5.00133Z"
        fill="white"
        className={svgInnerOutlineClassName}
      />
    </svg>
  );
};

export default SegmentXs;
