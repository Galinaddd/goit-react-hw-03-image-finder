import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  console.log(images);
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem key={image.id} imageItem={image} />
      ))}
    </ul>
  );
};
