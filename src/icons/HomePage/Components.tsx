import React from 'react'
export default () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_dd)">
      <rect x="6" y="3" width="56" height="56" rx="28" fill="white" />
      <path
        d="M38.5 28.3589L29.5 23.1689M25.27 25.9189L34 30.9689L42.73 25.9189M34 41.0389V30.9589M43 34.9589V26.9589C42.9996 26.6082 42.9071 26.2638 42.7315 25.9601C42.556 25.6565 42.3037 25.4043 42 25.2289L35 21.2289C34.696 21.0534 34.3511 20.961 34 20.961C33.6489 20.961 33.304 21.0534 33 21.2289L26 25.2289C25.6963 25.4043 25.444 25.6565 25.2685 25.9601C25.0929 26.2638 25.0004 26.6082 25 26.9589V34.9589C25.0004 35.3097 25.0929 35.6541 25.2685 35.9578C25.444 36.2614 25.6963 36.5136 26 36.6889L33 40.6889C33.304 40.8645 33.6489 40.9569 34 40.9569C34.3511 40.9569 34.696 40.8645 35 40.6889L42 36.6889C42.3037 36.5136 42.556 36.2614 42.7315 35.9578C42.9071 35.6541 42.9996 35.3097 43 34.9589Z"
        stroke="#ED64A6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_dd"
        x="0"
        y="0"
        width="68"
        height="68"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="3" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.101961 0 0 0 0 0.12549 0 0 0 0 0.172549 0 0 0 0.05 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.101961 0 0 0 0 0.12549 0 0 0 0 0.172549 0 0 0 0.1 0"
        />
        <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);
