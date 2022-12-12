import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ImgWrap } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <Overlay
        tabIndex={0}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleBackDropClick}
      >
        <ImgWrap>
          <img src={this.props.largeImage} alt=""></img>
        </ImgWrap>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
};
