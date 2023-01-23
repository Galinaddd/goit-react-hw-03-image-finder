import css from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  static propTypes = {
    imageItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  };

  state = { isModalOpen: false };

  toogleModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.imageItem;

    return (
      <li className={css.ImageGalleryItem} onClick={this.toogleModal}>
        <img
          src={webformatURL}
          alt={tags}
          className={css.ImageGalleryItemImage}
        />
        {this.state.isModalOpen && (
          <Modal onCloseModal={this.toogleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </li>
    );
  }
}
