import axiosClient from "./axiosClient"

const benhnhanApi = {
    getbenhnhan: (params) => {
        const url = '/getbenhnhan';
        return axiosClient.post(url, params)
    }
}

export default benhnhanApi;