import type {Recipe} from "./Recipe.ts";

export const MockRecipeDB:Recipe[] = [
    {
        id:1,
        title: "taco",
        ingredients: "tortilla, meat, cheese",
        directions: "do things",
        mealTypes: ["Lunch", "Dinner"],
        rating: 4.2,
        lastChange: new Date(),
        favorite: true
    },
    {
        id:2,
        title: "soup",
        ingredients: "noodles, broth",
        directions: "do things",
        mealTypes: ["Lunch", "Dinner"],
        rating: 2.5,
        lastChange: new Date(),
        favorite: false
    }
]