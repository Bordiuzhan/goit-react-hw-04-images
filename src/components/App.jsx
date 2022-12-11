import { Component } from 'react';
import { FallingLines } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { getDataApi } from '../services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        const { query, page } = this.state;
        this.setState({ isLoading: true });
        const response = await getDataApi(query, page);
        this.setState(prevState => ({
          items: [...prevState.items, ...response.hits],
        }));
        this.setState({ isLoading: false });
      } catch (err) {
        console.log(err);
      }
    }
  }

  queryData = ({ query }) => {
    this.setState({ query: query, page: 1, items: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.queryData}></Searchbar>
        {this.state.isLoading && (
          <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-lines-loading"
          />
        )}
        {this.state.items.length > 0 && (
          <ImageGallery items={this.state.items}></ImageGallery>
        )}
        {this.state.items.length > 0 && (
          <Button onClick={this.loadMore}></Button>
        )}
      </div>
    );
  }
}
