import type {Recipe} from "../types/Recipe.ts";

export function checkNewRecipeSubmission(recipe: Recipe){



    if (recipe.title === ""){
        alert("Title cannot be blank")
        return;
    }

    if (recipe.ingredients === ""){
        alert("Ingredients cannot be blank")
        return;
    }

    if (recipe.directions === ""){
        alert("Directions cannot be blank")
        return;
    }

    if (recipe.rating === 0){
        alert("At least 1 Star is required")
        return;
    }
}