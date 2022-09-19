import SearchBarStyled from './searchBar.styled';
export default function SearchBar({ children }) {
  return <SearchBarStyled className="searchbar">{children}</SearchBarStyled>;
}
