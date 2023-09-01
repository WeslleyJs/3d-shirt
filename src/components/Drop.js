import { useState } from 'react';
import { state } from '../store';
import Dropzone from 'react-dropzone';

function Drop() {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const imageUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
      state.decals.push(...imageUrls);
      setSelectedImages([]);
    }
  };

  return (
    <>
      <Dropzone onDrop={handleDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>UPLOAD</p>
          </div>
        )}
      </Dropzone>
    </>
  );
}

export default Drop;
