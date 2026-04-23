import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../strore";
import { CustomButton } from "../components";

const ImageName = [
  {
    imgname: "/pencil (2).png",
    text: "Craft Your Masterpiece",
  },
  {
    imgname: "/perfume.png",
    text: "Customize Every Detail",
  },
  {
    imgname: "/creative.png",
    text: "Unlock Unique Styles With AI",
  },
];

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <div>
      <AnimatePresence>
        {snap.intro && (
          <motion.section className="home" {...slideAnimation("left")}>
            <motion.header {...slideAnimation("down")}>
              <img
                src="./logo.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
            </motion.header>

            <motion.div {...headContentAnimation} className="home-content">
              <motion.div
                {...headTextAnimation}
                className="flex gap-1 "
              >
                <img
                  src="/lightning.png"
                  alt="Lighting Img"
                  // className="w-20 h-20 md:w-16 md:h-16 xl:w-40 xl:h-40 object-contain"
                  className="w-27 h-35 md:w-16 md:h-16 xl:w-34 xl:h-40 object-contain"

                />
                <h1 className="head-text">
                  LET'S <br className="xl:block hidden" /> DESIGN.
                </h1>
              </motion.div>

              <motion.div
                {...headContainerAnimation}
                className="hidden xl:block"
              >
                <div className="flex gap-5 max-w-screen justify-start items-center mb-2">
                  {ImageName.map((item, index) => (
                    <div key={index} className="flex items-center gap-5">
                      <div className="flex flex-col items-center gap-1.5 px-1">
                        <img
                          src={item.imgname}
                          alt={item.text}
                          className="w-13 h-15 object-contain"
                        />
                        <p className="text-gray-600 text-sm flex justify-center text-center max-w-27 font-bold ">
                          {item.text}
                        </p>
                      </div>
                      {index < ImageName.length - 1 && (
                        <div className="w-1 h-18 bg-gray-600 opacity-25 rounded-2xl"></div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                {...headContentAnimation}
                className="flex flex-col gap-5  xl:pl-4"
              >
                <p className="max-w-md font-normal text-gray-600 text-base">
                  Design a shirt that’s truly yours with our all-new advanced <strong> 3D customization tool.</strong>{" "}
                  Bring your ideas to life and express your personal style like never before.
                </p>

                <CustomButton
                  type="filled"
                  title="Customize It"
                  handleClick={() => (state.intro = false)}
                  customStyles="w-fit px-4 py-2.5 font-bold text-sm cursor-pointer"
                />
              </motion.div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
