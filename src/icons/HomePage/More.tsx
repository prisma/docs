import React from 'react'
export default () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_dd)">
      <rect x="6" y="3" width="56" height="56" rx="28" fill="white" />
      <path
        d="M30 25H43M30 31H43M30 37H43M25 25H25.01M25 31H25.01M25 37H25.01"
        stroke="#805AD5"
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
