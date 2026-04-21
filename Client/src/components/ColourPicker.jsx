import React from 'react'
import {SketchPicker} from "react-color"
import { useSnapshot } from 'valtio'
import state from '../strore'

const ColourPicker = () => {
const snap = useSnapshot(state)
  return (
    <div className="absolute top-60 left-full ml-5 bg-gray-300 rounded-2xl">
      <SketchPicker
      color={snap.color}
      disableAlpha
      presetColors={[
        "#67C090",
        "#2C3947",
        "#9929EA",
        "#452829",
        '#29342983',
        '#2E86AB',
        "#FF5FCF",
        "#F28D35",
        "#2F5755",
        "E0D9D9",
      ]}
      onChange={(color) => state.color = color.hex}
      />
    </div>
  )
}

export default ColourPicker