const buttonSvg = (
  <svg
    height="36px"
    width="36px"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 36 36"
  >
    <path
      fill="#0000008f"
      d="M21.559,12.062 L15.618,17.984 L21.5221,23.944 C22.105,24.533 22.1021,25.482 21.5131,26.065 C21.2211,26.355 20.8391,26.4999987 20.4571,26.4999987 C20.0711,26.4999987 19.6851,26.352 19.3921,26.056 L12.4351,19.034 C11.8531,18.446 11.8551,17.4999987 12.4411,16.916 L19.4411,9.938 C20.0261,9.353 20.9781,9.354 21.5621,9.941 C22.1471,10.528 22.1451,11.478 21.5591,12.062 L21.559,12.062 Z"
    ></path>
  </svg>
);

export const NextButton = ({ handler = () => {} }) => {
  return (
    <button
      onClick={handler}
      className="transform scale-x-[-1] bg-[#e8e8ed] rounded-[36px] block font-normal h-[36px] leading-[36px] text-center w-[36px] absolute top-1/2 right-2 -translate-y-1/2"
    >
      {buttonSvg}
    </button>
  );
};

export const PreviousButton = ({ handler = () => {} }) => {
  return (
    <button
      onClick={handler}
      className="bg-[#e8e8ed] rounded-[36px] block font-normal h-[36px] leading-[36px] text-center w-[36px] absolute top-1/2 left-2 -translate-y-1/2"
    >
      {buttonSvg}
    </button>
  );
};
