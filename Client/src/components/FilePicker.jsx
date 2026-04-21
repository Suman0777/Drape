import React from 'react'
import CustomButton from './CustomButton'
const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex-col rounded-2xl cursor-pointer" >
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className='file-upload'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Choose a file
        </label>

        <p className="mt-2 text-sm text-gray-500 flex justify-center truncate">
          {file ? file.name : "No file chosen"}
        </p>
         
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          title="logo"
          handleClick={() => readFile('logo')}
          customStyles= "text-xs"
        />
        <CustomButton
          type="filled"
          title="full"
          handleClick={() => readFile('full')}
          customStyles= "text-xs"
        />
      </div>
    </div>
  )
}

export default FilePicker