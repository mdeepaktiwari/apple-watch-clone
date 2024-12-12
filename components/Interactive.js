import { motion } from "framer-motion";

export const ResponsiveMotionConfigButton = ({ children }) => {
  return (
    <motion.div
      className="flex"
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "auto", opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{
        width: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.3, ease: "easeInOut" },
      }}
    >
      {children}
    </motion.div>
  );
};

export const MotionButton = ({ children, handler }) => {
  return (
    <motion.button
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onClick={handler}
      className="bg-none border-0 block m-0 overflow-hidden p-0 relative text-center whitespace-normal w-[312px]"
    >
      {children}
    </motion.button>
  );
};

export const CurrentSelectionMotionDiv = ({ children, ...props }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        display: "none",
      }}
      animate={{
        opacity: 1,
        display: "block",
      }}
      exit={{ opacity: 0, display: "none" }}
      transition={{ duration: 2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MotionImage = ({ ...props }) => {
  return (
    <motion.img
      animate={{ opacity: 1 }}
      initial={{ opacity: 0.3 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      width="500px"
      height="500px"
      className="w-[52vh] max-w-[29rem] min-w-[18rem]"
      {...props}
    />
  );
};
