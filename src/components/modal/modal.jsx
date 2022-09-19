import { Component } from 'react';
import { createPortal } from 'react-dom';
import Overlay from './modal.styled';
import ModalStyled from './modalStyled.styled';
import PropTypes from 'prop-types';
import Img from './img.styled';
const modalRoot = document.querySelector('#modal-root');
export default class Modal extends Component {
  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onElemClick);
  }

  render() {
    return createPortal(
      <Overlay className="overlay" onClick={this.props.onOverlayClick}>
        <ModalStyled className="modal">
          <Img src={this.props.url} alt="" />
        </ModalStyled>
      </Overlay>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  onElemClick: PropTypes.func,
  onOverlayClick: PropTypes.func,
  url: PropTypes.string,
};
