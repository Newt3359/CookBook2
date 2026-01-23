import axios from "axios";
import type {RecipeImage} from "../types/RecipeImage.ts";

export const uploadImage = (id: number,formData: FormData) => {
    return axios.post(`http://localhost:8080/api/image/${id}`, formData);
};

type APIRecipeImage = {
    imageId: number;
    imgUrl: string;
};

export const getImagesByRecipeId = async (id: number | undefined): Promise<RecipeImage[]> => {
    if (!id) return [];
    try {
        const response = await axios.get<APIRecipeImage[]>(`/api/image/${id}`);

        return response.data.map((img) => ({
            id: img.imageId,
            url: img.imgUrl,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};