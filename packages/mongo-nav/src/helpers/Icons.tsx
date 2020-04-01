import React from 'react';
import { css } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';

type ProductIconProps = HTMLElementProps<'svg'> & {
  active: boolean;
};

export function CloudManagerSmall() {
  return (
    <svg width="10px" height="10px" viewBox="0 0 10 10">
      <path
        className={css`
          fill: #00804b;
        `}
        d="M3.19,9.66h.4A1.32,1.32,0,0,0,3.59,7H.43A5,5,0,0,0,3.19,9.66Z"
      />
      <path
        className={css`
          fill: #03aa4f;
        `}
        d="M1.58,5a2,2,0,0,1,.5-1.32H.18a4.93,4.93,0,0,0,0,2.64H2.07A2,2,0,0,1,1.58,5Z"
      />
      <path
        className={css`
          fill: #00804b;
        `}
        d="M5.61,8.34A2,2,0,0,1,4.75,10H5A5,5,0,0,0,9.57,7H5.12A2,2,0,0,1,5.61,8.34Z"
      />
      <path
        className={css`
          fill: #007dab;
        `}
        d="M5,0A5,5,0,0,0,.43,3H9.57A5,5,0,0,0,5,0Z"
      />
      <path
        className={css`
          fill: #03aa4f;
        `}
        d="M2.28,5A1.32,1.32,0,0,0,3.6,6.32H9.82a4.93,4.93,0,0,0,0-2.64H3.6A1.32,1.32,0,0,0,2.28,5Z"
      />
    </svg>
  );
}

export function AtlasSmall() {
  return (
    <svg width="10px" height="10px" viewBox="0 0 10 10">
      <path
        className={css`
          fill: #03aa4f;
        `}
        d="M6.67,6.12A5.5,5.5,0,0,1,10,5.2,1.48,1.48,0,0,0,10,5a5,5,0,0,0-.73-2.61,4.63,4.63,0,0,0-2.21.77A4.78,4.78,0,0,0,5.35,5.28V7.41A5.42,5.42,0,0,1,6.67,6.12Z"
      />
      <path
        className={css`
          fill: #80dba5;
        `}
        d="M5.35,3.87A5.08,5.08,0,0,1,6.67,2.58a5.31,5.31,0,0,1,2.12-.85A5,5,0,0,0,5.35,0Z"
      />
      <path
        className={css`
          fill: #03aa4f;
        `}
        d="M3.33,6.12A5.42,5.42,0,0,1,4.65,7.41V5.29A4.75,4.75,0,0,0,2.94,3.15,4.63,4.63,0,0,0,.73,2.38,5,5,0,0,0,0,5,1.48,1.48,0,0,0,0,5.2,5.5,5.5,0,0,1,3.33,6.12Z"
      />
      <path
        className={css`
          fill: #00804b;
        `}
        d="M7.06,6.7A4.78,4.78,0,0,0,5.35,8.83V10A5,5,0,0,0,9.91,5.91,4.73,4.73,0,0,0,7.06,6.7Z"
      />
      <path
        className={css`
          fill: #00804b;
        `}
        d="M4.65,8.83A4.78,4.78,0,0,0,2.94,6.7,4.73,4.73,0,0,0,.09,5.91,5,5,0,0,0,4.65,10Z"
      />
      <path
        className={css`
          fill: #80dba5;
        `}
        d="M3.33,2.58A5.08,5.08,0,0,1,4.65,3.87V0A5,5,0,0,0,1.21,1.73,5.31,5.31,0,0,1,3.33,2.58Z"
      />
    </svg>
  );
}

export function CloudManagerIcon({ active, ...rest }: ProductIconProps) {
  return (
    <svg {...rest} width="18px" height="18px" viewBox="0 0 18 18">
      <defs>
        <linearGradient
          id="cloud-manager-linear-gradient"
          x1="0.96"
          y1="15.06"
          x2="15.02"
          y2="14.8"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0d6149" />
          <stop offset="0.37" stopColor="#04a74f" />
          <stop offset="0.65" stopColor="#00cd57" />
          <stop offset="0.92" stopColor="#5fd590" />
          <stop offset="1" stopColor="#7ed8a2" />
        </linearGradient>
        <linearGradient
          id="cloud-manager-linear-gradient-2"
          x1="-2.54"
          y1="9"
          x2="13.27"
          y2="9"
          xlinkHref="#cloud-manager-linear-gradient"
        />
        <linearGradient
          id="cloud-manager-linear-gradient-3"
          x1="21.41"
          y1="15.32"
          x2="1.11"
          y2="15.32"
          xlinkHref="#cloud-manager-linear-gradient"
        />
        <linearGradient
          id="cloud-manager-linear-gradient-4"
          x1="19.24"
          y1="9"
          x2="-3.78"
          y2="9"
          xlinkHref="#cloud-manager-linear-gradient"
        />
      </defs>
      <path
        className={css`
          fill: ${active
            ? 'url(#cloud-manager-linear-gradient)'
            : 'currentColor'};
        `}
        d="M5.74,17.39h.73a2.38,2.38,0,0,0,0-4.75H.77A9,9,0,0,0,5.74,17.39Z"
      />
      <path
        className={css`
          fill: ${active
            ? 'url(#cloud-manager-linear-gradient-2)'
            : 'currentColor'};
        `}
        d="M2.84,9a3.6,3.6,0,0,1,.9-2.38H.32a9,9,0,0,0,0,4.76H3.73A3.64,3.64,0,0,1,2.84,9Z"
      />
      <path
        className={css`
          fill: ${active
            ? 'url(#cloud-manager-linear-gradient-3)'
            : 'currentColor'};
        `}
        d="M10.1,15a3.63,3.63,0,0,1-1.55,3H9a9,9,0,0,0,8.23-5.36h-8A3.58,3.58,0,0,1,10.1,15Z"
      />
      <path
        className={css`
          fill: ${active ? '#007dab' : 'currentColor'};
        `}
        d="M9,0A9,9,0,0,0,.77,5.36H17.23A9,9,0,0,0,9,0Z"
      />
      <path
        className={css`
          fill: ${active
            ? 'url(#cloud-manager-linear-gradient-4)'
            : 'currentColor'};
        `}
        d="M4.1,9a2.39,2.39,0,0,0,2.38,2.38h11.2a9,9,0,0,0,0-4.76H6.48A2.39,2.39,0,0,0,4.1,9Z"
      />
    </svg>
  );
}

export function AtlasIcon({ active, ...rest }: ProductIconProps) {
  return (
    <svg
      {...rest}
      x="0px"
      y="0px"
      viewBox="0 0 18 18"
      width="18px"
      height="18px"
    >
      <linearGradient
        id="atlas-path-0001"
        gradientUnits="userSpaceOnUse"
        x1="-259.3434"
        y1="361.1949"
        x2="-258.8194"
        y2="362.3814"
        gradientTransform="matrix(8.1429 0 0 -8.8286 2123.7998 3202.6858)"
      >
        <stop offset="0" stopColor="#0D6149" />
        <stop offset="0.3697" stopColor="#03AA4F" />
        <stop offset="0.6496" stopColor="#00D057" />
        <stop offset="0.9118" stopColor="#5FD891" />
        <stop offset="1" stopColor="#80DBA5" />
      </linearGradient>
      <path
        className={css`
          fill: ${active ? 'url(#atlas-path-0001)' : 'currentColor'};
        `}
        d="M12,11c2-1.4,4.2-1.7,6-1.7c0-0.1,0-0.3,0-0.4c0-1.7-0.5-3.3-1.3-4.7c-1.3,0.1-2.6,0.5-4,1.4
		C11,6.8,10.1,8.4,9.6,9.5v3.8C10.2,12.6,11,11.7,12,11z"
      />
      <linearGradient
        id="atlas-path-0002"
        gradientUnits="userSpaceOnUse"
        x1="-258.827"
        y1="361.1505"
        x2="-259.5977"
        y2="362.4457"
        gradientTransform="matrix(8.1429 0 0 -8.8286 2114.457 3202.6858)"
      >
        <stop offset="0" stopColor="#0D6149" />
        <stop offset="0.3697" stopColor="#03AA4F" />
        <stop offset="0.6496" stopColor="#00D057" />
        <stop offset="0.9118" stopColor="#5FD891" />
        <stop offset="1" stopColor="#80DBA5" />
      </linearGradient>
      <path
        className={css`
          fill: ${active ? 'url(#atlas-path-0002)' : 'currentColor'};
        `}
        d="M6,11c1,0.7,1.8,1.5,2.4,2.3V9.5C7.9,8.4,7,6.8,5.3,5.7C4,4.8,2.6,4.4,1.3,4.3
		C0.5,5.6,0,7.2,0,8.9c0,0.1,0,0.3,0,0.4C1.8,9.3,4,9.6,6,11z"
      />
      <linearGradient
        id="atlas-path-0003"
        gradientUnits="userSpaceOnUse"
        x1="-258.8299"
        y1="350.908"
        x2="-257.6751"
        y2="351.788"
        gradientTransform="matrix(7.9714 0 0 -7.1187 2073.0569 2514.6802)"
      >
        <stop offset="0" stopColor="#0D6149" />
        <stop offset="0.3697" stopColor="#03AA4F" />
        <stop offset="0.6496" stopColor="#00D057" />
        <stop offset="0.9118" stopColor="#5FD891" />
        <stop offset="1" stopColor="#80DBA5" />
      </linearGradient>
      <path
        className={css`
          fill: ${active ? 'url(#atlas-path-0003)' : 'currentColor'};
        `}
        d="M12.7,12.1c-1.7,1.1-2.6,2.7-3.1,3.8V18c4.1-0.3,7.5-3.4,8.2-7.3C16.3,10.6,14.4,10.9,12.7,12.1z
		"
      />
      <linearGradient
        id="atlas-path-4"
        gradientUnits="userSpaceOnUse"
        x1="-257.8067"
        y1="350.8745"
        x2="-259.0576"
        y2="351.7716"
        gradientTransform="matrix(7.9714 0 0 -7.1187 2063.8855 2514.6802)"
      >
        <stop offset="0" stopColor="#0D6149" />
        <stop offset="0.3697" stopColor="#03AA4F" />
        <stop offset="0.6496" stopColor="#00D057" />
        <stop offset="0.9118" stopColor="#5FD891" />
        <stop offset="1" stopColor="#80DBA5" />
      </linearGradient>
      <path
        className={css`
          fill: ${active ? 'url(#atlas-path-4)' : 'currentColor'};
        `}
        d="M8.4,15.9c-0.5-1.1-1.4-2.7-3.1-3.8c-1.7-1.2-3.6-1.5-5.1-1.4c0.8,4,4.1,7,8.2,7.3V15.9z"
      />
      <path
        className={css`
          fill: ${active ? '#00804b' : 'currentColor'};
        `}
        d="M6,4.7C7,5.4,7.8,6.2,8.4,7V0C5.9,0.2,3.7,1.3,2.2,3.2C3.4,3.3,4.8,3.8,6,4.7z"
      />
      <path
        className={css`
          fill: ${active ? '#00804b' : 'currentColor'};
        `}
        d="M15.8,3.2c-1.5-1.8-3.7-3-6.2-3.1v7C10.2,6.2,11,5.4,12,4.7C13.2,3.8,14.6,3.3,15.8,3.2z"
      />
    </svg>
  );
}

export function RealmIcon({ active, ...rest }: ProductIconProps) {
  return (
    <svg
      {...rest}
      x="0px"
      y="0px"
      viewBox="0 0 18 18"
      width="18px"
      height="18px"
    >
      <linearGradient
        id="realm-path-0001"
        gradientUnits="userSpaceOnUse"
        x1="12.4555"
        y1="6.7462"
        x2="13.454"
        y2="13.2264"
        gradientTransform="matrix(1 0 0 -1 0 20)"
      >
        <stop offset="0" stopColor="#AF478B" />
        <stop offset="0.22" stopColor="#C66191" />
        <stop offset="0.53" stopColor="#EC8C9A" />
        <stop offset="0.66" stopColor="#EE99A2" />
        <stop offset="0.88" stopColor="#F3BCB6" />
        <stop offset="1" stopColor="#F6D0C2" />
      </linearGradient>
      <path
        className={css`
          fill: ${active ? 'url(#realm-path-0001)' : 'currentColor'};
        `}
        d="M7.8,11.1l0.8,0.3c1.7,0.7,3.5,1.1,5.3,1c1.3-0.1,2.6-0.5,3.8-1.1C17.9,10.6,18,9.8,18,9V8.7
			C14.4,7.8,10.6,8.7,7.8,11.1z"
      />
      <linearGradient
        id="realm-path-0002"
        gradientUnits="userSpaceOnUse"
        x1="8.7566"
        y1="2.3021"
        x2="8.8565"
        y2="9.5311"
        gradientTransform="matrix(1 0 0 -1 0 20)"
      >
        <stop offset="0" stopColor="#AF478B" />
        <stop offset="0.22" stopColor="#C66191" />
        <stop offset="0.53" stopColor="#EC8C9A" />
        <stop offset="0.66" stopColor="#EE99A2" />
        <stop offset="0.88" stopColor="#F3BCB6" />
        <stop offset="1" stopColor="#F6D0C2" />
      </linearGradient>
      <path
        className={css`
          fill: ${active ? 'url(#realm-path-0002)' : 'currentColor'};
        `}
        d="M17,13c-1,0.4-2,0.6-3.1,0.7c-2,0.1-4-0.3-5.8-1.1c-1.8-0.8-3.8-1.1-5.8-0.9c-0.6,0.1-1.2,0.3-1.7,0.5
			c1.8,4.6,7,6.9,11.6,5.1C14.3,16.6,16,15,17,13z"
      />
      <path
        className={css`
          fill: ${active ? '#6e60f2' : 'currentColor'};
        `}
        d="M4.4,5.3c2.4,0,4.6,1,6.3,2.6c2.3-0.9,4.7-1.1,7.1-0.6c-0.9-4.9-5.6-8.1-10.5-7.2c-3.3,0.6-5.9,3-6.9,6.1
			C1.7,5.7,3,5.3,4.4,5.3z"
      />
      <linearGradient
        id="realm-path-0003"
        gradientUnits="userSpaceOnUse"
        x1="4.1834"
        y1="8.0334"
        x2="5.1919"
        y2="14.5037"
        gradientTransform="matrix(1 0 0 -1 0 20)"
      >
        <stop offset="0" stopColor="#AF478B" />
        <stop offset="0.22" stopColor="#C66191" />
        <stop offset="0.53" stopColor="#EC8C9A" />
        <stop offset="0.66" stopColor="#EE99A2" />
        <stop offset="0.88" stopColor="#F3BCB6" />
        <stop offset="1" stopColor="#F6D0C2" />
      </linearGradient>
      <path
        className={css`
          fill: ${active ? 'url(#realm-path-0003)' : 'currentColor'};
        `}
        d="M0.1,7.9C0,8.3,0,8.6,0,9c0,0.7,0.1,1.3,0.2,2c0.6-0.3,1.2-0.4,1.9-0.6c1.4-0.3,2.9-0.2,4.3,0.2
			c0.9-0.9,1.9-1.6,3-2.1c-1.4-1.2-3.2-1.9-5-1.9C2.9,6.6,1.4,7.1,0.1,7.9z"
      />
    </svg>
  );
}

export function ChartsIcon({ active, ...rest }: ProductIconProps) {
  return (
    <svg
      {...rest}
      x="0px"
      y="0px"
      viewBox="0 0 18 18"
      width="18px"
      height="18px"
    >
      <linearGradient
        id="charts-path-0001"
        gradientUnits="userSpaceOnUse"
        x1="-274.5664"
        y1="364.6419"
        x2="-273.8383"
        y2="365.0972"
        gradientTransform="matrix(14.0143 0 0 -9.5143 3855.8286 3484.9858)"
      >
        <stop offset="0" stopColor="#007DAE" />
        <stop offset="0.9915" stopColor="#78CFDD" />
      </linearGradient>
      <path
        className={css`
          fill: ${active ? 'url(#charts-path-0001)' : 'currentColor'};
        `}
        d="M11.5,14.4c-0.2,0.2-0.6,0.2-0.8,0l-3-2.2l-4.1,3.9C5.1,17.3,7,18,9,18c5,0,9-4,9-9
			c0-0.3,0-0.5,0-0.8L11.5,14.4z"
      />
      <linearGradient
        id="charts-path-0002"
        gradientUnits="userSpaceOnUse"
        x1="-277.6113"
        y1="372.6364"
        x2="-277.7775"
        y2="373.1026"
        gradientTransform="matrix(16.6286 0 0 -11.8286 4626.7002 4419.7002)"
      >
        <stop offset="0.1669" stopColor="#2AA0C7" />
        <stop offset="0.7354" stopColor="#B5E7CA" />
      </linearGradient>
      <path
        className={css`
          fill: ${active ? 'url(#charts-path-0002)' : 'currentColor'};
        `}
        d="M8,10.9l3,2.2l6.7-6.4c-0.4-1.3-1-2.6-1.9-3.6l-4.8,4.6C10.7,8,10.4,8,10.2,7.9c0,0,0,0,0,0
			c-0.1,0-2-1.5-2.9-2.2l-6.7,6.4c0.4,1.2,1.1,2.3,2.1,3.3L7.2,11C7.4,10.8,7.8,10.8,8,10.9z"
      />
      <path
        className={css`
          fill: ${active ? '#007dae' : 'currentColor'};
        `}
        d="M6.7,4.4c0.2-0.2,0.6-0.2,0.8,0l3,2.2l4.4-4.2C13.3,0.8,11.2,0,9,0C4,0,0,4,0,9
			c0,0.6,0,1.1,0.2,1.7L6.7,4.4z"
      />
    </svg>
  );
}

export function CloudIcon(props: HTMLElementProps<'svg'>) {
  return (
    <svg {...props} width="24px" height="24px" viewBox="0 0 24 24">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path
          d="M11.7404807,8.23529929 C11.9346566,8.02930005 12.2642284,8.02930005 12.4584043,8.23529929 C12.5280634,8.30919986 12.6300191,8.42291143 12.7571348,8.57246198 L12.7571348,8.57246198 L12.965786,8.82317052 C13.3400574,9.281764 13.7140665,9.78922793 14.0637367,10.3326541 C14.9193615,11.6623895 15.4927472,12.9879494 15.6490159,14.2520519 C15.9122514,16.3814385 14.955762,18.1128203 12.5915279,19.2051685 L12.5906761,20.2522716 C12.5906761,20.5211563 12.3707433,20.7391304 12.0994425,20.7391304 C11.8582863,20.7391304 11.6577171,20.566904 11.6161234,20.3397851 L11.608209,20.2522716 L11.6081753,19.2055464 C9.24334373,18.1132197 8.28660332,16.3816841 8.54986915,14.2520519 C8.7061379,12.9879494 9.27952361,11.6623895 10.1351483,10.3326541 C10.4848185,9.78922793 10.8588277,9.281764 11.2330991,8.82317052 C11.3459675,8.68487314 11.4466908,8.56561805 11.532258,8.46708094 L11.532258,8.46708094 Z M12.0994425,9.31060536 L11.9969642,9.4355287 C11.6446193,9.86725583 11.2920121,10.3456811 10.963507,10.8562143 C10.1797635,12.0742384 9.66050845,13.2746583 9.52504439,14.3704657 C9.30439706,16.1553448 10.1100895,17.5274448 12.2906389,18.4405985 L12.2906389,18.4405985 L12.0994425,18.3564431 L12.3630929,18.2337186 C14.1299606,17.3603114 14.8244827,16.1248778 14.6935383,14.5601212 L14.6935383,14.5601212 L14.6738407,14.3704657 C14.5383766,13.2746583 14.0191216,12.0742384 13.235378,10.8562143 C12.906873,10.3456811 12.5542658,9.86725583 12.2019208,9.4355287 L12.2019208,9.4355287 L12.0994425,9.31060536 Z M12.044848,3.00183966 L12.2032695,3.00221434 C15.0440618,3.04285123 17.651111,4.93237382 18.4215314,7.76925633 L18.3282843,7.79842172 C20.2519273,7.14549065 22.4721677,8.01636463 23.4447356,9.81345208 L23.5377762,9.9962261 C24.6385451,12.0690613 23.6882753,14.7200739 21.5873714,15.7037891 C21.0493038,16.0237546 20.4046111,16.1626571 19.6644396,16.1626571 C19.3931388,16.1626571 19.173206,15.9446829 19.173206,15.6757982 C19.173206,15.4069135 19.3931388,15.1889393 19.6644396,15.1889393 C20.2407742,15.1889393 20.7156474,15.0866254 21.1243434,14.8463183 C22.7703214,14.0735879 23.5047547,12.0247047 22.6591283,10.4313965 C21.9309979,8.90792166 20.0798666,8.17237287 18.5439611,8.75694056 C18.5565819,8.84320089 18.5646727,8.93192786 18.5704883,9.02414817 L18.5788464,9.19444222 C18.5808075,9.25191206 18.5820274,9.31261554 18.5827569,9.38413807 L18.5837257,10.4177224 C18.5837257,11.030804 17.7073893,11.0648641 17.6100186,10.5199027 L17.6012586,10.4177224 L17.6010714,9.51014136 C17.6004051,9.31502048 17.5977545,9.20889419 17.5899344,9.08488702 C17.5781738,8.89839392 17.5554063,8.73793337 17.5176789,8.58836757 L17.5140032,8.57270202 C17.5137782,8.57166428 17.5135562,8.5706249 17.5133374,8.56958389 C17.0512473,6.37130407 15.4888401,4.69991475 13.3456444,4.16877387 C12.9198369,4.05367873 12.491284,3.9915255 12.0672835,3.97820016 C11.5974739,3.98045319 11.1204917,4.04332819 10.6466367,4.17139252 C8.51355152,4.69991475 6.95114436,6.37130407 6.48905423,8.56958389 C6.42245802,8.88639895 6.06830404,9.05184087 5.77935589,8.90111724 C4.19023084,8.07218407 2.12293716,8.80007682 1.33401852,10.4497317 C0.497636915,12.0247047 1.2320702,14.0735879 2.92049545,14.8688331 C3.28674428,15.0866254 3.76161747,15.1889393 4.33795202,15.1889393 C4.60925283,15.1889393 4.82918559,15.4069135 4.82918559,15.6757982 C4.82918559,15.9446829 4.60925283,16.1626571 4.33795202,16.1626571 C3.59778057,16.1626571 2.95308779,16.0237546 2.45746747,15.7263039 C0.377156072,14.7496689 -0.579223134,12.2235804 0.364336842,10.1973317 L0.455370608,10.0145612 C1.35020312,8.1422938 3.53421241,7.18857919 5.47173829,7.73560008 L5.581,7.769 L5.58764534,7.7444681 C6.38952646,4.83783367 9.12192886,2.93233884 12.044848,3.00183966 Z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );
}

export function SupportIcon(props: HTMLElementProps<'svg'>) {
  return (
    <svg {...props} width="25px" height="24px" viewBox="0 0 24 24">
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g stroke="currentColor">
          <path d="M2.4,9.7 C2.3,6.3 4,3.2 6.8,1.5 C9.7,-0.2 13.3,-0.2 16.1,1.5 C19,3.2 20.7,6.4 20.5,9.7"></path>
          <path d="M19.4,18.1 C18,20.1 15.8,21.4 13.4,21.8"></path>
          <path d="M5.2,15.6 C5.3,16.2 5.1,16.8 4.8,17.3 C4.3,18 3.3,18.4 2.4,18.2 C1.5,18 0.8,17.2 0.7,16.3 L0.1,12.3 C1.38777878e-17,11.7 0.2,11.1 0.5,10.6 C1,9.9 2,9.5 2.9,9.7 C3.8,9.9 4.5,10.7 4.6,11.6 L5.2,15.6 Z"></path>
          <path d="M18,15.6 C17.9,16.2 18.1,16.8 18.4,17.3 C18.9,18 19.9,18.4 20.8,18.2 C21.7,18 22.4,17.2 22.5,16.3 L23.1,12.3 C23.2,11.7 23,11.1 22.7,10.6 C22.2,9.9 21.2,9.5 20.3,9.7 C19.4,9.9 18.7,10.7 18.6,11.6 L18,15.6 Z"></path>
          <path d="M11.6,23.2 C12.6,23.2 13.5,22.3 13.5,21.3 C13.5,20.2 12.6,19.4 11.6,19.4 C10.6,19.4 9.7,20.3 9.7,21.3 C9.7,22.4 10.5,23.2 11.6,23.2 Z"></path>
        </g>
      </g>
    </svg>
  );
}

export function UniversityIcon(props: HTMLElementProps<'svg'>) {
  return (
    <svg {...props} width="24px" height="24px" viewBox="0 0 24 24">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(3.000000, 0.000000)" fill="currentColor">
          <path d="M14.4947368,0.075 C15.5979096,0.075 16.4157895,0.941743505 16.4157895,2.0125 L16.4157895,2.0125 L16.4161845,4.65382856 C17.1897696,4.85592753 17.7678336,5.52051678 17.8310855,6.37747504 L17.8368421,6.53454944 L17.8368421,21.941248 C17.8368421,22.743213 17.3044981,23.3314694 16.5362186,23.3979011 L16.3894737,23.4041667 L2.55789474,23.4041667 C1.28038914,23.4041667 0.161395342,22.3887718 0.0739198468,21.1360937 L0.0684210526,20.9783293 L0.0684210526,2.77916667 L0.0735657777,2.60524646 C0.158917268,1.16918522 1.29639007,0.075 2.74736842,0.075 L2.74736842,0.075 Z M1.06797877,4.87448291 L1.06842105,20.9783293 C1.06842105,21.6938019 1.6885465,22.325528 2.41963884,22.3973731 L2.55789474,22.4041667 L16.3894737,22.4041667 C16.6476427,22.4041667 16.8003209,22.2781387 16.8310621,22.0370348 L16.8368421,21.941248 L16.8368421,6.53454944 C16.8368421,6.01991887 16.4901,5.64674568 16.0250939,5.5960609 L15.9157895,5.59017145 L15.1578947,5.59017145 C15.0421779,5.59017145 14.9356424,5.55086185 14.8509133,5.48486786 L2.74736842,5.48333333 C2.09015482,5.48333333 1.48975397,5.27308293 1.06797877,4.87448291 Z M4.45508895,11.1860671 L4.52400281,11.24432 L6.70295018,13.4484867 C6.87411254,13.6216301 6.89313058,13.8885356 6.7600043,14.082515 L6.70295018,14.1515133 L4.52400281,16.35568 C4.32986737,16.5520624 4.01329012,16.5538839 3.81690773,16.3597484 C3.64234562,16.1871836 3.62151061,15.9178746 3.75538323,15.722233 L3.81283929,15.6526533 L5.643,13.8 L3.81283929,11.9473467 C3.64027445,11.7727845 3.6225398,11.5032536 3.75865481,11.3091654 L3.81690773,11.2402516 C3.99146985,11.0676867 4.26100075,11.0499521 4.45508895,11.1860671 Z M12.9789474,13.3958333 C13.2550897,13.3958333 13.4789474,13.619691 13.4789474,13.8958333 C13.4789474,14.1412932 13.3020722,14.3454417 13.068823,14.3877777 L12.9789474,14.3958333 L9.18947368,14.3958333 C8.91333131,14.3958333 8.68947368,14.1719757 8.68947368,13.8958333 C8.68947368,13.6503734 8.86634884,13.446225 9.09959805,13.403889 L9.18947368,13.3958333 L12.9789474,13.3958333 Z M14.4947368,1.075 L2.74736842,1.075 C1.79322802,1.075 1.06842105,1.80819593 1.06842105,2.77916667 L1.06742105,2.772 L1.06842105,2.77916667 L1.06852326,2.79499798 C1.07373263,3.19928684 1.27782739,3.6481291 1.62375831,4.00234625 L1.62375831,4.00234625 L1.7127048,4.10246384 C1.96366264,4.35416265 2.3229573,4.48333333 2.74736842,4.48333333 L2.74736842,4.48333333 L15.415,4.483 L15.4157895,2.0125 C15.4157895,1.51940144 15.0850707,1.13370276 14.6074749,1.08111875 L14.6074749,1.08111875 L14.4947368,1.075 Z"></path>
        </g>
      </g>
    </svg>
  );
}

export function MegaphoneIcon(props: HTMLElementProps<'svg'>) {
  return (
    <svg
      {...props}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(2.000000, 3.000000)" fill="currentColor">
          <path d="M8.143,12.7991851 L6.64421737,12.8007721 L6.59581989,13.0776329 C6.58315814,13.1600887 6.57396715,13.2327133 6.56824691,13.2955068 L6.56212691,13.3857869 C6.53925571,13.9585785 6.65499063,14.3879686 6.72407593,14.6499587 C7.03807942,15.8407448 7.75732914,16.306839 7.77213216,16.5665588 C7.78693518,16.8262787 7.78693518,16.9992896 7.51136075,17.134491 C7.41577615,17.1813864 7.2467213,17.2074736 7.00419621,17.2127528 L4.44604432,17.2134233 C4.17051663,17.2134233 3.96421322,17.1698334 3.82713408,17.0826534 C3.40082299,16.811527 2.95305668,15.8135032 2.83908868,15.0305251 C2.77011416,14.5566592 2.7637557,13.8132278 2.82001331,12.800231 L2,12.8 C0.8954305,12.8 0,11.9045695 0,10.8 L0,7 C0,5.8954305 0.8954305,5 2,5 L9,5 C9.10948103,5.00117463 9.20312486,4.99767977 9.28322063,4.99410027 C10.4342369,4.9426611 11.0944612,4.67719617 11.4351318,4.50345463 L11.5033039,4.46773965 C12.9080252,3.71253392 13.4476237,3.24084609 14.2294768,2.65326532 C14.7507121,2.26154481 15.1927384,1.87347929 15.5555556,1.48906877 L16.0251834,1.14201898 C16.1618494,1.04102437 16.3157448,0.980002666 16.4728899,0.956855557 L16.5911395,0.946563927 L16.7092971,0.950278555 C16.9838715,0.975133654 17.2469909,1.11276668 17.4237314,1.35193205 C17.550884,1.52399497 17.6195009,1.73230227 17.6195009,1.94624951 L17.6195009,15.6466501 C17.6195009,16.159486 17.2334607,16.5821573 16.736122,16.6399224 L16.6195009,16.6466501 C16.5066088,16.6466501 16.3945317,16.6275342 16.2880222,16.5901128 L16.1202258,16.5311588 L15.502373,15.9807071 C15.2786946,15.7833349 15.0372887,15.5720746 14.7781552,15.346926 C14.0007549,14.6714802 13.1325013,14.0538205 12.3097504,13.5934316 C11.5502881,13.1684572 10.692251,13.0237069 10.2509361,12.9178568 L10.1495873,12.892065 C9.98308987,12.8463845 9.74303991,12.8198424 9.42943742,12.8124388 L9.23244962,12.8102932 L9.01780921,12.8127408 L8.143,12.7991851 Z M16.6195009,1.94624951 L16.211,2.247 L16.0308034,2.43190676 C15.7691829,2.68804398 15.4786701,2.94328494 15.1592763,3.19805356 L14.1851644,3.94361892 C13.487748,4.46960337 12.8932071,4.85585713 11.9768288,5.3485201 C11.3133863,5.70519982 10.4887887,5.94122128 9.32786628,5.99310316 L9,6 L2,6 C1.48716416,6 1.06449284,6.38604019 1.00672773,6.88337888 L1,7 L1,10.8 C1,11.3128358 1.38604019,11.7355072 1.88360439,11.7932723 L2.00028166,11.8 L3.87707352,11.8005287 L3.81847476,12.8556813 C3.76562244,13.8073612 3.77149288,14.4937342 3.82866067,14.8864859 C3.90353053,15.4008536 4.19919089,16.0562689 4.333725,16.2109731 L4.341,16.218 L4.34772445,16.2144761 L6.323,16.213 L6.18791129,15.982877 C6.05168032,15.7367695 5.93613182,15.4759024 5.84288379,15.1940353 L5.75712917,14.9049371 C5.72439239,14.7807904 5.71171627,14.7313583 5.69237011,14.6488408 C5.61315514,14.3109639 5.56589358,13.9789414 5.56047784,13.6061342 L5.5644167,13.318153 L5.57237051,13.2047864 C5.57980464,13.1231787 5.59102362,13.033521 5.60599686,12.9350268 L5.66214884,12.6122479 L5.81775712,11.8016467 L8.15849369,11.7993052 L8.99658386,11.8129661 C9.519717,11.8018599 9.93177401,11.8239157 10.2580592,11.8905925 L11.1092587,12.0886959 C11.5251102,12.1907256 11.8930593,12.3052131 12.2536172,12.4565082 C12.4428846,12.5359274 12.6243473,12.6235563 12.7980699,12.7207667 C13.679972,13.214255 14.6041305,13.8709966 15.4340273,14.5920539 L16.619,15.634 L16.6195009,1.94624951 Z M18.7357507,11.2641046 L18.8111202,11.3137227 L19.8111202,12.1085869 C20.0272917,12.2804139 20.06324,12.5949488 19.8914131,12.8111202 C19.8150455,12.9071965 19.7104888,12.967673 19.5989068,12.9901311 L19.5142338,12.9998084 C19.4289049,13.0022817 19.3426006,12.9830294 19.2642493,12.9410311 L19.1888798,12.8914131 L18.1888798,12.0965488 C17.9727083,11.9247219 17.93676,11.610187 18.1085869,11.3940155 C18.1849545,11.2979393 18.2895112,11.2374627 18.4010932,11.2150046 L18.4857662,11.2053273 C18.5710951,11.2028541 18.6573994,11.2221064 18.7357507,11.2641046 Z M20.5,8.70513577 C20.7761424,8.70513577 21,8.9289934 21,9.20513577 C21,9.45059566 20.8231248,9.65474414 20.5898756,9.6970801 L20.5,9.70513577 L18.5,9.70513577 C18.2238576,9.70513577 18,9.48127815 18,9.20513577 C18,8.95967588 18.1768752,8.7555274 18.4101244,8.71319144 L18.5,8.70513577 L20.5,8.70513577 Z M9,6 L9,11.818634 C8.874133,11.8088742 8.721067,11.8021858 8.540802,11.7985687 C8.360537,11.7949517 8.18026967,11.7949517 8,11.7985687 L8,6 L9,6 Z M19.4962832,4.99998689 C19.6100992,4.99909905 19.7248365,5.0368465 19.819285,5.11521817 C20.0081821,5.27196151 20.0523401,5.53844132 19.9359744,5.74497592 L19.8847818,5.81928505 L18.8847818,7.02442082 C18.8064102,7.11886933 18.7006044,7.1771331 18.5885747,7.19723902 L18.5037168,7.20514888 C18.3899008,7.20603672 18.2751635,7.16828928 18.180715,7.08991761 C17.9918179,6.93317426 17.9476599,6.66669445 18.0640256,6.46015986 L18.1152182,6.38585073 L19.1152182,5.18071495 C19.1935898,5.08626645 19.2993956,5.02800268 19.4114253,5.00789675 L19.4962832,4.99998689 Z"></path>
        </g>
      </g>
    </svg>
  );
}
