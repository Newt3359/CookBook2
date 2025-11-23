import type {Recipe} from "./Recipe.ts";

export const testRecipe:Recipe[] =[
    {
        id:1,
        title: "taco",
        ingredients: "tortilla, meat, cheese",
        directions: "do things",
        mealTypes: ["Lunch", "Dinner"],
        rating: 4.2,
        lastChange: new Date(),
        favorite: true
    }
]