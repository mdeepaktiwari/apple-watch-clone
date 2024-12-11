import { useEffect, useRef, useState } from "react";
import { NextButton, PreviousButton } from "@/components/Button";
import { Band, Case, Size } from "@/components/Icon";
import { BANDS, CASES } from "@/constants";
import { Image } from "@/components/Image";
import { SIZE_42MM, SIZE_46MM, SIZE_MAPPING, SIZE_COST } from "@/constants";
import { NavBar } from "@/components/Navbar";
import { Landing } from "@/components/Landing";
import { motion, AnimatePresence } from "framer-motion";

const getCollectionType = (collections) => {
  const set = new Set();
  const collectionList = [];
  collections.forEach((item) => {
    if (!set.has(item.type)) {
      set.add(item.type);
      collectionList.push({
        name: item.type,
        pos: item.id,
      });
    }
  });
  return collectionList;
};

const bandList = getCollectionType(BANDS);
const caseList = getCollectionType(CASES);

export default function Home() {
  const slideCase = useRef(null);
  const slideBand = useRef(null);
  const slideSize = useRef(null);
  const [currentBand, setCurrentBand] = useState({});
  const [currentCase, setCurrentCase] = useState({});
  const [currentSelection, setCurrentSelection] = useState("start");
  const [currentSizeIndex, setCurrentSizeIndex] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [isTransitionActive, setIsTransitionActive] = useState(false);
  useEffect(() => {
    slideBandHandler(3);
    slideCaseHandler(0);
    slideSizeHandler(SIZE_46MM);
  }, []);

  const slideBandHandler = (bandPosition) => {
    if (bandPosition < 0 || bandPosition >= BANDS.length) return;
    let distance = -1 * bandPosition * 312;
    setCurrentBand(BANDS[bandPosition]);
    if (!slideBand?.current) return;
    slideBand.current.style.transform = `translateX(${distance}px)`;
  };

  const slideCaseHandler = (casePosition) => {
    if (casePosition < 0 || casePosition >= CASES.length) return;
    let distance = -1 * casePosition * 312;
    setCurrentCase(CASES[casePosition]);
    if (!slideCase?.current) return;
    slideCase.current.style.transform = `translateX(${distance}px)`;
  };

  const slideSizeHandler = (size) => {
    if (size < 0 || size > 2) return;
    let distance = -1 * size * 312;
    setCurrentSizeIndex(size);
    if (!slideSize?.current) return;
    slideSize.current.style.transform = `translateX(${distance}px)`;
  };

  const getUrlBasedOnSize = (item) => {
    return currentSizeIndex === SIZE_46MM ? item.url : item.url42;
  };

  return (
    <AnimatePresence>
      <div>
        <NavBar hasStarted={hasStarted} />
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
              transition={{ duration: 2 }}
            >
              <motion.div
                className="whitespace-nowrap pl-[calc(50vw-156px)] transition-all"
                animate={{ height: hasStarted ? "53vh" : "auto" }}
                initial={{ height: "auto" }}
                transition={{ duration: 2 }}
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
            </motion.div>
          )}
        </div>
        {currentSelection === "size" && (
          <div>
            <motion.div
              id="size-container"
              initial={{
                opacity: 0,
                display: "none",
              }}
              animate={{
                opacity: 1,
                display: "block",
              }}
              onAnimationStart={() => {
                slideSizeHandler(currentSizeIndex);
              }}
              exit={{ opacity: 0, display: "none" }}
              transition={{ duration: 2 }}
            >
              <div className="relative overflow-hidden">
                <div
                  ref={slideSize}
                  className="whitespace-nowrap pl-[calc(50vw-156px)] transition-all duration-500 ease-in-out h-[53vh]"
                >
                  <div className="inline-block">
                    <button
                      onClick={() => slideSizeHandler(0)}
                      className="bg-none border-0 block m-0 overflow-hidden p-0 relative text-center whitespace-normal w-[312px]"
                    >
                      <Image
                        src={currentBand.url42}
                        alt="Watch band image size 42"
                      />
                      <Image
                        src={currentCase.url42}
                        additionalClass="relative top-[-444px]"
                        alt="Watch case image size 42"
                      />
                    </button>
                  </div>

                  <div className="inline-block">
                    <button
                      onClick={() => slideSizeHandler(1)}
                      className="bg-none border-0 block m-0 overflow-hidden p-0 relative text-center whitespace-normal w-[312px]"
                    >
                      <Image
                        src={currentBand.url}
                        alt="Watch band image size 46"
                      />
                      <Image
                        src={currentCase.url}
                        additionalClass="relative top-[-444px]"
                        alt="Watch case image size 46"
                      />
                    </button>
                  </div>
                </div>

                <div>
                  {currentSizeIndex > 0 && (
                    <PreviousButton
                      handler={() => {
                        slideSizeHandler(currentSizeIndex - 1);
                      }}
                    />
                  )}

                  {currentSizeIndex < 1 && (
                    <NextButton
                      handler={() => {
                        slideSizeHandler(currentSizeIndex + 1);
                      }}
                    />
                  )}
                </div>

                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 transition-opacity duration-400 ease-out">
                  <img
                    width="500px"
                    height="500px"
                    src={
                      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXLX3ref_FV99_VW_34FR+watch-case-46-aluminum-rosegold-nc-s10_VW_34FR+watch-face-46-aluminum-rosegold-s10_VW_34FR?wid=1000&hei=1000&fmt=p-jpg&qlt=95&.v=UzE4U0gvUkVPVWdqOTMwV2xIOHRaMG5TeWJ6QW43NUFnQ2V4cmRFc1VnWWYyNHkrWFJNZ1BodmdwcWlUcmtNMkhaMkVQZTdleWFvVytrdnNBQmJzc2RGNnlaeXQ4NGFKQTAzc0NGeHR2aWJiLzMwazFsQmpWNUowMkIwc3EzL0xpSkl2OTJEMEdGMUpkR2p1bmRlWnpuUWsvSndwZkZQSHB4L3lvZ1B2V3ZCbWtNN0I0OEtHSU9TYzk0a1F1ZzFERlNXbWdiWWFMSHpqd3BBNUoxU1YzdG5TRTFsUDY4WC9xSGhtcnppYkpsMA"
                    }
                    className="w-[52vh] max-w-[29rem] min-w-[18rem] hidden"
                    alt={"Side view"}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {currentSelection === "band" && (
          <div>
            <motion.div
              id="band-container"
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
              onAnimationStart={() => {
                slideBandHandler(currentBand.id);
              }}
            >
              <div className="relative overflow-hidden">
                <div
                  ref={slideBand}
                  className="whitespace-nowrap pl-[calc(50vw-156px)] transition-all duration-500 ease-in-out"
                >
                  {BANDS.map((band) => (
                    <div key={band.id} className="inline-block">
                      <button
                        onClick={() => slideBandHandler(band.id)}
                        className="bg-none border-0 block m-0 overflow-hidden p-0 relative text-center whitespace-normal w-[312px]"
                      >
                        <Image src={getUrlBasedOnSize(band)} alt={band.name} />
                      </button>
                    </div>
                  ))}
                </div>
                <div>
                  {currentBand.id > 0 && (
                    <PreviousButton
                      handler={() => {
                        slideBandHandler(currentBand.id - 1);
                      }}
                    />
                  )}

                  {currentBand.id < BANDS.length - 1 && (
                    <NextButton
                      handler={() => {
                        slideBandHandler(currentBand.id + 1);
                      }}
                    />
                  )}
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 transition-opacity duration-400 ease-out">
                  <img
                    width="500px"
                    height="500px"
                    src={getUrlBasedOnSize(currentCase)}
                    className="w-[52vh] max-w-[29rem] min-w-[18rem]"
                    alt={"combined watch"}
                  />
                  <img
                    width="500px"
                    height="500px"
                    src={
                      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXLX3ref_FV99_VW_34FR+watch-case-46-aluminum-rosegold-nc-s10_VW_34FR+watch-face-46-aluminum-rosegold-s10_VW_34FR?wid=1000&hei=1000&fmt=p-jpg&qlt=95&.v=UzE4U0gvUkVPVWdqOTMwV2xIOHRaMG5TeWJ6QW43NUFnQ2V4cmRFc1VnWWYyNHkrWFJNZ1BodmdwcWlUcmtNMkhaMkVQZTdleWFvVytrdnNBQmJzc2RGNnlaeXQ4NGFKQTAzc0NGeHR2aWJiLzMwazFsQmpWNUowMkIwc3EzL0xpSkl2OTJEMEdGMUpkR2p1bmRlWnpuUWsvSndwZkZQSHB4L3lvZ1B2V3ZCbWtNN0I0OEtHSU9TYzk0a1F1ZzFERlNXbWdiWWFMSHpqd3BBNUoxU1YzdG5TRTFsUDY4WC9xSGhtcnppYkpsMA"
                    }
                    className="w-[52vh] max-w-[29rem] min-w-[18rem] hidden"
                    alt={"Side view"}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {currentSelection === "case" && (
          <div>
            <motion.div
              id="case-container"
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
              onAnimationStart={() => {
                slideCaseHandler(currentCase.id);
              }}
            >
              <div className="relative overflow-hidden">
                <div
                  ref={slideCase}
                  className="whitespace-nowrap pl-[calc(50vw-156px)] transition-all duration-500 ease-in-out"
                >
                  {CASES.map((itemCase) => (
                    <div key={itemCase.id} className="inline-block">
                      <button
                        onClick={() => slideCaseHandler(itemCase.id)}
                        className="bg-none border-0 block m-0 overflow-hidden p-0 relative text-center whitespace-normal w-[312px]"
                      >
                        <Image
                          src={getUrlBasedOnSize(itemCase)}
                          alt={itemCase.name}
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <div>
                  {currentCase.id > 0 && (
                    <PreviousButton
                      handler={() => {
                        slideCaseHandler(currentCase.id - 1);
                      }}
                    />
                  )}

                  {currentCase.id < CASES.length - 1 && (
                    <NextButton
                      handler={() => {
                        slideCaseHandler(currentCase.id + 1);
                      }}
                    />
                  )}
                </div>
                <div className="absolute top-0 z-[-1] left-1/2 transform -translate-x-1/2 transition-opacity duration-400 ease-out">
                  <img
                    width="500px"
                    height="500px"
                    src={getUrlBasedOnSize(currentBand)}
                    className="w-[52vh] max-w-[29rem] min-w-[18rem]"
                    alt={"combined watch"}
                  />
                  <img
                    width="500px"
                    height="500px"
                    src={
                      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXLX3ref_FV99_VW_34FR+watch-case-46-aluminum-rosegold-nc-s10_VW_34FR+watch-face-46-aluminum-rosegold-s10_VW_34FR?wid=1000&hei=1000&fmt=p-jpg&qlt=95&.v=UzE4U0gvUkVPVWdqOTMwV2xIOHRaMG5TeWJ6QW43NUFnQ2V4cmRFc1VnWWYyNHkrWFJNZ1BodmdwcWlUcmtNMkhaMkVQZTdleWFvVytrdnNBQmJzc2RGNnlaeXQ4NGFKQTAzc0NGeHR2aWJiLzMwazFsQmpWNUowMkIwc3EzL0xpSkl2OTJEMEdGMUpkR2p1bmRlWnpuUWsvSndwZkZQSHB4L3lvZ1B2V3ZCbWtNN0I0OEtHSU9TYzk0a1F1ZzFERlNXbWdiWWFMSHpqd3BBNUoxU1YzdG5TRTFsUDY4WC9xSGhtcnppYkpsMA"
                    }
                    className="w-[52vh] max-w-[29rem] min-w-[18rem] hidden"
                    alt={"Side view"}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {hasStarted && (
          <motion.div
            key="startedContent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 2.3 }}
          >
            <div className="mb-16 mt-8">
              <div className="text-[14px] text-[#6e6e73] text-center mt-2">
                APPLE WATCH SERIES 10
              </div>
              <div className="text-[14px] font-semibold text-center mt-2">
                {`${
                  currentSizeIndex === SIZE_46MM
                    ? SIZE_MAPPING[SIZE_46MM]
                    : SIZE_MAPPING[SIZE_42MM]
                } ${currentCase.name} with ${currentBand.name}`}
              </div>
              <div className="text-[14px] text-[#6e6e73] text-center mt-2">
                From $
                {currentSizeIndex === SIZE_46MM
                  ? currentBand.cost + currentCase.cost + SIZE_COST[SIZE_46MM]
                  : currentBand.cost + currentCase.cost + SIZE_COST[SIZE_42MM]}
              </div>
            </div>
            <div className="flex justify-center gap-4 items-center">
              <div
                className="bg-[#e8e8ed] cursor-pointer flex px-[16px] rounded-[20px] text-[18px] h-[41px] items-center overflow-hidden"
                onClick={() => {
                  setCurrentSelection("size");
                }}
              >
                <div className="flex items-center gap-2 pr-1">
                  <Size /> {currentSelection === "size" ? "" : "Size"}{" "}
                </div>
                {currentSelection === "size" && (
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
                    <div
                      className={`px-2 py-[5px] transition-all duration-800 ease-in-out ${
                        currentSizeIndex === SIZE_42MM
                          ? `font-semibold outline outline-2 outline-[#0077ed]`
                          : ""
                      }`}
                      onClick={() => {
                        slideSizeHandler(SIZE_42MM);
                      }}
                    >
                      {SIZE_MAPPING[SIZE_42MM]}
                    </div>
                    <div
                      className={`px-2 py-[5px] cursor-pointer transition-all duration-800 ease-in-out ${
                        currentSizeIndex === 1
                          ? `font-semibold outline outline-2 outline-[#0077ed]`
                          : ""
                      }`}
                      onClick={() => {
                        slideSizeHandler(SIZE_46MM);
                      }}
                    >
                      {SIZE_MAPPING[SIZE_46MM]}
                    </div>
                  </motion.div>
                )}
              </div>
              <div
                className="bg-[#e8e8ed] cursor-pointer flex px-[16px] py-[2px] rounded-[20px] text-[18px] h-[41px] items-center overflow-hidden"
                onClick={() => {
                  setCurrentSelection("case");
                }}
              >
                <div className="flex items-center gap-2 pr-1">
                  <Case /> {currentSelection === "case" ? "" : "Case"}{" "}
                </div>
                {currentSelection === "case" ? (
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
                    {caseList?.map((itemCase) => (
                      <div
                        className={`px-2 py-[5px] transition-all duration-800 ease-in-out ${
                          currentCase.type === itemCase.name
                            ? `font-semibold outline outline-2 outline-[#0077ed]`
                            : ""
                        }`}
                        onClick={() => {
                          slideCaseHandler(itemCase.pos);
                        }}
                      >
                        {itemCase.name}
                      </div>
                    ))}
                  </motion.div>
                ) : null}
              </div>
              <div
                className="bg-[#e8e8ed] flex px-[16px] cursor-pointer py-[2px] rounded-[20px] text-[18px] h-[41px] items-center overflow-hidden"
                onClick={() => {
                  setCurrentSelection("band");
                }}
              >
                <div className="px-2 cursor-pointer">
                  <div className="flex items-center gap-2 pr-1">
                    <Band /> {currentSelection === "band" ? "" : "Band"}{" "}
                  </div>
                </div>
                {currentSelection === "band" ? (
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
                    {bandList?.map((band) => (
                      <div
                        className={`px-2 py-[5px] transition-all duration-800 ease-in-out text-nowrap overflow-hidden ${
                          currentBand.type === band.name
                            ? `font-semibold outline outline-2 outline-[#0077ed]`
                            : ""
                        }`}
                        onClick={() => {
                          slideBandHandler(band.pos);
                        }}
                      >
                        {band.name}
                      </div>
                    ))}
                  </motion.div>
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
