export const Image = ({ src, alt, additionalClass = "" }) => {
  if (!src) return null;
  return (
    <img
      width="500px"
      height="500px"
      src={src}
      loading="lazy"
      className={`w-[52vh] ml-[calc(-26vh+156px)] max-w-[29rem] min-w-[18rem] ${additionalClass}`}
      alt={alt}
    />
  );
};
