// https://api.punkapi.com/v2/beers?page=2&per_page=80

import axios from "axios";

export async function fetchBeers(page: number, limit: number) {
  const res = await axios.get(
    `https://api.punkapi.com/v2/beers?page=${page}&per_page=${limit}`
  );
  return res.data;
}
