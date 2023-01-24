import { SerchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Component } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { getImges } from '../../api';
import css from './App.module.css';

import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';

export class App extends Component {
  state = {
    page: 1,
    keyWord: '',
    images: [],
    isLoading: false,
    error: null,
  };

  getKeyWord = q => {
    this.setState({ keyWord: q.trim(), page: 1, images: [], error: null });
  };

  componentDidUpdate = async (_, prevState) => {
    const { keyWord, page } = this.state;

    if (prevState.page !== page || (prevState.keyWord !== keyWord && keyWord)) {
      try {
        this.setState({ isLoading: true });
        const fetchImages = await getImges(keyWord, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...fetchImages.hits],
        }));
      } catch (error) {
        this.setState({ error: 'Something was happened, try again' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, page, isLoading, error, keyWord } = this.state;
    const totalHits = page * 12;

    return (
      <div className={css.App}>
        <SerchBar onSubmit={this.getKeyWord} />
        {isLoading && (
          <div className={css.Loader}>
            <InfinitySpin width="200" color="#3f51b5" />
          </div>
        )}
        {images.length > 0 && keyWord && <ImageGallery images={images} />}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {keyWord && images.length === 0 && !isLoading && (
          <ErrorMessage>Nothing was found by your request</ErrorMessage>
        )}
        {!keyWord && <ErrorMessage>Enter keyword to search</ErrorMessage>}

        {images.length > 11 && totalHits <= 488 && keyWord && (
          <Button onButtonClick={this.loadMore}>Load more</Button>
        )}
      </div>
    );
  }
}
