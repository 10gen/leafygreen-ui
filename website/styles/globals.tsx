import { css } from '@emotion/core';

export const globalStyles = css`
  @font-face {
    font-family: 'Akzidenz';
    font-weight: normal;
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdreg.eot');
    /* IE9 Compat Modes */
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdreg.eot?#iefix')
        format('embedded-opentype'),
      /* IE6-IE8 */
        url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdreg.woff')
        format('woff'),
      /* Pretty Modern Browsers */
        url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdreg.ttf')
        format('truetype'),
      /* Safari, Android, iOS */
        url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdreg.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
  }

  @font-face {
    font-family: 'Akzidenz';
    font-weight: 600;
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.eot');
    /* IE9 Compat Modes */
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.eot?#iefix')
        format('embedded-opentype'),
      /* IE6-IE8 */
        url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.woff')
        format('woff'),
      /* Pretty Modern Browsers */
        url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.ttf')
        format('truetype'),
      /* Safari, Android, iOS */
        url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
  }

  @font-face {
    font-family: 'Akzidenz';
    font-weight: bold;
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.eot');
    /* IE9 Compat Modes */
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.eot?#iefix')
        format('embedded-opentype'),
      /* IE6-IE8 */
        url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.woff')
        format('woff'),
      /* Pretty Modern Browsers */
        url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.ttf')
        format('truetype'),
      /* Safari, Android, iOS */
        url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
  }

  html {
    font-family: 'Akzidenz', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;
