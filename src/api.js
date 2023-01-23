import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31640971-742b32395d0b897b4125e0e70';

const serchQuery = `${BASE_URL}?key=${KEY}`;

export const getImges = async (q, page) => {
  const responce = await axios.get(
    `${serchQuery}&q=${q}&page=${page}&per_page=12`
  );
  return responce.data;
};
