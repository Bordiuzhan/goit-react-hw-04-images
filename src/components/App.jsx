import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { getDataApi } from '../services/api';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
  };

  queryData = data => {
    this.setState({ query: data });
  };
  async componentDidUpdate() {
    try {
      const { query } = this.state.query;
      console.log(query);
      const response = await getDataApi(query);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.queryData}></Searchbar>
      </div>
    );
  }
}
