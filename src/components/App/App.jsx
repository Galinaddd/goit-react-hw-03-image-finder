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
    per_page: 100,
    keyWord: '',
    images: [],
    isLoading: false,
    error: null,
  };

  getKeyWord = q => {
    this.setState({ keyWord: q });
  };

  componentDidUpdate = async (_, prevState) => {
    const { keyWord, page, per_page } = this.state;

    if (prevState.keyWord !== keyWord) {
      this.setState({ page: 1 });
    }
    if (prevState.page !== page || prevState.keyWord !== keyWord) {
      if (prevState.keyWord !== keyWord) {
        this.setState({ page: 1, images: [], error: null });
      }

      try {
        this.setState({ isLoading: true, isAmpty: false });
        const fetchImages = await getImges(keyWord, page, per_page);
        this.setState(prevState => ({
          images: [...prevState.images, ...fetchImages.hits],
        }));
        if (fetchImages.hits.length === 0) {
          this.setState({ isAmpty: true });
        }
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
    const { images, page, per_page, isLoading, error, keyWord } = this.state;
    const totalHits = page * per_page;

    return (
      <div className={css.App}>
        <SerchBar onSubmit={this.getKeyWord} />
        {isLoading && <InfinitySpin width="200" color="#3f51b5" />}
        {images.length > 0 && <ImageGallery images={images} />}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {keyWord && images.length === 0 && !isLoading && (
          <ErrorMessage>Nothing was found by your request</ErrorMessage>
        )}

        {images.length > 0 && totalHits <= 500 - per_page && (
          <Button onButtonClick={this.loadMore}>Load more</Button>
        )}
      </div>
    );
  }
}
