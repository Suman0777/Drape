import React from 'react'
import CustomButton from './CustomButton'
const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container justify-center items-center flex-col">
      <div className="flex flex-col rounded-2xl cursor-pointer" >
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className='file-upload'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="bg-gray-300 filepicker-label text-center">
          Choose a file
        </label>

        <p className="mt-2 text-sm text-gray-500 flex justify-center truncate">
          {file ? file.name : "No file chosen"}
        </p>
         
      </div>
      <div className="mt-4 flex flex-wrap gap-5 justify-center">
        <CustomButton
          type="filled"
          title="logo"
          handleClick={() => readFile('logo')}
          customStyles= "text-xs w-15"
        />
        <CustomButton
          type="filled"
          title="full"
          handleClick={() => readFile('full')}
          customStyles= "text-xs w-15"
        />
      </div>
    </div>
  )
}

export default FilePicker