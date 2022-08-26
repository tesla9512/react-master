import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`;
const BASE_URL_ALTER = `https://ohlcv-api.nomadcoders.workers.dev`;

export async function fetchCoins() {
  return await axios.get(`${BASE_URL}/coins`).then((response) => response.data);
}

export async function fetchCoinInfo(coinId: string) {
  return await axios
    .get(`${BASE_URL}/coins/${coinId}`)
    .then((response) => response.data);
}

export async function fetchCoinTickers(coinId: string) {
  return await axios
    .get(`${BASE_URL}/tickers/${coinId}`)
    .then((response) => response.data);
}

export async function fetchCoinHistory(coinId: string) {
  // const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60*60*24*7;

  return await axios
    .get(`${BASE_URL_ALTER}?coinId=${coinId}`)
    .then((response) => response.data);
}
