
import axios from 'axios';
const axiosInstance = axios.create(
  {
  baseURL: 'https://pixabay.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const fetchPics = async (inputValue, page) => {
  const API_KEY = '36993909-bd01d1afa72b03317a479068e';
  try {
    const response = await axiosInstance.get('', {
      params: {
        key: API_KEY,
        q: inputValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};