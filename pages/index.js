import { useEffect, useRef, useState } from "react";
import { NextButton, PreviousButton } from "@/components/Button";
import { Band, Case, Size } from "@/components/Icon";
import { COLLECTION, SIDE_VIEW_MAPPING } from "@/constants";
import { Image } from "@/components/Image";
import { ConfigurationModal } from "@/components/ConfigurationModal";
import {
  SIZE_42MM,
  SIZE_46MM,
  SIZE_MAPPING,
  SIZE_COST,
  DROPDOWN_OPTIONS,
} from "@/constants";
import { NavBar } from "@/components/Navbar";
import { Landing } from "@/components/Landing";
import { motion, AnimatePresence } from "framer-motion";
import { getShareableUrl, getConfiguration, getCollectionType } from "@/utils";
import {
  MotionButton,
  ResponsiveMotionConfigButton,
  CurrentSelectionMotionDiv,
  MotionImage,
} from "@/components/Interactive";

export default function Home() {
  const slideCase = useRef(null);
  const slideBand = useRef(null);
  const slideSize = useRef(null);
  const [currentBand, setCurrentBand] = useState({});
  const [currentCase, setCurrentCase] = useState({});
  const [currentSelection, setCurrentSelection] = useState("start");
  const [currentSizeIndex, setCurrentSizeIndex] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollectionOption, setSelectedCollectionOption] = useState(
    DROPDOWN_OPTIONS[0]
  );
  const [sideViewActive, setSideViewActive] = useState(false);
  const [BANDS, setBANDS] = useState(
    COLLECTION[selectedCollectionOption.id].bandList
  );
  const [CASES, setCASES] = useState(
    COLLECTION[selectedCollectionOption.id].caseList
  );
  const [shareableURL, setShareableURL] = useState("");
  useEffect(() => {
    setBANDS(COLLECTION[selectedCollectionOption.id].bandList);
    setCASES(COLLECTION[selectedCollectionOption.id].caseList);
    slideBandHandler(3);
    slideCaseHandler(0);
    slideSizeHandler(SIZE_46MM);
    setCurrentSelection("start");
  }, [selectedCollectionOption]);

  useEffect(() => {
    handleActiveViewStyle();
  }, [sideViewActive]);

  useEffect(() => {
    const data = getConfiguration();
    if (!data) return;
    setSelectedCollectionOption(DROPDOWN_OPTIONS[data.collection]);
    setCurrentBand(() => BANDS[data.bandId]);
    setCurrentCase(() => CASES[data.caseId]);
    setCurrentSizeIndex(() => data.size);
  }, []);

  const slideHandler = (position, items, setCurrentItem, ref) => {
    if (position < 0 || position >= items.length) return;
    const ImageOptionSize = 312;
    let distance = -1 * position * ImageOptionSize;
    setSideViewActive(false);
    setCurrentItem(items[position]);
    if (!ref?.current) return;
    ref.current.style.transform = `translateX(${distance}px)`;
  };

  const slideBandHandler = (bandPosition) => {
    slideHandler(bandPosition, BANDS, setCurrentBand, slideBand);
  };

  const slideCaseHandler = (casePosition) => {
    slideHandler(casePosition, CASES, setCurrentCase, slideCase);
  };

  const slideSizeHandler = (size) => {
    if (size < 0 || size > 2) return;
    let distance = -1 * size * 312;
    setCurrentSizeIndex(size);
    setSideViewActive(false);
    if (!slideSize?.current) return;
    slideSize.current.style.transform = `translateX(${distance}px)`;
  };

  const getUrlBasedOnSize = (item) => {
    return currentSizeIndex === SIZE_46MM ? item.url : item.url42;
  };
  const sideViewImage = (verticalSlidingRequired = true) => (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      key="app-side-view"
    >
      <div className="inline-block transition-all duration-[2s] ease-in-out">
        <Image
          additionalClass={
            verticalSlidingRequired ? "relative top-[-444px]" : ""
          }
          src={getUrlBasedOnSize(
            SIDE_VIEW_MAPPING[`${currentCase.id}${currentBand.id}`]
          )}
          alt="Side view of initial watch band image"
        />
      </div>
    </motion.div>
  );

  const bandList = getCollectionType(BANDS);
  const caseList = getCollectionType(CASES);

  const handleActiveViewStyle = () => {
    const option = currentSelection;
    const optionToRef = {
      size: slideSize,
      band: slideBand,
      case: slideCase,
    };
    const selectedOptionToCurrentSelection = {
      size: currentSizeIndex,
      band: currentBand.id,
      case: currentCase.id,
    };
    if (!optionToRef[option]) return;
    const currentSelectedOptionContainer = optionToRef[option].current;
    const currentOption = selectedOptionToCurrentSelection[option];
    const allOptions =
      currentSelectedOptionContainer.querySelectorAll("[data-option]");
    allOptions.forEach((option, index) => {
      if (sideViewActive) {
        if (index < currentOption) {
          option.classList.add("translate-x-[-160px]");
          option.classList.remove("translate-x-[160px]");
        } else if (index > currentOption) {
          option.classList.add("translate-x-[160px]");
          option.classList.remove("translate-x-[-160px]");
        }
      } else {
        option.classList.remove("translate-x-[-160px]", "translate-x-[160px]");
      }
    });
  };

  const configurationString = `${
    currentSizeIndex === SIZE_46MM
      ? SIZE_MAPPING[SIZE_46MM]
      : SIZE_MAPPING[SIZE_42MM]
  } ${currentCase.name} with ${currentBand.name}`;

  const handleConfigSave = async () => {
    try {
      const shareableURL = getShareableUrl(
        currentBand.id,
        currentCase.id,
        currentSizeIndex,
        selectedCollectionOption.id
      );
      await navigator.clipboard.writeText(shareableURL);
      setShareableURL(shareableURL);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error saving configuration", error);
    }
  };

  return (
    <AnimatePresence>
      <div>
        <NavBar
          hasStarted={hasStarted}
          selectedOption={selectedCollectionOption}
          setSelectedOption={setSelectedCollectionOption}
          handleConfigSave={handleConfigSave}
        />
        <Landing setHasStarted={setHasStarted} hasStarted={hasStarted} />
        <div>
          {currentSelection === "start" && (
            <motion.div
              id="initial-container"
              className="relative overflow-hidden"
              initial={{
                opacity: 0,
                display: "none",
              }}
              animate={{
                opacity: 1,
                display: "block",
              }}
              exit={{ opacity: 0, display: "none" }}
              transition={{ duration: 1.5 }}
              aria-hidden={!hasStarted}
            >
              {!sideViewActive && (
                <motion.div
                  animate={() => {
                    const transitionObj = {
                      opacity: 1,
                    };
                    if (hasStarted) {
                      transitionObj.height = "52vh";
                    }
                    return transitionObj;
                  }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                  className="whitespace-nowrap pl-[calc(50vw-156px)] transition-all"
                >
                  <div
                    className={`inline-block transition-all duration-[2s] ease-in-out ${
                      !hasStarted ? "scale-[2] translate-y-[28rem]" : ""
                    }`}
                  >
                    <button className="bg-none border-0 block m-0 overflow-hidden p-0 relative text-center whitespace-normal w-[312px]">
                      <Image
                        src={getUrlBasedOnSize(currentBand)}
                        alt="Initial watch band image"
                      />
                      <Image
                        src={getUrlBasedOnSize(currentCase)}
                        additionalClass="relative top-[-444px]"
                        alt="Initial watch case image"
                      />
                    </button>
                  </div>
                </motion.div>
              )}
              {sideViewActive && (
                <motion.div
                  className="whitespace-nowrap pl-[calc(50vw-156px)] transition-all"
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                >
                  <div className="inline-block transition-all duration-[2s] ease-in-out">
                    <Image
                      src={getUrlBasedOnSize(
                        SIDE_VIEW_MAPPING[`${currentCase.id}${currentBand.id}`]
                      )}
                      alt="Side view of initial watch band image"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
        {currentSelection === "size" && (
          <div>
            <CurrentSelectionMotionDiv
              onAnimationStart={() => {
                slideSizeHandler(currentSizeIndex);
              }}
              aria-hidden={currentSelection !== "size"}
            >
              <div className="relative overflow-hidden">
                <div
                  ref={slideSize}
                  className="whitespace-nowrap pl-[calc(50vw-156px)] transition-all duration-500 ease-in-out h-[53vh]"
                >
                  <div
                    data-option
                    className="inline-block transition-all duration-800"
                  >
                    {(!sideViewActive || currentSizeIndex === SIZE_46MM) && (
                      <MotionButton handler={() => slideSizeHandler(0)}>
                        <Image
                          src={currentBand.url42}
                          alt="Watch band image size 42"
                        />
                        <Image
                          src={currentCase.url42}
                          additionalClass="relative top-[-444px]"
                          alt="Watch case image size 42"
                        />
                      </MotionButton>
                    )}
                    {sideViewActive && currentSizeIndex === SIZE_42MM && (
                      <div className="inline-block">{sideViewImage()}</div>
                    )}
                  </div>

                  <div
                    data-option
                    className="inline-block transition-all duration-800"
                  >
                    {(!sideViewActive || currentSizeIndex === SIZE_42MM) && (
                      <MotionButton handler={() => slideSizeHandler(1)}>
                        <Image
                          src={currentBand.url}
                          alt="Watch band image size 46"
                        />
                        <Image
                          src={currentCase.url}
                          additionalClass="relative top-[-444px]"
                          alt="Watch case image size 46"
                        />
                      </MotionButton>
                    )}
                    {sideViewActive &&
                      currentSizeIndex === SIZE_46MM &&
                      sideViewImage()}
                  </div>
                </div>

                <div>
                  {currentSizeIndex > 0 && (
                    <PreviousButton
                      aria-label="Previous size"
                      handler={() => {
                        slideSizeHandler(currentSizeIndex - 1);
                      }}
                    />
                  )}

                  {currentSizeIndex < 1 && (
                    <NextButton
                      aria-label="Next size"
                      handler={() => {
                        slideSizeHandler(currentSizeIndex + 1);
                      }}
                    />
                  )}
                </div>
              </div>
            </CurrentSelectionMotionDiv>
          </div>
        )}
        {currentSelection === "band" && (
          <div>
            <CurrentSelectionMotionDiv
              onAnimationStart={() => {
                slideBandHandler(currentBand.id);
              }}
              aria-hidden={currentSelection === "band"}
            >
              <div className="relative overflow-hidden">
                <div
                  ref={slideBand}
                  className="whitespace-nowrap pl-[calc(50vw-156px)] transition-all duration-500 ease-in-out"
                >
                  {BANDS.map((band) => (
                    <div
                      data-option
                      key={band.id}
                      className="inline-block transition-all duration-800"
                    >
                      {(!sideViewActive || currentBand.id !== band.id) && (
                        <motion.button
                          animate={{ opacity: 1 }}
                          initial={{ opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8 }}
                          onClick={() => slideBandHandler(band.id)}
                          className="bg-none border-0 block m-0 overflow-hidden p-0 relative text-center whitespace-normal w-[312px]"
                        >
                          <Image
                            src={getUrlBasedOnSize(band)}
                            alt={band.name}
                          />
                        </motion.button>
                      )}
                      {sideViewActive &&
                        band.id === currentBand.id &&
                        sideViewImage(false)}
                    </div>
                  ))}
                </div>
                <div>
                  {currentBand.id > 0 && (
                    <PreviousButton
                      aria-label="Previous size"
                      handler={() => {
                        slideBandHandler(currentBand.id - 1);
                      }}
                    />
                  )}

                  {currentBand.id < BANDS.length - 1 && (
                    <NextButton
                      aria-label="Next size"
                      handler={() => {
                        slideBandHandler(currentBand.id + 1);
                      }}
                    />
                  )}
                </div>
                {!sideViewActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 transition-opacity duration-400 ease-out">
                    <MotionImage
                      src={getUrlBasedOnSize(currentCase)}
                      alt="Current case"
                    />
                  </div>
                )}
              </div>
            </CurrentSelectionMotionDiv>
          </div>
        )}
        {currentSelection === "case" && (
          <div>
            <CurrentSelectionMotionDiv
              onAnimationStart={() => {
                slideCaseHandler(currentCase.id);
              }}
              aria-hidden={currentSelection !== "case"}
            >
              <div className="relative overflow-hidden">
                <div
                  ref={slideCase}
                  className="whitespace-nowrap pl-[calc(50vw-156px)] transition-all duration-500 ease-in-out"
                >
                  {CASES.map((itemCase) => (
                    <div
                      data-option
                      key={itemCase.id}
                      className="inline-block duration-800 transition-all"
                    >
                      {(!sideViewActive || currentCase.id !== itemCase.id) && (
                        <motion.button
                          animate={{ opacity: 1 }}
                          initial={{ opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8 }}
                          onClick={() => slideCaseHandler(itemCase.id)}
                          className="bg-none border-0 block m-0 overflow-hidden p-0 relative text-center whitespace-normal w-[312px]"
                        >
                          <Image
                            src={getUrlBasedOnSize(itemCase)}
                            alt={itemCase.name}
                          />
                        </motion.button>
                      )}
                      {sideViewActive &&
                        currentCase.id === itemCase.id &&
                        sideViewImage(false)}
                    </div>
                  ))}
                </div>
                <div>
                  {currentCase.id > 0 && (
                    <PreviousButton
                      aria-label="Previous size"
                      handler={() => {
                        slideCaseHandler(currentCase.id - 1);
                      }}
                    />
                  )}

                  {currentCase.id < CASES.length - 1 && (
                    <NextButton
                      aria-label="Next size"
                      handler={() => {
                        slideCaseHandler(currentCase.id + 1);
                      }}
                    />
                  )}
                </div>
                {!sideViewActive && (
                  <div className="absolute top-0 z-[-1] left-1/2 transform -translate-x-1/2 transition-opacity duration-400 ease-out">
                    <MotionImage
                      src={getUrlBasedOnSize(currentBand)}
                      alt="Current band"
                    />
                  </div>
                )}
              </div>
            </CurrentSelectionMotionDiv>
          </div>
        )}
        {hasStarted && (
          <motion.div
            className="absolute bottom-[60px] w-full"
            key="startedContent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 2.3 }}
          >
            <div className="mb-16 mt-8">
              <div className="flex justify-center">
                <div
                  role="button"
                  tabIndex="0"
                  className="text-[12px] text-[#06c] underline text-center mt-2 cursor-pointer"
                  onClick={() => {
                    setSideViewActive(!sideViewActive);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSideViewActive(!sideViewActive);
                    }
                  }}
                >
                  {sideViewActive ? "Front View" : "Side View"}
                </div>
              </div>
              <div className="text-[14px] text-[#6e6e73] text-center mt-2">
                {selectedCollectionOption.name}
              </div>
              <div className="text-[14px] text-center mt-1">
                {`${configurationString}`}
              </div>
              <div className="text-[14px] text-[#6e6e73] text-center mt-1">
                From $
                {currentSizeIndex === SIZE_46MM
                  ? currentBand.cost + currentCase.cost + SIZE_COST[SIZE_46MM]
                  : currentBand.cost + currentCase.cost + SIZE_COST[SIZE_42MM]}
              </div>
            </div>
            <div className="flex justify-center gap-4 flex-wrap items-center">
              <div
                role="button"
                tabIndex="0"
                className="bg-[#e8e8ed] cursor-pointer flex px-[16px] rounded-[20px] text-[18px] h-[41px] items-center overflow-hidden"
                onClick={() => {
                  setCurrentSelection("size");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setCurrentSelection("size");
                  }
                }}
              >
                <div className="flex font-light items-center gap-2 pr-1">
                  <Size /> {currentSelection === "size" ? "" : "Size"}{" "}
                </div>
                {currentSelection === "size" && (
                  <ResponsiveMotionConfigButton>
                    <div
                      role="button"
                      tabIndex="0"
                      className={`px-2 py-[5px] transition-all duration-800 ease-in-out ${
                        currentSizeIndex === SIZE_42MM
                          ? `font-medium outline outline-2 outline-[#0077ed]`
                          : ""
                      }`}
                      onClick={() => {
                        slideSizeHandler(SIZE_42MM);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          slideSizeHandler(SIZE_42MM);
                        }
                      }}
                    >
                      {SIZE_MAPPING[SIZE_42MM]}
                    </div>
                    <div
                      role="button"
                      tabIndex="0"
                      className={`px-2 py-[5px] cursor-pointer transition-all duration-800 ease-in-out ${
                        currentSizeIndex === 1
                          ? `font-medium outline outline-2 outline-[#0077ed]`
                          : ""
                      }`}
                      onClick={() => {
                        slideSizeHandler(SIZE_46MM);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          slideSizeHandler(SIZE_46MM);
                        }
                      }}
                    >
                      {SIZE_MAPPING[SIZE_46MM]}
                    </div>
                  </ResponsiveMotionConfigButton>
                )}
              </div>
              <div
                role="button"
                tabIndex="0"
                className="bg-[#e8e8ed] cursor-pointer flex px-[16px] py-[2px] rounded-[20px] text-[18px] h-[41px] items-center overflow-hidden"
                onClick={() => {
                  setCurrentSelection("case");
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setCurrentSelection("case");
                }}
              >
                <div className="flex font-light items-center gap-2 pr-1">
                  <Case /> {currentSelection === "case" ? "" : "Case"}{" "}
                </div>
                {currentSelection === "case" ? (
                  <ResponsiveMotionConfigButton>
                    {caseList?.map((itemCase, index) => (
                      <div
                        role="button"
                        tabIndex="0"
                        key={`case-${index}`}
                        className={`px-2 py-[5px] transition-all duration-800 ease-in-out ${
                          currentCase.type === itemCase.name
                            ? `font-medium outline outline-2 outline-[#0077ed]`
                            : ""
                        }`}
                        onClick={() => {
                          slideCaseHandler(itemCase.pos);
                        }}
                        onKeyDown={(e) => {
                          if (e.key !== "Enter") return;
                          slideCaseHandler(itemCase.pos);
                        }}
                      >
                        {itemCase.name}
                      </div>
                    ))}
                  </ResponsiveMotionConfigButton>
                ) : null}
              </div>
              <div
                role="button"
                tabIndex="0"
                className="bg-[#e8e8ed] flex px-[16px] cursor-pointer py-[2px] rounded-[20px] text-[18px] h-[41px] items-center overflow-hidden"
                onClick={() => {
                  setCurrentSelection("band");
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setCurrentSelection("band");
                }}
              >
                <div className="px-2 cursor-pointer">
                  <div className="flex font-light items-center gap-2 pr-1">
                    <Band /> {currentSelection === "band" ? "" : "Band"}{" "}
                  </div>
                </div>
                {currentSelection === "band" ? (
                  <ResponsiveMotionConfigButton>
                    {bandList?.map((band, index) => (
                      <div
                        role="button"
                        tabIndex="0"
                        key={`band-${index}`}
                        className={`px-2 py-[5px] transition-all duration-800 ease-in-out text-nowrap overflow-hidden ${
                          currentBand.type === band.name
                            ? `font-medium outline outline-2 outline-[#0077ed]`
                            : ""
                        }`}
                        onClick={() => {
                          slideBandHandler(band.pos);
                        }}
                        onKeyDown={(e) => {
                          if (e.key !== "Enter") return;
                          slideBandHandler(band.pos);
                        }}
                      >
                        {band.name}
                      </div>
                    ))}
                  </ResponsiveMotionConfigButton>
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <ConfigurationModal
        isOpen={isModalOpen}
        caseImage={getUrlBasedOnSize(currentCase)}
        bandImage={getUrlBasedOnSize(currentBand)}
        shareableURL={shareableURL}
        close={() => {
          setIsModalOpen(false);
        }}
      />
    </AnimatePresence>
  );
}
