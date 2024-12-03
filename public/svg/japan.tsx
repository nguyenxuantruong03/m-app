interface JapanSVGProps {
    width?: number;
    height?: number;
}

const JapanSVG = ({ width = 24, height = 24 }: JapanSVGProps) => {
    return (
        <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 55.7 38.9"
            width={width}
            height={height}
        >
            <g>
                <path
                    fill="#FFFFFF"
                    stroke="#CCCCCC"
                    strokeWidth="0.5"
                    strokeMiterlimit="2.6131"
                    d="M3.28,0.25h49.13c1.67,0,3.03,1.36,3.03,3.03v32.33c0,1.67-1.36,3.03-3.03,3.03H3.28 c-1.67,0-3.03-1.37-3.03-3.03V3.28C0.25,1.61,1.61,0.25,3.28,0.25L3.28,0.25z"
                />
                <path
                    fill="#BC002D"
                    d="M39.37,19.45c0-6.36-5.16-11.52-11.52-11.52c-6.36,0-11.52,5.16-11.52,11.52c0,6.36,5.16,11.52,11.52,11.52 C34.21,30.97,39.37,25.81,39.37,19.45L39.37,19.45z"
                />
            </g>
        </svg>
    );
};

export default JapanSVG;
