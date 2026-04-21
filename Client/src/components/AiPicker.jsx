import React from 'react'
import CustomButton from './CustomButton'
const AiPicker = ({prompt, setPrompt, generatingImage, handleSubmit}) => {
  return (
    <div className='aipicker-container'>
      <textarea
      className='aipicker-textarea'
      placeholder='Prompt to Generate the Logo or the Texture... '
      rows={5}
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      />
      <div className='flex flex-wrap gap-3'>
        {generatingImage ? (
          <CustomButton
            type="outline"
            title= "Generating..."
            customStyles= "text-xs"
          />
        ) : (
          <>
          <CustomButton
            type="filled"
            title="AI Logo"
            handleClick={()=> handleSubmit('logo')}
            customStyles="text-xs"
          />

          <CustomButton
            type="filled"
            title="AI Full"
            handleClick={()=> handleSubmit('full')}
            customStyles="text-xs"
          />
          </>
        )}
      </div>
    </div>
  )
}

export default AiPicker