import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../../strore";
import config from "../config/config";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";

const Customizer = () => {
  const snap = useSnapshot(state);

  return (
    <div>
      <h1>Customizer</h1>
    </div>
  );
};

export default Customizer;
