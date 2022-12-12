import { Component } from 'react';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { getDataApi } from '../services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Layout } from './Layout.styled';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
    error: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const response = await getDataApi(query, page);
        this.setState(prevState => ({
          items: [...prevState.items, ...response.hits],
        }));
        this.setState({ isLoading: false });
      } catch (err) {
        this.setState({ error: true });
      } finally {
        this.setState({ isLoading: false });
      }
    }
    if (prevState.page > 1) {
      this.scrollWindow();
    }
  }

  queryData = ({ query }) => {
    this.setState({ query, page: 1, items: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  scrollWindow = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { items, isLoading, error } = this.state;
    return (
      <Layout>
        <Searchbar onSubmit={this.queryData}></Searchbar>
        {error && <h1>Ooops... Something went wrong.Try again. </h1>}
        {items.length > 0 && <ImageGallery items={items}></ImageGallery>}
        {isLoading && <Loader></Loader>}
        {items.length > 0 && <Button onClick={this.loadMore}></Button>}
      </Layout>
    );
  }
}
