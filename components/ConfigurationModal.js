import { useState } from "react";

export const ConfigurationModal = ({
  isOpen,
  close,
  caseImage,
  bandImage,
  shareableURL,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 h-full px-2 z-[2] transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={close}
    >
      <div
        className={`absolute top-1/2 left-1/2 transform transition-transform duration-300 ${
          isOpen ? "-translate-x-1/2 -translate-y-1/2 scale-100" : "scale-95"
        } bg-white p-8 rounded-[20px] lg:w-1/2 md:w-3/4 sm:w-full w-full shadow-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 text-[20px] right-4 text-gray-400 hover:text-gray-600"
          onClick={close}
        >
          ✖
        </button>

        <h2 className="text-[#1d1d1f] text-[24px] font-bold pb-4 text-center">
          Configuration Saved
        </h2>

        <div className="flex justify-center items-center pb-8 gap-4 mt-8">
          <img
            src={caseImage}
            alt="Case"
            className="rounded-[20px] shadow-md"
            height={250}
            width={250}
          />
          <span className="text-[28px] font-bold text-gray-600">+</span>
          <img
            src={bandImage}
            alt="Band"
            className="rounded-[20px] shadow-md"
            height={250}
            width={250}
          />
        </div>

        <p className="text-[#1d1d1f] text-[16px] leading-6 text-center mb-6 font-medium">
          Your configuration has been saved to the clipboard. Share it with your
          friends and family.
        </p>

        <div className="border rounded-lg p-4 my-4 text-[#6e6e73] text-[14px]">
          If the configuration was not successfully copied to the clipboard, you
          can access it using the link provided below:
          <a
            href={shareableURL}
            className="mt-1 text-blue-600 text-[14px] underline break-all block"
            target="_blank"
          >
            {shareableURL}
          </a>
        </div>

        <div className="flex items-center justify-center mt-4">
          <button
            disabled={isCopied}
            className="px-4 py-2 bg-blue-600 text-white rounded-[30px] shadow hover:bg-blue-500 transition duration-200"
            onClick={() =>
              navigator.clipboard.writeText(shareableURL).then(() => {
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 2000);
              })
            }
          >
            {isCopied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </div>
    </div>
  );
};
