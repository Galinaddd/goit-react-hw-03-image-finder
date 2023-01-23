import { Component } from 'react';
import css from './Searchbar.module.css';
import { CgSearch } from 'react-icons/cg';
import PropTypes from 'prop-types';

export class SerchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
      };

  state = {
    serchQuery: '',
  };

  handleOnChange = evt => {
    this.setState({ serchQuery: evt.currentTarget.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.serchQuery);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}></span>
            <CgSearch />
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
