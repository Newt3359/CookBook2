import {type RecipeImage, sampleImages} from "./RecipeImage.ts";
import type {RecipeMeal} from "./RecipeMeal.ts";

export const MealTypes = [
    {id: 1, name: "BREAKFAST"},
    {id: 2, name: "LUNCH"},
    {id: 3, name: "DINNER"},
    {id: 4, name: "DESSERT"}
] as const;

export type Recipe = {
    id?: number,
    title: string,
    ingredients: string,
    directions: string,
    mealTypes: RecipeMeal[],
    rating: number,
    lastChange?: Date,
    favorite: boolean,
    images?: RecipeImage[];
}

export const sampleRecipe = {
    id:1,
    title: "taco",
    ingredients: "meat and tortilla",
    directions: "make it",
    mealTypes: [
        {mealId: 1, mealType: "LUNCH" as const},
        {mealId: 2, mealType: "DINNER" as const}
    ],
    rating: 4.2,
    favorite: false,
    images: sampleImages
}