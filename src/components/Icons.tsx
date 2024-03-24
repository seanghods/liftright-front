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
