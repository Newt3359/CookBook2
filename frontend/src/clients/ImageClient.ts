import axios from "axios";

export const uploadImage = (formData: FormData) => {
    return axios.post(`/api/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const getImagesByRecipeId = (id:number | undefined) => {
    return axios.get(`/api/image/${id}`)
}