import axiosClient from "./axiosClient"

const datlichApi = {
    getpk: (params) => {
        const url = '/getpk';
        return axiosClient.post(url, params)
    },
    getkhunggio: (params) => {
        const url = '/getkhunggio';
        return axiosClient.post(url, params)
    }
}

export default datlichApi;