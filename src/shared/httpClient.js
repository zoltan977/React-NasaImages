import axios from 'axios';
import errorResponseHandler from './errorResponseHandler';
import env from "react-dotenv";

const httpClient = axios.create({
    baseURL: env.API_BASE_URL,
});

httpClient.interceptors.response.use(
    response => response,
    errorResponseHandler,
);

httpClient.interceptors.request.use(
    config => config,
    error => Promise.reject(error),
);

export default httpClient;
