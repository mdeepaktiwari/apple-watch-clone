import { motion } from "framer-motion";

export const Landing = ({ setHasStarted, hasStarted }) => {
  return (
    <motion.div
      className={`m-auto max-w-[42rem] overflow-hidden ${
        hasStarted ? "opacity-0" : "opacity-100"
      }`}
      animate={{
        height: hasStarted ? "0" : "auto",
        display: hasStarted ? "none" : "block",
        marginTop: hasStarted ? "0" : "56px",
      }}
      initial={{
        height: "auto",
        display: "block",
        marginTop: "56px",
      }}
      transition={{ duration: 2 }}
      role="main"
    >
      <h1 className="pb-1">
        <div className="pb-2 text-[20px] text-[#1d1d1f]">
          Apple Watch Studio
        </div>
        <div>
          <span className="block text-[62px] font-medium leading-[4.5rem]">
            Choose a case.
          </span>
          <span className="block text-[62px] font-medium leading-[4.5rem]">
            Pick a band.
          </span>
          <span className="block text-[62px] font-medium leading-[4.5rem]">
            Create your own style.
          </span>
        </div>
      </h1>
      <div className="mt-8">
        <button
          onClick={() => {
            setHasStarted(true);
          }}
          aria-label="Start customization"
          className="bg-[#0071e3] font-light text-white rounded-[35px] px-[20px] text-[18px] py-[8px]"
        >
          Get started
        </button>
      </div>
    </motion.div>
  );
};
