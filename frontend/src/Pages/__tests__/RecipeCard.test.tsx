import {render, screen} from "@testing-library/react";
import {expect, describe, it} from "vitest";
import '@testing-library/jest-dom'
import {RecipeCard} from "../../Components/RecipeCard.tsx";
import type {Recipe} from "../../Utils/Recipe.ts";
import {MockRecipeDB} from "../../Utils/MockRecipeDB.ts";

const testRecipe:Recipe[] =[
    {
        id:1,
        title: "taco",
        ingredients: "tortilla, meat, cheese",
        mealTypes: ["Lunch", "Dinner"],
        rating: 4.2,
        timesMade: 15,
        lastChange: new Date(),
        favorite: true
    }
]


    describe('should test recipe card', () => {

    it('should have a card', () => {
        render(<RecipeCard searchResults={testRecipe}/>)
        expect(screen.getByTestId("Card")).toBeInTheDocument()
    });

        it('should verify all cards render', () => {
            render(<RecipeCard searchResults={MockRecipeDB}/>)
            expect(screen.getByRole("heading", {name: "taco"}))
            expect(screen.getByRole("heading", {name: "soup"}))
        });
    });