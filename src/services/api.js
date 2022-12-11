import axios from 'axios';

const APIkey = '30638186-bb770c9b9d6e6a40dc9ec3884';
const perPage = 12;

export const getDataApi = async (value, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${value}&page=${page}&key=${APIkey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  return response.data;
};
