import { Component } from 'react';
import { createPortal } from 'react-dom';
import Overlay from './modal.styled';
import ModalStyled from './modalStyled.styled';
import PropTypes from 'prop-types';
import Img from './img.styled';
const modalRoot = document.querySelector('#modal-root');
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onHendlerEsc);
    window.addEventListener('click', this.handleBackdropClick);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onHendlerEsc);
    window.removeEventListener('click', this.handleBackdropClick);
  }
  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  onHendlerEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <Overlay className="overlay" onClick={this.handleBackdropClick}>
        <ModalStyled className="modal">
          <Img src={this.props.url} alt="photo" />
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
