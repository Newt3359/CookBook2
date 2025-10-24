import {render, screen} from "@testing-library/react";
import {expect, describe, it} from "vitest";
import '@testing-library/jest-dom'
import {RecipeCard} from "../../Components/RecipeCard.tsx";
import {MockRecipeDB} from "../../Utils/MockRecipeDB.ts";
import {testRecipe} from "../../Utils/TestRecipe.ts";



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

    it('should have expand button', () => {
        render(<RecipeCard searchResults={testRecipe}/>)
        expect(screen.getByRole("button", {name: "Expand"}))
    });
});