import { motion } from "framer-motion";

export const Image = ({ src, alt, additionalClass = "" }) => {
  return (
    <>
      {src && (
        <motion.img
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          width="500px"
          height="500px"
          src={src}
          loading="lazy"
          className={`w-[52vh] ml-[calc(-26vh+156px)] max-w-[29rem] min-w-[18rem] ${additionalClass}`}
          alt={alt}
        />
      )}
    </>
  );
};
