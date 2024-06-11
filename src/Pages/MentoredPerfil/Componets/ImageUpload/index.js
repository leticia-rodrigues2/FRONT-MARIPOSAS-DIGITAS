import React, { useState } from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Input = styled('input')({
    display: 'none',
  });
  
  const ImagePreviewContainer = styled('div')({
    position: 'relative',
    display: 'inline-block',
    width: '150px',
    height: '100px',
    marginBottom: '12px',
  });
  
  const CloseButton = styled(IconButton)({
    position: 'absolute',
    top: '2px',
    right: '2px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '3px',
    zIndex: 1,
    '& svg': {
      fontSize: '16px',
    },
  });

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreview(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedImage) {
      // Handle image upload logic here
      console.log("Image ready for upload:", selectedImage);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="upload-button">
          <Input
            accept="image/*"
            id="upload-button"
            type="file"
            onChange={handleImageChange}
          />
          <Button 
            variant="contained" 
            component="span" 
            size="large" 
            endIcon={<LocalSeeIcon />} 
            style={{ backgroundColor: '#808080', color: '#fff', width: '100%', marginBottom: 12, justifyContent: 'space-between' }}
          >
            CARREGAR IMAGEM
          </Button>
        </label>
        {preview && (
          <ImagePreviewContainer>
            <img src={preview} alt="Selected" style={{ width: "100%", height: "100%" }} />
            <CloseButton onClick={handleRemoveImage}>
              <CloseIcon />
            </CloseButton>
          </ImagePreviewContainer>
        )}
      </form>
    </div>
  );
};

export default ImageUpload;
