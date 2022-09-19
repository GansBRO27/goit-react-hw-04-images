import PropTypes from 'prop-types';
export default function GalleryItem({ pageURL, largeImageURL, onClick }) {
  return (
    <li className="gallery-item">
      <img
        onClick={() => onClick(largeImageURL)}
        src={pageURL}
        alt=""
        name={largeImageURL}
        width="120px"
        height="60px"
      />
    </li>
  );
}
GalleryItem.propTypes = {
  pageURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func,
};
