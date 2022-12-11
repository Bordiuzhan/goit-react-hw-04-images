import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ImgWrap } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidMount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('ти нажав ESCAPE');
      this.props.closeModal();
    }
  };

  handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      console.log('ти нажав Beck Drop');
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <Overlay
        tabIndex={-1}
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
