import type {Recipe} from "./Recipe.ts";

export function checkNewRecipeSubmission(recipe){


    const atLeastOneSelected = recipe.mealTypes

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

    if (atLeastOneSelected === []) {
        alert("Please select at least one meal type.");
        return;
    }

    if (recipe.rating === 0){
        alert("At least 1 Star is required")
        return;
    }
}