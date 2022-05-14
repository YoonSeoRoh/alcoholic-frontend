const KakaoSvg = () => {
    return(
    <svg width="42" height="42" viewBox="0 0 34 34" cursor="pointer">
        <circle cx="17" cy="17" r="14.875" fill="rgb(254, 229, 0)"></circle>
        <path
        d="M 17.0002 9.03125 C 12.0901 9.03125 8.146 12.0938 8.146 15.8415 C 8.30698 18.4205 9.91683 20.6369 12.2511 21.604 L 11.4059 24.6666 C 11.3657 24.7472 11.4059 24.8681 11.4864 24.908 C 11.5669 24.989 11.7279 24.989 11.8084 24.908 L 15.3903 22.5309 C 15.9135 22.6115 16.4367 22.6518 17.0002 22.6518 C 21.87 22.6518 25.8543 19.5892 25.8543 15.8415 C 25.8543 12.0938 21.9102 9.03125 17.0002 9.03125 Z"
        fill="black"
        fillOpacity="0.9"
        ></path>
    </svg>
    );
}

const GoogleSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="42" height="42" cursor="pointer">
            <g transform="matrix(1, 0, 0, 1, 28.009001, -37.138998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
            </g>
        </svg>
    );   
}

export {KakaoSvg, GoogleSvg};