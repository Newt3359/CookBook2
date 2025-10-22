import type {Recipe} from "./Recipe.ts";

export const MockRecipeDB:Recipe[] = [
    {
        id:1,
        title: "taco",
        ingredients: "tortilla, meat, cheese",
        mealTypes: ["Lunch", "Dinner"],
        rating: 4.2,
        timesMade: 15,
        lastChange: new Date(),
        favorite: true
    },
    {
        id:2,
        title: "soup",
        ingredients: "noodles, broth",
        mealTypes: ["Lunch", "Dinner"],
        rating: 2.5,
        timesMade: 4,
        lastChange: new Date(),
        favorite: false
    }
]