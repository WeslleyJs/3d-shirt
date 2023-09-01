import { useState } from 'react';
import { state } from '../store';
import Dropzone from 'react-dropzone';

function Drop() {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length >= 0) {
      // Crie um array de URLs das imagens selecionadas
      const imageUrls = acceptedFiles.map((file) => URL.createObjectURL(file));

      // Atualize o estado global (state.decals) com as URLs das imagens
      state.decals.push(...imageUrls);

      // Limpe o estado local
      setSelectedImages([]);
    }
  };

  return (
    <div className="">
      <Dropzone onDrop={handleDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>UPLOAD</p>
          </div>
        )}
      </Dropzone>
      {selectedImages.length > 0 && (
        <div>
          <h2>Imagens Selecionadas:</h2>
          <ul>
            {selectedImages.map((image, index) => (
              <li key={index}>
                <img src={image} alt={`Imagem ${index}`} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Drop;
