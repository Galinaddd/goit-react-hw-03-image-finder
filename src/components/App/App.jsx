import { SerchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Component } from 'react';
import { getImges } from '../../api';
import css from './App.module.css';

export class App extends Component {
  state = {
    page: 1,
    per_page: 100,
    keyWord: '',
    images: [],
  };

  getKeyWord = q => {
    console.log('serch from serchbar', q);
    this.setState({ keyWord: q });
    console.log('state', this.state.keyWord);
  };

  componentDidUpdate = async (_, prevState) => {
    const { keyWord, page, per_page } = this.state;

    if (prevState.keyWord !== keyWord) {
      this.setState({ page: 1 });
    }
    if (prevState.page !== page || prevState.keyWord !== keyWord) {
      if (prevState.keyWord !== keyWord) {
        this.setState({ page: 1, images: [] });
      }
      const fetchImages = await getImges(keyWord, page, per_page);
      this.setState(prevState => ({
        images: [...prevState.images, ...fetchImages.hits],
      }));
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, page, per_page } = this.state;
    const totalHits = page * per_page;
    console.log('totalHits', totalHits);
    return (
      <div className={css.App}>
        <SerchBar onSubmit={this.getKeyWord} />
        <ImageGallery images={images} />
        {images.length > 0 && totalHits <= 500 - per_page && (
          <Button onButtonClick={this.loadMore}>Load more</Button>
        )}
      </div>
    );
  }
}
