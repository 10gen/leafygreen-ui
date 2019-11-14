import React from 'react';
import { css } from '@leafygreen-ui/emotion';

const class1 = css`
  fill: #10aa50;
`;

const class2 = css`
  fill: #b8c4c2;
`;

const class3 = css`
  fill: #12924f;
`;

interface RGBLogoMarkProps {
  height: number;
}

export default function RGBLogoMark({ height }: RGBLogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 216.56 448.5"
      height={height}
      width="auto"
      data-testid="rgb-logomark"
    >
      <title>MongoDB LogoMark</title>
      <path
        className={class1}
        d="M202.8,179.68c-23-101.47-71-128.49-83.18-147.59C113,21.7,106.25,5.91,106.25,5.91c-.66,9-1.83,14.7-9.51,21.54C81.36,41.16,16,94.42,10.51,209.72c-5.12,107.5,79,173.8,90.18,180.65,8.54,4.2,19,.08,24-3.77,40.54-27.84,96-102.07,78.06-206.92"
      />
      <path
        className={class2}
        d="M109.73,333.11c-2.11,26.62-3.63,42.11-9,57.29,0,0,3.54,25.33,6,52.17l8.77,0a488.62,488.62,0,0,1,9.57-56.2C113.71,380.8,110.16,356.46,109.73,333.11Z"
      />
      <path
        className={class3}
        d="M125.06,386.39h0c-11.48-5.3-14.8-30.13-15.31-53.28A1090.8,1090.8,0,0,0,112.2,218.4c-.6-20.07.3-185.92-4.94-210.2,2.12,4.75,7.24,15.91,12.36,23.88,12.23,19.11,60.19,46.13,83.17,147.61C220.7,284.27,165.57,358.37,125.06,386.39Z"
      />
    </svg>
  );
}
