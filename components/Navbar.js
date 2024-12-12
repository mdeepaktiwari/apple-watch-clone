import Link from "next/link";
import { useState } from "react";
import { Dropdown } from "./Icon";
import { DROPDOWN_OPTIONS, COMPANY_URL } from "@/constants";
import { motion } from "framer-motion";

export const NavBar = ({
  hasStarted,
  selectedOption,
  setSelectedOption,
  handleConfigSave,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between py-6 px-8">
      <Link href="/">
        <img src={COMPANY_URL} alt="Apple Watch" width="88" height="22" />
      </Link>
      {hasStarted && (
        <>
          <div className="relative">
            <button
              aria-expanded={isOpen}
              aria-controls="dropdown-menu"
              onClick={toggleDropdown}
              className="px-4 py-1 text-[#1d1d1f] text-[17px] flex items-center justify-center gap-1"
            >
              Collections <Dropdown />
            </button>

            {/* Dropdown Options */}
            {isOpen && (
              <>
                <div
                  className="fixed inset-0 bg-[#32323270] bg-opacity-50 z-[2]"
                  onClick={closeDropdown}
                  aria-hidden={!isOpen}
                ></div>
                <div className="absolute font-light mt-2 w-48 text-center bg-white rounded-[20px] transition-all duration-400 shadow-lg z-10 min-w-[300px] left-1/2 transform -translate-x-1/2 px-8 py-2">
                  <ul>
                    {DROPDOWN_OPTIONS.map((option) => (
                      <li
                        role="menuitem"
                        onClick={() => {
                          setSelectedOption(option);
                          closeDropdown();
                        }}
                        key={option.id}
                        className={`py-5 border-b border-gray-300 transition-all duration-400 cursor-pointer text-[#1d1d1f] last:border-b-0 ${
                          selectedOption.id === option.id
                            ? "text-[#86868b]"
                            : "hover:text-[#06c]"
                        }`}
                      >
                        {option.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            onClick={handleConfigSave}
            className="bg-[#0071e3] font-light text-white rounded-[30px] px-4 text-[14px] py-2 mr-[-5px]"
          >
            Save
          </motion.button>
        </>
      )}
    </div>
  );
};
