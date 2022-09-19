import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import ImgGallery from './imageGallery.styled';
import GalleryItem from 'components/imageGalleryItem/imgGalerryItem';
export default function ImageGallery({ gallery, onClick }) {
  return (
    <ImgGallery className="gallery">
      {gallery.map(({ previewURL, largeImageURL }) => {
        return (
          <GalleryItem
            onClick={onClick}
            pageURL={previewURL}
            largeImageURL={largeImageURL}
            key={nanoid()}
          />
        );
      })}
    </ImgGallery>
  );
}
ImageGallery.propTypes = {
  gallery: PropTypes.array,
  onClick: PropTypes.func,
};
