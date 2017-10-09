import React from "react";
import ForkImage from "./fork.png";
import "./CustomLoader.css";

const CustomLoader = () =>
  <svg
    className="loading-fork"
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="200.000000pt"
    height="200.000000pt"
    viewBox="0 0 200.000000 200.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
      fill="#000000"
      stroke="none"
    >
      <path d="M937 1863 c-4 -54 -7 -148 -7 -209 0 -143 -10 -236 -24 -231 -11 4
  -22 184 -25 410 -1 76 -4 97 -15 97 -21 0 -26 -23 -26 -114 0 -45 -6 -120 -12
  -166 -23 -159 -11 -224 68 -362 l44 -77 0 -206 c0 -178 -4 -239 -32 -433 -38
  -274 -42 -428 -14 -485 44 -89 158 -89 202 0 28 57 23 189 -16 438 -30 184
  -34 239 -37 446 l-4 237 44 65 c85 124 101 199 79 372 -7 50 -12 131 -12 182
  0 82 -9 117 -26 100 -3 -3 -9 -116 -13 -251 -4 -135 -10 -249 -14 -252 -19
  -19 -25 31 -31 263 -6 228 -13 289 -31 272 -2 -3 -9 -123 -13 -267 -5 -144
  -12 -265 -15 -268 -17 -17 -27 15 -27 90 0 208 -13 446 -25 446 -8 0 -14 -32
  -18 -97z" />
    </g>
  </svg>;

export default CustomLoader;
