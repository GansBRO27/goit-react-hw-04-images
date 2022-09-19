import PropTypes from 'prop-types';
export default function LoadButton({ onClick }) {
  return (
    <button type="button" onClick={onClick}>
      Load more
    </button>
  );
}
LoadButton.propTypes = {
  onClick: PropTypes.func,
};
