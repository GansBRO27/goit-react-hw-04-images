const KEY = '28561532-78530109a8973756afb34bd86';
export default function fetchImages(query, page) {
  return fetch(
    `https://pixabay.com/api/?q=${
      query && query
    }&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}
