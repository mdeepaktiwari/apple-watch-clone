export const Image = ({ src, alt, additionalClass = "" }) => {
  return (
    <img
      width="500px"
      height="500px"
      src={src}
      className={`w-[52vh] ml-[calc(-26vh+156px)] max-w-[29rem] min-w-[18rem] ${additionalClass}`}
      alt={alt}
    />
  );
};