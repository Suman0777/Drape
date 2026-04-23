import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import axios from "axios";

import state from "../strore";
import config from "../config/config";
import { download, logoShirt, stylishShirt } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AiPicker,
  ColourPicker,
  FilePicker,
  CustomButton,
  Tab,
} from "../components";

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('')
  const [generatingImage, setGeneratingImage] = useState(false)
 
  const [activeEditorTab , setactiveEditorTab] = useState("");
  const [activefilterTab, setactivefilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  const generateTabContent = () =>{
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColourPicker/>
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
        return <AiPicker 
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImage={generatingImage}
          handleSubmit={handleSubmit}
        />
      default:
        return null;
    }
  } 

  const handleActiveEditorTab = (tabName) => {
    if (activeEditorTab === tabName) {
      // If clicking on the same tab, close it
      setactiveEditorTab("");
    } else {
      // If clicking on a different tab, open it
      setactiveEditorTab(tabName);
    }
  };

  const handleDecals = (type, result) =>{
    console.log('handleDecals called with type:', type)
    const decalType = DecalTypes[type]
    console.log('decalType:', decalType)

    state[decalType.stateProperty] = result
    console.log('state updated:', state)

    if(!activefilterTab[decalType.filterTab]) {
      handActiveFilterTab(decalType.filterTab)
    }
  };

  const handActiveFilterTab = (tabName) =>{
    console.log('handActiveFilterTab called with:', tabName)
    switch (tabName) {
      case "logoShirt":
        setactivefilterTab({...activefilterTab, logoShirt: !activefilterTab.logoShirt})
        state.isLogoTexture = !activefilterTab.logoShirt
        break;
      case "stylishShirt":
        setactivefilterTab({...activefilterTab, stylishShirt: !activefilterTab.stylishShirt})
        state.isFullTexture = !activefilterTab.stylishShirt
        break;
      default:
        setactivefilterTab({logoShirt: true, stylishShirt: false})
        state.isLogoTexture = true
        state.isFullTexture = false
        break;
    }
  };

  const handleSubmit = async(type) =>{
    if(!prompt) {
      return alert('Please enter a prompt')
    }
    try {
      //calling Backend to generate a ai image
      setGeneratingImage(true);

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dalle`, {
        prompt
      });

      const data = await response.data;
      console.log('AI response:', data);

      if(response.status === 200) {
        const imageData = data.photo;
        handleDecals(type, `data:image/png;base64,${imageData}`)
        setPrompt("");
      } else {
        throw new Error(data.error || 'Failed to generate image')
      }


    } catch (error) {
      console.error('Error generating image:', error.message)
      alert(error.message, 'Error generating image')
      setPrompt("")
    }
    finally{
      setGeneratingImage(false);
      setactiveEditorTab("");
    }
  }

  const readFile = (type) =>{
    console.log('readFile called with type:', type)
    console.log('file:', file)
    
    if(!file) {
      alert('Please select a file first')
      return
    }
    
    reader(file)
    .then((result) =>{
      console.log('File read successfully:', result)
      handleDecals(type, result)
      setactiveEditorTab("")
    })
    .catch((error) => {
      console.error('Error reading file:', error)
      alert('Error uploading image')
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-constainer tabs">
                {EditorTabs.map((tab) => {
                  return <Tab 
                    key={tab.name} 
                    tab={tab} 
                    isActiveTab={activeEditorTab === tab.name}
                    handleclick={() => handleActiveEditorTab(tab.name)}
                  />
                })}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => {
              return <Tab key={tab.name} tab={tab} isfilterTab isActiveTab={activefilterTab[tab.name]} handleclick={()=>handActiveFilterTab(tab.name)}/>
            })}
            
            <div
              className="tab-btn glassmorphism rounded-full"
              onClick={downloadCanvasToImage}
              style={{ backgroundColor: "transparent", opacity: 1 }}
            >
              <img 
                src={download} 
                alt="download"
                className="w-11/12 h-11/12 object-contain"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;