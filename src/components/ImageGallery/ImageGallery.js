import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ items }) => {
  return (
    <List>
      {items.map(item => (
        <ImageGalleryItem
          key={item.id}
          webImage={item.webformatURL}
          largeImage={item.largeImageURL}
        ></ImageGalleryItem>
      ))}
    </List>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
