import { Component } from 'react';
import { Modal } from '../Modal/Modal';
import { GalleryItem, ImageGallery } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    largeImage: '',
  };

  openModal = () => {
    this.setState({
      largeImage: this.props.largeImage,
    });
  };

  closeModal = () => {
    this.setState({
      largeImage: '',
    });
  };

  render() {
    return (
      <GalleryItem>
        <ImageGallery
          src={this.props.webImage}
          alt=""
          onClick={this.openModal}
        />
        {this.state.largeImage && (
          <Modal
            largeImage={this.state.largeImage}
            closeModal={this.closeModal}
          ></Modal>
        )}
      </GalleryItem>
    );
  }
}
