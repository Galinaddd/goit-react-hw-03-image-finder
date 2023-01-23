import { Component } from 'react';
import css from './Searchbar.module.css';

export class SerchBar extends Component {
  state = {
    serchQuery: '',
  };

  handleOnChange = evt => {
    console.log('event onchange', evt.currentTarget.value);
    this.setState({ serchQuery: evt.currentTarget.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.serchQuery);
  };

  render() {
    // console.log(css.Searchbar);
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>fgndgfndfgn</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleOnChange}
          />
        </form>
      </header>
    );
  }
}
