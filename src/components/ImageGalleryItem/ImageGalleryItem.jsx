import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ imageItem }) => {
  // console.log(imageItem.webformatURL);
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={imageItem.webformatURL}
        alt=""
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};
