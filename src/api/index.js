import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const mode = process.env.REACT_APP_MODE;
const units = process.env.REACT_APP_UNITS;
const lang = process.env.REACT_APP_LANG;

export const getParams = param => ({
  appid: apiKey || '',
  ...(mode === 'json' ? {} : { mode }),
  ...(units === 'metric' ? {} : { units }),
  ...(lang === 'en' ? {} : { lang }),
  ...param
});

export const instance = axios.create({
  baseURL
});
