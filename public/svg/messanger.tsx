interface MessangerSVGProps{
    width?: number
    height?: number;
}
const MessangerSVG = ({width = 24 ,height = 24}:MessangerSVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54" id="messanger"  width={width}
    height={height}>
      <defs>
        <radialGradient
          id="a"
          cx="-19.34"
          cy="32.87"
          r="60.36"
          gradientTransform="matrix(.83 0 0 .83 30.23 23.73)"
          gradientUnits="userSpaceOnUse"
         
        >
          <stop offset="0" stop-color="#0096ff"></stop>
          <stop offset=".14" stop-color="#2b7afe"></stop>
          <stop offset=".43" stop-color="#7f43fb"></stop>
          <stop offset=".56" stop-color="#a02dfa"></stop>
          <stop offset=".76" stop-color="#d23db8"></stop>
          <stop offset=".93" stop-color="#ff4b7d"></stop>
          <stop offset="1" stop-color="#ff735f"></stop>
        </radialGradient>
      </defs>
      <g>
        <path
          fill="url(#a)"
          d="M28.16,4.62C15.3,4.62,5.32,14.05,5.32,26.77A21.65,21.65,0,0,0,12.5,43.16a1.84,1.84,0,0,1,.61,1.3l-.29,4.69a1.67,1.67,0,0,0,2.56,1.61l4.95-2.62a1.83,1.83,0,0,1,1.22-.09,25,25,0,0,0,6.61.88C41,48.93,51,39.51,51,26.78S41,4.62,28.16,4.62Zm13.72,16L35.17,32.31a3.43,3.43,0,0,1-5,.91l-5.34-4a1.37,1.37,0,0,0-1.65,0L16,35.73a1.08,1.08,0,0,1-1.57-1.44l6.71-11.68a3.42,3.42,0,0,1,4.95-.91l5.34,4a1.35,1.35,0,0,0,1.65,0l7.21-6.5A1.09,1.09,0,0,1,41.88,20.64Z"
        ></path>
      </g>
    </svg>
  );
};

export default MessangerSVG;
