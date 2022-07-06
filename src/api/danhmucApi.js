import axiosClient from "./axiosClient"

const danhmucApi = {
    nhomsp: (params) => {
        const url = '/danhmuc/list';
        return axiosClient.post(url, params)
    }
}

export default danhmucApi;