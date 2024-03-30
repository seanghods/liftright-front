export function LoadingIcon({ width = "75px", height = "75px" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        background: "none",
        display: "block",
        shapeRendering: "auto",
      }}
      width={width}
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <path
        d="M17 50A33 33 0 0 0 83 50A33 35.5 0 0 1 17 50"
        fill="#93dbe9"
        stroke="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 51.25;360 50 51.25"
        ></animateTransform>
      </path>
    </svg>
  );
}

export function Xmark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="red"
      className="w-20 h-20"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function GoogleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 6.54541V9.6436H12.3054C12.1164 10.64 11.549 11.4836 10.6981 12.0509L13.2945 14.0655C14.8072 12.6691 15.68 10.6182 15.68 8.18185C15.68 7.61459 15.6291 7.06908 15.5345 6.5455L8 6.54541Z"
        fill="#4285F4"
      ></path>
      <path
        d="M3.51674 9.52271L2.93116 9.97096L0.858398 11.5855C2.17476 14.1964 4.87274 16 7.99999 16C10.1599 16 11.9708 15.2873 13.2945 14.0655L10.6981 12.0509C9.9854 12.5309 9.07631 12.8219 7.99999 12.8219C5.92 12.8219 4.15278 11.4183 3.52001 9.52732L3.51674 9.52271Z"
        fill="#34A853"
      ></path>
      <path
        d="M0.858119 4.41455C0.312695 5.49087 0 6.70543 0 7.99996C0 9.29448 0.312695 10.509 0.858119 11.5854C0.858119 11.5926 3.51998 9.51991 3.51998 9.51991C3.35998 9.03991 3.26541 8.53085 3.26541 7.99987C3.26541 7.46889 3.35998 6.95984 3.51998 6.47984L0.858119 4.41455Z"
        fill="#FBBC05"
      ></path>
      <path
        d="M8.00015 3.18545C9.17835 3.18545 10.2256 3.59271 11.062 4.37818L13.3529 2.0873C11.9638 0.792777 10.1602 0 8.00015 0C4.8729 0 2.17476 1.79636 0.858398 4.41455L3.52018 6.48001C4.15287 4.58908 5.92016 3.18545 8.00015 3.18545Z"
        fill="#EA4335"
      ></path>
    </svg>
  );
}
