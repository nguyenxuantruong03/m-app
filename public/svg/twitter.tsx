interface TwitterSVGProps {
  width?: number;
  height?: number;
}
const TwitterSVG = ({ width = 24, height = 24 }: TwitterSVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      id="twitter"
      width={width}
      height={height}
    >
      <path
        fill="#050505"
        fill-rule="evenodd"
        d="m60,12c0-4.42-3.58-8-8-8H12C7.58,4,4,7.58,4,12v40c0,4.42,3.58,8,8,8h40c4.42,0,8-3.58,8-8V12h0Z"
      ></path>
      <path
        fill="#fff"
        d="m15.07,48.28h4l10.68-12.14,9.29,12.12h10.86l-14.25-18.84,12.06-13.7h-4l-9.91,11.26-8.5-11.25h-11.21l13.79,17.99-12.82,14.57Zm5.11-29.56h3.64l20.06,26.54h-3.35l-20.34-26.54Z"
      ></path>
    </svg>
  );
};

export default TwitterSVG;