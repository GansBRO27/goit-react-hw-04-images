import { Component } from 'react';
import SearchBar from './searchbar/searchBar';
import ImageGallery from './imageGallery/imageGallery';
import Form from './form/form';
import LoadButton from './loadMoreBtn/loadBtn';
import AppStyled from './app.styled';
import Modal from './modal/modal';
import { spiner } from './loader/loader';
const KEY = '28561532-78530109a8973756afb34bd86';
export class App extends Component {
  state = {
    gallery: [],

    showModal: false,
    isLoading: false,
    page: '1',
    total: null,
    largeImg: '',
  };

  onElemClick = e => {
    console.log(e);
    if (e.code === 'Escape') {
      this.setState({
        showModal: false,
      });
    }
  };
  clickOnElem = url => {
    this.setState({
      showModal: !this.state.showModal,
      largeImg: url,
    });

    window.addEventListener('keydown', this.onElemClick);
  };
  clickOnOverlay = e => {
    if (e.target.nodeName !== 'IMG') {
      this.setState({
        showModal: !this.state.showModal,
        largeImg: '',
      });
    }
  };
  handleSubmit = query => {
    if (query.trim() !== '') {
      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${query}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(responce => responce.json())
          .then(({ hits, totalHits }) =>
            this.setState({ gallery: hits, total: totalHits, page: '1' })
          )
          .finally(() => this.setState({ isLoading: false }));
      }, 1000);
    }
  };

  clickOnLoadMore = () => {
    this.setState({
      isLoading: true,
    });
    fetch(
      `https://pixabay.com/api/?page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(responce => responce.json())
      .then(({ hits, totalHits }) =>
        this.setState(prevState => {
          return {
            page: Number(prevState.page) + 1,
            gallery: [...prevState.gallery, ...hits],
            total: totalHits,
          };
        })
      )
      .finally(
        this.setState({
          isLoading: false,
        })
      );
  };
  render() {
    if (this.state.showModal) {
      return (
        <Modal
          url={this.state.largeImg}
          onElemClick={this.onElemClick}
          onOverlayClick={this.clickOnOverlay}
        />
      );
    }
    return (
      <AppStyled>
        <SearchBar>
          <Form onSubmit={this.handleSubmit} />
        </SearchBar>
        {!this.state.isLoading ? (
          <ImageGallery
            gallery={this.state.gallery}
            onClick={this.clickOnElem}
          />
        ) : (
          <span>{spiner}</span>
        )}

        {this.state.gallery.length > 0 && !this.state.isLoading && (
          <LoadButton onClick={this.clickOnLoadMore} />
        )}
      </AppStyled>
    );
  }
}
