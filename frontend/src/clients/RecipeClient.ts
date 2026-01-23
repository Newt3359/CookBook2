import axios from "axios";
import type {Recipe} from "../types/Recipe.ts";


export const createRecipeCall = async (recipe:Recipe):Promise<Recipe> => {
   const result = await axios.post("/api/recipe", recipe)
    return result.data
}

export const deleteRecipeCall = async (id: number | undefined) => {
    axios.delete(`http://localhost:8080/api/recipe/${id}`)
        .then(response => {
            console.log(response.status)
        })
        .catch(error => {
            console.log(error)
        })
}

export const getAllRecipesCall = async (): Promise<Recipe[]> => {
    try {
        const response = await axios.get<Recipe[]>(
            "http://localhost:8080/api/recipe/random"
        );
        return response.data;
    } catch (err) {
        console.error(err);
        return []; // 👈 CRITICAL
    }
};

export const updateRecipe = async (recipe:Recipe) => {
    const response = await axios.patch(
        `http://localhost:8080/api/recipe/${recipe.id}`,
        recipe
    )
    console.log(response.data)
    return response.data
}