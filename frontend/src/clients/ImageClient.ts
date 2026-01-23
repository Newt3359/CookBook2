import axios from "axios";
import type {RecipeImage} from "../types/RecipeImage.ts";

export const uploadImage = (formData: FormData) => {
    return axios.post(`/api/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

type APIRecipeImage = {
    imageId: number;
    imgUrl: string;
};

export const getImagesByRecipeId = async (id: number | undefined): Promise<RecipeImage[]> => {
    if (!id) return [];
    try {
        const response = await axios.get<APIRecipeImage[]>(`/api/image/${id}`);

        // Map API response to your RecipeImage type
        return response.data.map((img) => ({
            id: img.imageId,
            url: img.imgUrl,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};