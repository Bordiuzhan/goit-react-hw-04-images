import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { GalleryItem, ImageGallery } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ largeImageUrl, webImage }) => {
  const [largeImage, setLargeImage] = useState('');

  const openModal = () => {
    setLargeImage(largeImageUrl);
  };

  const closeModal = () => {
    setLargeImage('');
  };

  return (
    <GalleryItem>
      <ImageGallery src={webImage} alt="" onClick={openModal} />
      {largeImage && (
        <Modal largeImage={largeImage} closeModal={closeModal}></Modal>
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webImage: PropTypes.string.isRequired,
};
