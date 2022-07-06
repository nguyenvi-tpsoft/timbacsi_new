import axiosClient from "./axiosClient"
const loginApi = {
    login: (params) => {
        const url = '/login';
        return axiosClient.post(url, params)
    }
}

export default loginApi;