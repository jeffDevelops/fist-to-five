import axios from 'axios';
import { BCS_TOKEN } from '../enum/localStorageKeys';

const getAuthToken = () => localStorage.getItem(BCS_TOKEN);

export default axios.create({
  baseURL: 'https://bootcampspot.com/api/instructor/v1',
  params: {
    authToken: getAuthToken()
  },
});