interface RedditSVGProps {
  width?: number;
  height?: number;
}
const RedditSVG = ({ width = 24, height = 24 }: RedditSVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Reddit"
      viewBox="0 0 512 512"
      id="reddit"
      width={width}
      height={height}
    >
      <rect width="512" height="512" fill="#f40" rx="15%"></rect>
      <g fill="#fff">
        <ellipse cx="256" cy="307" rx="166" ry="117"></ellipse>
        <circle cx="106" cy="256" r="42"></circle>
        <circle cx="407" cy="256" r="42"></circle>
        <circle cx="375" cy="114" r="32"></circle>
      </g>
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="#fff" stroke-width="16" d="m256 196 23-101 73 15"></path>
        <path
          stroke="#f40"
          stroke-width="13"
          d="m191 359c33 25 97 26 130 0"
        ></path>
      </g>
      <g fill="#f40">
        <circle cx="191" cy="287" r="31"></circle>
        <circle cx="321" cy="287" r="31"></circle>
      </g>
    </svg>
  );
};

export default RedditSVG;