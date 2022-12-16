import { getDataApi } from '../services/api';
import { Layout } from './Layout.styled';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { useState, useEffect, useLayoutEffect } from 'react';

export function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const scrollWindow = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  useLayoutEffect(() => {
    if (page > 1) {
      scrollWindow();
    }
  });

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await getDataApi(query, page);
        setItems(prevItems => [...prevItems, ...response.hits]);
        setTotal(response.total);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [page, query]);

  const queryData = data => {
    if (data === query) {
      return;
    }
    setQuery(data);
    setPage(1);
    setItems([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Layout>
      <Searchbar onSubmit={queryData}></Searchbar>
      {error && <h1>Ooops... Something went wrong.Try again. </h1>}
      {items.length > 0 && <ImageGallery items={items}></ImageGallery>}
      {isLoading && <Loader></Loader>}
      {total !== items.length && items.length > 0 && (
        <Button onClick={loadMore}></Button>
      )}
    </Layout>
  );
}
