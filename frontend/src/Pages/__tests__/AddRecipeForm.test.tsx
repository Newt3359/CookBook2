import {render, screen} from "@testing-library/react";
import {expect, describe, it} from "vitest";
import '@testing-library/jest-dom'
import {AddRecipeForm} from "../../Components/AddRecipeForm.tsx";

describe("Tests add recipe form", () =>{

    it('should have title field', () => {
        render(<AddRecipeForm/>)
        expect(screen.getByLabelText("Title:")).toBeInTheDocument()
    });

    it('should have ingredients field', () => {
        render(<AddRecipeForm/>)
        expect(screen.getByLabelText("Ingredients:")).toBeInTheDocument()
    });

    it('should have meal type field', () => {
        render(<AddRecipeForm/>)
        expect(screen.getByRole("heading", {name: "Meal Type:"})).toBeVisible()
    });

    it('should have a rating field', () => {
        render(<AddRecipeForm/>)
        expect(screen.getByRole("heading", {name: "Rating:"})).toBeVisible()
    });

    it('should have favorite field', () => {
        render(<AddRecipeForm/>)
        expect(screen.getByRole("heading", {name: "Favorite:"})).toBeInTheDocument()
        expect(screen.getByLabelText("Yes:")).toBeInTheDocument()
        expect(screen.getByLabelText("No:")).toBeInTheDocument()
    });
})