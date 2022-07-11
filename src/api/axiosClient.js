import axios from "axios";
import queryString from 'query-string';
const token = 'eyJ0eXAi.iJKV1QiLCJhbGci.iJIUzI1NiJ9OeyJtc2R2IjoiMjIwMjIwMTA1NDA2MzciLCJtc2RuIjoiMDkwNzY3.DIzNCIsImhvdGVuIjpudWxsLCJleHBpcmVkIjoxNjg1MTczNjIxfQONrATiZE2yQxcaP4rW8ak-WJTeN6SqVpNgptJrkXo864';
const axiosClient = axios.create({
    baseURL: 'https://localhost/webApp_Project/WebKhac/FDoctor/api_app',
    // baseURL: 'https://timbacsi.vn/api_app',
    headers: { Authorization: `Bearer ` + token },
    paramsSerializer: params => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config) => {
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
});

export default axiosClient;

