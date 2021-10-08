import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import {
  LogoProps,
  SupportedColors,
  SupportedColorsMap,
  getAccessibleProps,
} from './utils';

/**
 * # EnterpriseAdvancedLogoLockup
 *
 * React Component that displays the Atlas Logo Lockup.
 *
 * ```
 * <EnterpriseAdvancedLogoLockup />
 * ```
 * @param props.color Determines the color of the logo.
 * @param props.height Determines height of the <Logo /> component.
 */
function EnterpriseAdvancedLogoLockup({
  height = 40,
  className,
  color = SupportedColors.GreenDark2,
  role = 'img',
  'aria-label': ariaLabel = 'MongoDB Logo',
  ...rest
}: LogoProps): ReactElement {
  const fill = SupportedColorsMap[color];

  return (
    <svg
      {...rest}
      {...getAccessibleProps({ 'aria-label': ariaLabel, role })}
      className={cx(
        css`
          width: auto;
          height: ${height}px;
        `,
        className,
      )}
      height={height}
      viewBox="0 0 176 47"
      fill="none"
    >
      <path
        d="M8.89412 3.09473C7.72878 1.71209 6.7253 0.307852 6.52028 0.0162028C6.4987 -0.00540092 6.46633 -0.00540092 6.44475 0.0162028C6.23973 0.307852 5.23625 1.71209 4.07091 3.09473C-5.93157 15.8517 5.64628 24.4608 5.64628 24.4608L5.74338 24.5256C5.82971 25.8542 6.04551 27.7661 6.04551 27.7661H6.47712H6.90873C6.90873 27.7661 7.12454 25.865 7.21086 24.5256L7.30796 24.45C7.31875 24.4608 18.8966 15.8517 8.89412 3.09473ZM6.47712 24.2663C6.47712 24.2663 5.9592 23.8235 5.81892 23.5966V23.575L6.44475 9.68385C6.44475 9.64064 6.5095 9.64064 6.5095 9.68385L7.13532 23.575V23.5966C6.99505 23.8235 6.47712 24.2663 6.47712 24.2663Z"
        fill={fill}
      />
      <path
        d="M28.1444 21.4316L23.3198 9.64802L23.309 9.61548H19.5553V10.4076H20.161C20.3449 10.4076 20.518 10.4835 20.6478 10.6137C20.7776 10.7439 20.8425 10.9175 20.8425 11.102L20.7344 22.9615C20.7344 23.3305 20.4315 23.6343 20.0637 23.6451L19.4471 23.656V24.4372H23.1034V23.656L22.7248 23.6451C22.357 23.6343 22.0541 23.3305 22.0541 22.9615V11.7856L27.3114 24.4372C27.3872 24.6217 27.5602 24.741 27.755 24.741C27.9497 24.741 28.1228 24.6217 28.1985 24.4372L33.3368 12.0677L33.4125 22.9615C33.4125 23.3413 33.1097 23.6451 32.731 23.656H32.3416V24.4372H36.6254V23.656H36.0412C35.6734 23.656 35.3705 23.3413 35.3597 22.9724L35.3272 11.1128C35.3272 10.7331 35.6301 10.4293 35.9979 10.4184L36.6254 10.4076V9.61548H32.969L28.1444 21.4316Z"
        fill={fill}
      />
      <path
        d="M61.7844 23.4494C61.6651 23.3298 61.6 23.1668 61.6 22.9711V17.1453C61.6 16.0366 61.2747 15.1671 60.6239 14.5475C59.984 13.928 59.0947 13.6128 57.9884 13.6128C56.4375 13.6128 55.212 14.2432 54.3551 15.4823C54.3443 15.504 54.3118 15.5149 54.2792 15.5149C54.2467 15.5149 54.225 15.4932 54.225 15.4605L53.8237 13.9063H53.1513L51.4268 14.8954V15.4388H51.8715C52.0776 15.4388 52.2511 15.4932 52.3704 15.6019C52.4897 15.7105 52.5548 15.8736 52.5548 16.1018V22.9603C52.5548 23.1559 52.4897 23.319 52.3704 23.4385C52.2511 23.5581 52.0884 23.6233 51.8932 23.6233H51.4594V24.4167H55.4289V23.6233H54.995C54.7998 23.6233 54.6371 23.5581 54.5178 23.4385C54.3985 23.319 54.3335 23.1559 54.3335 22.9603V18.417C54.3335 17.8409 54.4636 17.2648 54.7022 16.6996C54.9516 16.1453 55.3204 15.6779 55.8085 15.3192C56.2965 14.9606 56.8822 14.7867 57.5546 14.7867C58.3138 14.7867 58.8886 15.0258 59.2465 15.504C59.6044 15.9823 59.7888 16.6018 59.7888 17.3409V22.9494C59.7888 23.145 59.7237 23.3081 59.6044 23.4276C59.4851 23.5472 59.3225 23.6124 59.1272 23.6124H58.6934V24.4059H62.6629V23.6124H62.2291C62.0664 23.6342 61.9146 23.5689 61.7844 23.4494Z"
        fill={fill}
      />
      <path
        d="M98.0507 10.5027C96.9535 9.91843 95.7272 9.61548 94.404 9.61548H89.2406V10.4053H89.7462C89.9398 10.4053 90.112 10.4811 90.2841 10.6542C90.4454 10.8165 90.5315 11.0004 90.5315 11.1952V22.8372C90.5315 23.032 90.4454 23.2159 90.2841 23.3782C90.1227 23.5405 89.9398 23.627 89.7462 23.627H89.2406V24.4169H94.404C95.7272 24.4169 96.9535 24.1139 98.0507 23.5297C99.148 22.9454 100.041 22.0798 100.686 20.9762C101.332 19.8726 101.665 18.5418 101.665 17.027C101.665 15.5122 101.332 14.1922 100.686 13.0778C100.03 11.9525 99.148 11.0978 98.0507 10.5027ZM99.589 17.0054C99.589 18.3903 99.3416 19.5588 98.8575 20.5001C98.3735 21.4415 97.728 22.1447 96.932 22.5992C96.1359 23.0536 95.2539 23.2808 94.3072 23.2808H93.2638C93.0702 23.2808 92.8981 23.2051 92.7259 23.032C92.5646 22.8697 92.4785 22.6857 92.4785 22.491V11.5089C92.4785 11.3142 92.5538 11.1411 92.7259 10.9679C92.8873 10.8057 93.0702 10.7191 93.2638 10.7191H94.3072C95.2539 10.7191 96.1359 10.9463 96.932 11.4007C97.728 11.8552 98.3735 12.5584 98.8575 13.4998C99.3416 14.4519 99.589 15.6312 99.589 17.0054Z"
        fill={fill}
      />
      <path
        d="M113.87 17.7952C113.393 17.2434 112.471 16.7781 111.387 16.5293C112.884 15.7827 113.653 14.7332 113.653 13.3807C113.653 12.645 113.458 11.985 113.068 11.4224C112.678 10.8597 112.124 10.4053 111.42 10.0915C110.715 9.77776 109.891 9.61548 108.958 9.61548H103.113V10.4053H103.579C103.775 10.4053 103.948 10.4811 104.122 10.6542C104.284 10.8165 104.371 11.0004 104.371 11.1952V22.8372C104.371 23.032 104.284 23.2159 104.122 23.3782C103.959 23.5405 103.775 23.627 103.579 23.627H103.07V24.4169H109.413C110.379 24.4169 111.279 24.2546 112.092 23.93C112.905 23.6054 113.556 23.1293 114.022 22.5018C114.499 21.8742 114.738 21.106 114.738 20.2188C114.727 19.2667 114.445 18.4552 113.87 17.7952ZM106.594 23.0428C106.431 22.8805 106.345 22.6965 106.345 22.5018V17.2759H109.359C110.422 17.2759 111.235 17.5463 111.799 18.0873C112.363 18.6283 112.645 19.3316 112.645 20.1972C112.645 20.7165 112.515 21.2251 112.276 21.6903C112.027 22.1664 111.658 22.5451 111.159 22.8372C110.671 23.1293 110.064 23.2808 109.359 23.2808H107.136C106.941 23.2808 106.767 23.2051 106.594 23.0428ZM106.355 16.1614V11.5198C106.355 11.325 106.431 11.1519 106.605 10.9788C106.767 10.8165 106.952 10.7299 107.147 10.7299H108.578C109.609 10.7299 110.368 10.9896 110.845 11.4873C111.322 11.9958 111.561 12.645 111.561 13.4457C111.561 14.268 111.333 14.928 110.888 15.4257C110.444 15.9126 109.771 16.1614 108.882 16.1614H106.355Z"
        fill={fill}
      />
      <path
        d="M46.6729 14.3029C45.8443 13.85 44.9188 13.6128 43.918 13.6128C42.9172 13.6128 41.981 13.8392 41.1631 14.3029C40.3345 14.7558 39.6781 15.4135 39.1938 16.2438C38.7096 17.0741 38.462 18.0445 38.462 19.1228C38.462 20.2011 38.7096 21.1715 39.1938 22.0018C39.6781 22.8321 40.3345 23.4898 41.1631 23.9427C41.9918 24.3956 42.9172 24.6328 43.918 24.6328C44.9188 24.6328 45.8551 24.4064 46.6729 23.9427C47.5016 23.4898 48.158 22.8321 48.6423 22.0018C49.1265 21.1715 49.374 20.2011 49.374 19.1228C49.374 18.0445 49.1265 17.0741 48.6423 16.2438C48.158 15.4135 47.5016 14.7558 46.6729 14.3029ZM47.4693 19.1228C47.4693 20.4491 47.1464 21.5274 46.5008 22.3037C45.8658 23.0801 44.9942 23.4791 43.918 23.4791C42.8419 23.4791 41.9702 23.0801 41.3353 22.3037C40.6896 21.5274 40.3668 20.4491 40.3668 19.1228C40.3668 17.7965 40.6896 16.7182 41.3353 15.9419C41.9702 15.1655 42.8419 14.7665 43.918 14.7665C44.9942 14.7665 45.8658 15.1655 46.5008 15.9419C47.1464 16.7182 47.4693 17.7965 47.4693 19.1228Z"
        fill={fill}
      />
      <path
        d="M84.8109 14.3029C83.9823 13.85 83.0568 13.6128 82.056 13.6128C81.0552 13.6128 80.119 13.8392 79.3011 14.3029C78.4725 14.7558 77.816 15.4135 77.3318 16.2438C76.8475 17.0741 76.6 18.0445 76.6 19.1228C76.6 20.2011 76.8475 21.1715 77.3318 22.0018C77.816 22.8321 78.4725 23.4898 79.3011 23.9427C80.1297 24.3956 81.0552 24.6328 82.056 24.6328C83.0568 24.6328 83.993 24.4064 84.8109 23.9427C85.6395 23.4898 86.296 22.8321 86.7802 22.0018C87.2645 21.1715 87.512 20.2011 87.512 19.1228C87.512 18.0445 87.2645 17.0741 86.7802 16.2438C86.296 15.4135 85.6288 14.7558 84.8109 14.3029ZM85.6072 19.1228C85.6072 20.4491 85.2844 21.5274 84.6387 22.3037C84.0038 23.0801 83.1321 23.4791 82.056 23.4791C80.9798 23.4791 80.1082 23.0801 79.4733 22.3037C78.8276 21.5274 78.5047 20.4491 78.5047 19.1228C78.5047 17.7857 78.8276 16.7182 79.4733 15.9419C80.1082 15.1655 80.9798 14.7665 82.056 14.7665C83.1321 14.7665 84.0038 15.1655 84.6387 15.9419C85.2736 16.7182 85.6072 17.7965 85.6072 19.1228Z"
        fill={fill}
      />
      <path
        d="M69.4304 13.6128C68.5634 13.6128 67.7723 13.7969 67.057 14.1652C66.3417 14.5335 65.7781 15.0318 65.3771 15.671C64.9761 16.2992 64.7702 17.0033 64.7702 17.7508C64.7702 18.4224 64.9219 19.0398 65.2362 19.5923C65.5397 20.1231 65.9515 20.5672 66.4717 20.9355L64.9219 23.037C64.7268 23.297 64.7051 23.6436 64.846 23.9253C64.9978 24.2178 65.2795 24.3911 65.6047 24.3911H66.049C65.6155 24.6836 65.2687 25.0302 65.0303 25.4418C64.7485 25.9076 64.6076 26.3951 64.6076 26.8934C64.6076 27.825 65.0194 28.5941 65.8323 29.1682C66.6343 29.7423 67.7614 30.0348 69.1812 30.0348C70.1674 30.0348 71.1103 29.8723 71.9665 29.5582C72.8335 29.244 73.538 28.7782 74.0582 28.1716C74.5892 27.565 74.8602 26.8284 74.8602 25.9834C74.8602 25.0952 74.5351 24.4669 73.7764 23.8603C73.1261 23.3512 72.1074 23.0804 70.8393 23.0804H66.5042C66.4934 23.0804 66.4826 23.0695 66.4826 23.0695C66.4826 23.0695 66.4717 23.0479 66.4826 23.037L67.6097 21.5205C67.9131 21.6613 68.1949 21.748 68.4442 21.8021C68.7043 21.8563 68.9969 21.878 69.3221 21.878C70.2324 21.878 71.0561 21.6938 71.7714 21.3255C72.4867 20.9572 73.0611 20.4589 73.4729 19.8198C73.8848 19.1915 74.0907 18.4874 74.0907 17.74C74.0907 16.9384 73.7005 15.476 72.6384 14.7285C72.6384 14.7177 72.6493 14.7177 72.6493 14.7177L74.9794 14.9777V13.9053H71.2512C70.6659 13.7211 70.059 13.6128 69.4304 13.6128ZM70.731 20.3939C70.3191 20.6106 69.8748 20.7297 69.4304 20.7297C68.7043 20.7297 68.0649 20.4697 67.523 19.9606C66.9811 19.4515 66.7101 18.704 66.7101 17.7508C66.7101 16.7975 66.9811 16.0501 67.523 15.541C68.0649 15.0318 68.7043 14.7719 69.4304 14.7719C69.8856 14.7719 70.3191 14.8802 70.731 15.1077C71.1428 15.3243 71.4788 15.6601 71.7497 16.1043C72.0098 16.5484 72.1507 17.1008 72.1507 17.7508C72.1507 18.4116 72.0207 18.964 71.7497 19.3973C71.4896 19.8415 71.1428 20.1773 70.731 20.3939ZM67.7939 24.3803H70.731C71.5438 24.3803 72.064 24.5427 72.4108 24.8894C72.7576 25.236 72.9311 25.7018 72.9311 26.2434C72.9311 27.0342 72.6168 27.6842 71.9882 28.1716C71.3596 28.6591 70.5142 28.9082 69.4738 28.9082C68.5634 28.9082 67.8047 28.7024 67.252 28.3124C66.6993 27.9225 66.4175 27.3267 66.4175 26.5684C66.4175 26.0918 66.5476 25.6476 66.8077 25.2577C67.0678 24.8677 67.3821 24.5861 67.7939 24.3803Z"
        fill={fill}
      />
      <path
        d="M116.937 24.2363C116.722 24.1193 116.561 23.9492 116.433 23.7471C116.315 23.5344 116.25 23.3111 116.25 23.0666C116.25 22.822 116.315 22.588 116.433 22.386C116.551 22.1733 116.722 22.0138 116.937 21.8968C117.151 21.7799 117.387 21.7161 117.655 21.7161C117.923 21.7161 118.159 21.7799 118.373 21.8968C118.588 22.0138 118.749 22.184 118.877 22.386C118.995 22.5987 119.059 22.822 119.059 23.0666C119.059 23.3111 118.995 23.5451 118.877 23.7471C118.759 23.9598 118.588 24.1193 118.373 24.2363C118.159 24.3532 117.923 24.4171 117.655 24.4171C117.398 24.4171 117.151 24.3639 116.937 24.2363ZM118.255 24.0874C118.438 23.9917 118.566 23.8428 118.673 23.6727C118.77 23.4919 118.824 23.2899 118.824 23.0666C118.824 22.8432 118.77 22.6412 118.673 22.4604C118.577 22.2797 118.438 22.1414 118.255 22.0457C118.073 21.95 117.88 21.8968 117.655 21.8968C117.43 21.8968 117.237 21.95 117.055 22.0457C116.872 22.1414 116.744 22.2903 116.636 22.4604C116.54 22.6412 116.486 22.8432 116.486 23.0666C116.486 23.2899 116.54 23.4919 116.636 23.6727C116.733 23.8535 116.872 23.9917 117.055 24.0874C117.237 24.1831 117.43 24.2363 117.655 24.2363C117.88 24.2363 118.084 24.1831 118.255 24.0874ZM117.076 23.7152V23.6195L117.097 23.6089H117.162C117.183 23.6089 117.205 23.5982 117.215 23.5876C117.237 23.5663 117.237 23.5557 117.237 23.5344V22.5455C117.237 22.5242 117.226 22.503 117.215 22.4923C117.194 22.4711 117.183 22.4711 117.162 22.4711H117.097L117.076 22.4604V22.3647L117.097 22.3541H117.655C117.816 22.3541 117.934 22.386 118.03 22.4604C118.127 22.5349 118.17 22.6306 118.17 22.7582C118.17 22.8539 118.137 22.9496 118.062 23.0134C117.987 23.0878 117.902 23.1304 117.794 23.141L117.923 23.1835L118.17 23.577C118.191 23.6089 118.212 23.6195 118.245 23.6195H118.309L118.32 23.6301V23.7259L118.309 23.7365H117.977L117.955 23.7259L117.612 23.1516H117.526V23.5344C117.526 23.5557 117.537 23.577 117.548 23.5876C117.569 23.6089 117.58 23.6089 117.601 23.6089H117.666L117.687 23.6195V23.7152L117.666 23.7259H117.097L117.076 23.7152ZM117.623 23.0134C117.709 23.0134 117.784 22.9921 117.826 22.939C117.869 22.8964 117.902 22.822 117.902 22.7369C117.902 22.6518 117.88 22.588 117.837 22.5349C117.794 22.4817 117.73 22.4604 117.655 22.4604H117.612C117.591 22.4604 117.569 22.4711 117.558 22.4817C117.537 22.503 117.537 22.5136 117.537 22.5349V23.0134H117.623Z"
        fill={fill}
      />
      <path
        d="M21.0436 43.5399H27.5743V42.3788H22.2691V38.2346H26.6068V37.0736H22.2691V33.2519H27.5743V32.0909H21.0436V43.5399Z"
        fill={fill}
      />
      <path
        d="M29.5895 43.5399H30.7183V39.5247C30.7183 37.5251 31.8148 36.3641 33.2338 36.3641C34.4271 36.3641 35.2656 37.2349 35.2656 38.6539V43.5399H36.3944V38.4926C36.3944 36.5253 35.1205 35.3159 33.3628 35.3159C32.3147 35.3159 31.2988 35.7675 30.7183 36.8317V35.4772H29.5895V43.5399Z"
        fill={fill}
      />
      <path
        d="M41.8298 43.6205C42.2814 43.6205 42.6845 43.5399 43.0231 43.4108V42.395C42.7651 42.4917 42.3297 42.5723 42.0072 42.5723C41.1526 42.5723 40.6688 42.2337 40.6688 41.2017V36.5415H43.0231V35.4772H40.6688V33.2358H39.5401V35.4772H37.8146V36.5415H39.5401V41.2984C39.5401 42.8787 40.5237 43.6205 41.8298 43.6205Z"
        fill={fill}
      />
      <path
        d="M48.0921 43.7011C50.1562 43.7011 51.3817 42.5078 51.7687 41.1372H50.6077C50.0594 42.2498 49.1564 42.653 48.0921 42.653C46.6247 42.653 45.2863 41.4919 45.2541 39.831H51.8977C52.1073 37.509 50.7206 35.3159 48.1405 35.3159C45.6088 35.3159 44.0931 37.1704 44.0931 39.5085C44.0931 41.9112 45.7701 43.7011 48.0921 43.7011ZM48.0921 36.3641C49.4305 36.3641 50.4787 37.2187 50.7367 38.8474H45.3186C45.6088 37.0252 46.8989 36.3641 48.0921 36.3641Z"
        fill={fill}
      />
      <path
        d="M54.0294 43.5399H55.1582V39.4924C55.1582 37.4284 56.3998 36.5253 57.3996 36.5253C57.6415 36.5253 57.8511 36.5576 58.0768 36.6382V35.4611C57.8833 35.4127 57.6898 35.3966 57.4963 35.3966C56.5449 35.3966 55.4968 36.0093 55.1582 37.1381V35.4772H54.0294V43.5399Z"
        fill={fill}
      />
      <path
        d="M59.7929 46.91H60.9217V42.1853C61.5022 43.0561 62.6632 43.7011 63.9049 43.7011C66.1947 43.7011 67.9201 41.8144 67.9201 39.5085C67.9201 37.2026 66.1947 35.3159 63.9049 35.3159C62.6632 35.3159 61.5022 35.961 60.9217 36.8317V35.4772H59.7929V46.91ZM63.792 42.653C62.0343 42.653 60.8249 41.2501 60.8249 39.5085C60.8249 37.767 62.0343 36.3641 63.792 36.3641C65.5497 36.3641 66.7591 37.767 66.7591 39.5085C66.7591 41.2501 65.5497 42.653 63.792 42.653Z"
        fill={fill}
      />
      <path
        d="M70.0287 43.5399H71.1575V39.4924C71.1575 37.4284 72.3991 36.5253 73.3989 36.5253C73.6408 36.5253 73.8504 36.5576 74.0762 36.6382V35.4611C73.8827 35.4127 73.6892 35.3966 73.4957 35.3966C72.5443 35.3966 71.4961 36.0093 71.1575 37.1381V35.4772H70.0287V43.5399Z"
        fill={fill}
      />
      <path
        d="M76.3728 33.0584C76.8404 33.0584 77.2113 32.6714 77.2113 32.2038C77.2113 31.7361 76.8404 31.3491 76.3728 31.3491C75.889 31.3491 75.502 31.7361 75.502 32.2038C75.502 32.6714 75.889 33.0584 76.3728 33.0584ZM75.7922 43.5399H76.921V35.4772H75.7922V43.5399Z"
        fill={fill}
      />
      <path
        d="M82.1325 43.7011C83.7128 43.7011 84.9706 43.0077 84.9706 41.3952C84.9706 40.2019 84.2288 39.3634 82.9549 39.0409L81.7133 38.7184C80.7457 38.4604 80.391 38.0572 80.391 37.4284C80.391 36.735 81.0682 36.3157 81.9068 36.3157C82.7453 36.3157 83.3742 36.8156 83.616 37.5574H84.7287C84.5836 36.3641 83.616 35.3159 81.9068 35.3159C80.391 35.3159 79.2622 36.1061 79.2622 37.4284C79.2622 38.5733 79.9717 39.4118 81.3424 39.7665L82.3905 40.0407C83.4225 40.3148 83.8418 40.7663 83.8418 41.4758C83.8418 42.2982 83.0517 42.6852 82.1325 42.6852C81.2618 42.6852 80.3426 42.3466 80.1007 41.2662H78.972C79.0848 42.911 80.52 43.7011 82.1325 43.7011Z"
        fill={fill}
      />
      <path
        d="M90.4053 43.7011C92.4693 43.7011 93.6949 42.5078 94.0819 41.1372H92.9208C92.3726 42.2498 91.4696 42.653 90.4053 42.653C88.9379 42.653 87.5995 41.4919 87.5673 39.831H94.2109C94.4205 37.509 93.0337 35.3159 90.4537 35.3159C87.922 35.3159 86.4062 37.1704 86.4062 39.5085C86.4062 41.9112 88.0833 43.7011 90.4053 43.7011ZM90.4053 36.3641C91.7437 36.3641 92.7918 37.2187 93.0499 38.8474H87.6317C87.922 37.0252 89.212 36.3641 90.4053 36.3641Z"
        fill={fill}
      />
      <path
        d="M98.4862 43.5399H99.744L101.324 39.9762H106.807L108.387 43.5399H109.677L104.565 32.0909H103.582L98.4862 43.5399ZM101.84 38.8313L104.066 33.8163L106.291 38.8313H101.84Z"
        fill={fill}
      />
      <path
        d="M114.42 43.7011C115.662 43.7011 116.823 43.0561 117.403 42.1853V43.5399H118.532V31.4459H117.403V36.8317C116.823 35.961 115.662 35.3159 114.42 35.3159C112.13 35.3159 110.405 37.2026 110.405 39.5085C110.405 41.8144 112.13 43.7011 114.42 43.7011ZM114.533 42.653C112.775 42.653 111.566 41.2501 111.566 39.5085C111.566 37.767 112.775 36.3641 114.533 36.3641C116.291 36.3641 117.5 37.767 117.5 39.5085C117.5 41.2501 116.291 42.653 114.533 42.653Z"
        fill={fill}
      />
      <path
        d="M123.818 43.5399H124.705L128.478 35.4772H127.204L124.253 41.8789L121.302 35.4772H120.044L123.818 43.5399Z"
        fill={fill}
      />
      <path
        d="M133.191 43.7011C134.433 43.7011 135.594 43.0561 136.174 42.1853V43.5399H137.303V35.4772H136.174V36.8317C135.594 35.961 134.433 35.3159 133.191 35.3159C130.901 35.3159 129.176 37.2026 129.176 39.5085C129.176 41.8144 130.901 43.7011 133.191 43.7011ZM133.304 42.653C131.546 42.653 130.337 41.2501 130.337 39.5085C130.337 37.767 131.546 36.3641 133.304 36.3641C135.061 36.3641 136.271 37.767 136.271 39.5085C136.271 41.2501 135.061 42.653 133.304 42.653Z"
        fill={fill}
      />
      <path
        d="M140.073 43.5399H141.202V39.5247C141.202 37.5251 142.298 36.3641 143.717 36.3641C144.911 36.3641 145.749 37.2349 145.749 38.6539V43.5399H146.878V38.4926C146.878 36.5253 145.604 35.3159 143.846 35.3159C142.798 35.3159 141.782 35.7675 141.202 36.8317V35.4772H140.073V43.5399Z"
        fill={fill}
      />
      <path
        d="M153.053 43.7011C155.02 43.7011 156.633 42.4756 157.084 40.7824H155.859C155.488 41.8789 154.407 42.653 153.053 42.653C151.215 42.653 150.005 41.2339 150.005 39.5085C150.005 37.7831 151.215 36.3641 153.053 36.3641C154.407 36.3641 155.488 37.1381 155.859 38.2346H157.084C156.633 36.5415 155.02 35.3159 153.053 35.3159C150.602 35.3159 148.844 37.2026 148.844 39.5085C148.844 41.8144 150.602 43.7011 153.053 43.7011Z"
        fill={fill}
      />
      <path
        d="M162.371 43.7011C164.435 43.7011 165.66 42.5078 166.047 41.1372H164.886C164.338 42.2498 163.435 42.653 162.371 42.653C160.903 42.653 159.565 41.4919 159.533 39.831H166.176C166.386 37.509 164.999 35.3159 162.419 35.3159C159.887 35.3159 158.372 37.1704 158.372 39.5085C158.372 41.9112 160.049 43.7011 162.371 43.7011ZM162.371 36.3641C163.709 36.3641 164.757 37.2187 165.015 38.8474H159.597C159.887 37.0252 161.177 36.3641 162.371 36.3641Z"
        fill={fill}
      />
      <path
        d="M171.646 43.7011C172.888 43.7011 174.049 43.0561 174.629 42.1853V43.5399H175.758V31.4459H174.629V36.8317C174.049 35.961 172.888 35.3159 171.646 35.3159C169.356 35.3159 167.631 37.2026 167.631 39.5085C167.631 41.8144 169.356 43.7011 171.646 43.7011ZM171.759 42.653C170.001 42.653 168.792 41.2501 168.792 39.5085C168.792 37.767 170.001 36.3641 171.759 36.3641C173.516 36.3641 174.726 37.767 174.726 39.5085C174.726 41.2501 173.516 42.653 171.759 42.653Z"
        fill={fill}
      />
    </svg>
  );
}

EnterpriseAdvancedLogoLockup.displayName = 'EnterpriseAdvancedLogoLockup';

EnterpriseAdvancedLogoLockup.propTypes = {
  height: PropTypes.number,
};

export default EnterpriseAdvancedLogoLockup;
