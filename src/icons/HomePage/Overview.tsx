import React from 'react';

export default () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_dd)">
      <rect x="6" y="3" width="56" height="56" rx="28" fill="white" />
      <path
        d="M34 26C34 24.9391 33.5786 23.9217 32.8284 23.1716C32.0783 22.4214 31.0609 22 30 22H24V37H31C31.7956 37 32.5587 37.3161 33.1213 37.8787C33.6839 38.4413 34 39.2044 34 40M34 26V40M34 26C34 24.9391 34.4214 23.9217 35.1716 23.1716C35.9217 22.4214 36.9391 22 38 22H44V37H37C36.2044 37 35.4413 37.3161 34.8787 37.8787C34.3161 38.4413 34 39.2044 34 40"
        stroke="#48BB78"
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
