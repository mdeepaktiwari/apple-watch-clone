import Link from "next/link";
import { useState } from "react";
import { Dropdown } from "./Icon";
const DROPDOWN_OPTIONS = [
  {
    id: 0,
    name: "Apple Watch Series 10",
  },
  {
    id: 1,
    name: "Apple Watch Hermès Series 10",
  },
];

const COMPANY_URL =
  "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-watch-design-studio-logo?wid=236&hei=52&fmt=jpeg&qlt=90&.v=1566849941844";

export const NavBar = ({ hasStarted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(DROPDOWN_OPTIONS[0]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between p-8">
      <Link href="/">
        <img src={COMPANY_URL} alt="Apple Watch" width="85" height="20" />
      </Link>
      {hasStarted && (
        <>
          {" "}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="px-4 py-2 text-[#1d1d1f] text-[18px] flex items-center justify-center gap-2"
            >
              Collection <Dropdown />
            </button>

            {/* Dropdown Options */}
            {isOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-[2]"
                  onClick={closeDropdown}
                ></div>
                <div className="absolute mt-2 w-48 bg-white rounded-[20px] transition-all duration-400 shadow-lg z-10 min-w-[300px] left-1/2 transform -translate-x-1/2 px-8 py-2">
                  <ul>
                    {DROPDOWN_OPTIONS.map((option) => (
                      <li
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
          <button className="bg-[#0071e3] text-white rounded-[30px] px-4 text-[14px] py-2">
            Save
          </button>
        </>
      )}
    </div>
  );
};
