import SearchBar from './searchbar/searchBar';
import ImageGallery from './imageGallery/imageGallery';
import Form from './form/form';
import LoadButton from './loadMoreBtn/loadBtn';
import AppStyled from './app.styled';
import ModalHook from './modal/modal';
import { spiner } from './loader/loader';
import fetchImages from 'services/fetchImg';
import { useState } from 'react';
import { useEffect } from 'react';
export function AppHook() {
  const [gallery, setGallery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [query, setQuery] = useState('');
  const [largeImg, setLargeImg] = useState('');
  useEffect(() => {
    if (query.trim() !== '') {
      setTimeout(() => {
        fetchImages(query, page)
          .then(responce => responce.json())
          .then(({ hits, totalHits }) => {
            setGallery(prevState => [...prevState, ...hits]);
          })
          .finally(() => setIsLoading(false));
      }, 1000);
    }
  }, [query, page]);
  const onClose = () => {
    setShowModal(false);
  };
  const clickOnElem = url => {
    setShowModal(!showModal);
    setLargeImg(url);
  };
  const handleSubmit = query => {
    if (query.trim() !== '') {
      setQuery(query);
    }
  };
  const clickOnLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  if (showModal) {
    return <ModalHook url={largeImg} onClose={onClose} />;
  }
  return (
    <AppStyled>
      <SearchBar>
        <Form onSubmit={handleSubmit} />
      </SearchBar>
      {!isLoading ? (
        <ImageGallery gallery={gallery} onClick={clickOnElem} />
      ) : (
        <span>{spiner}</span>
      )}

      {gallery.length > 0 && !isLoading && (
        <LoadButton onClick={clickOnLoadMore} />
      )}
    </AppStyled>
  );
}
// export class App extends Component {
//   state = {
//     gallery: [],

//     showModal: false,
//     isLoading: false,
//     page: '1',
//     total: null,
//     largeImg: '',
//   };

//   onClose = () => {
//     this.setState({
//       showModal: false,
//     });
//   };
//   clickOnElem = url => {
//     this.setState({
//       showModal: !this.state.showModal,
//       largeImg: url,
//     });
//   };

//   handleSubmit = query => {
//     if (query.trim() !== '') {
//       setTimeout(() => {
//         fetchImages(query, this.state.page)
//           .then(responce => responce.json())
//           .then(({ hits, totalHits }) =>
//             this.setState({ gallery: hits, total: totalHits, page: '1' })
//           )
//           .finally(() => this.setState({ isLoading: false }));
//       }, 1000);
//     }
//   };

//   clickOnLoadMore = () => {
//     this.setState({
//       isLoading: true,
//     });
//     fetchImages(this.state.page)
//       .then(responce => responce.json())
//       .then(({ hits, totalHits }) =>
//         this.setState(prevState => {
//           return {
//             page: Number(prevState.page) + 1,
//             gallery: [...prevState.gallery, ...hits],
//             total: totalHits,
//           };
//         })
//       )
//       .finally(
//         this.setState({
//           isLoading: false,
//         })
//       );
//   };
//   render() {
//     if (this.state.showModal) {
//       return (
//         <Modal
//           url={this.state.largeImg}
//           onClose={this.onClose}
//           onOverlayClick={this.clickOnOverlay}
//         />
//       );
//     }
//     return (
//       <AppStyled>
//         <SearchBar>
//           <Form onSubmit={this.handleSubmit} />
//         </SearchBar>
//         {!this.state.isLoading ? (
//           <ImageGallery
//             gallery={this.state.gallery}
//             onClick={this.clickOnElem}
//           />
//         ) : (
//           <span>{spiner}</span>
//         )}

//         {this.state.gallery.length > 0 && !this.state.isLoading && (
//           <LoadButton onClick={this.clickOnLoadMore} />
//         )}
//       </AppStyled>
//     );
//   }
// }
