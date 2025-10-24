import {describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {ReadRecipe} from "../ReadRecipe.tsx";
import {MemoryRouter} from "react-router-dom";
import axios from "axios";



vi.mock("axios");
const mockedAxios = axios as unknown as {
    get: ReturnType<typeof vi.fn>;
};


describe("should test visibility on page", () => {

    it('should have a title', () => {
        render(<MemoryRouter><ReadRecipe/></MemoryRouter>)
        expect(screen.getByRole("heading", {name: "Read"})).toBeVisible()
    });

    it('should have search component', () => {
        render(<MemoryRouter><ReadRecipe/></MemoryRouter>)
        expect(screen.getByRole("button", {name: "Search"})).toBeVisible()
        expect(screen.getByRole("textbox", {name: "Search:"})).toBeVisible()
    });

    it('should have an expand button', async () => {

        mockedAxios.get.mockResolvedValueOnce({
            data: [
                {
                    id: 25,
                    title: "Taco",
                    ingredients: "Beef\ncheese\ntortillas",
                    mealTypes: ["Lunch", "Dinner"],
                    favorite: true,
                    rating: 4,
                    timesMade: 2,
                },
            ],
            status: 200,
        });
        
        render(<MemoryRouter><ReadRecipe/></MemoryRouter>)
        const expandButton = await screen.findByRole("button", {name: "Expand"})
        expect(expandButton).toBeVisible()
    });
});

    describe('Test search bar functionality', () => {

        it('should only return taco when type', async () => {

            mockedAxios.get.mockResolvedValueOnce({
                data: [
                    {
                        id: 25,
                        title: "Taco",
                        ingredients: "Beef\ncheese\ntortillas",
                        mealTypes: ["Lunch", "Dinner"],
                        favorite: true,
                        rating: 4,
                        timesMade: 2,
                    },
                ],
                status: 200,
            });

            render(<MemoryRouter><ReadRecipe/></MemoryRouter>)

            const search = screen.getByPlaceholderText("Search by title, description, or ingredients")
            const button = screen.getByRole("button", {name:"Search"})

            fireEvent.change(search,{target: {value: "taco"}})
            fireEvent.click(button);

            const tacoHeading = await screen.findByRole("heading", { name: /Taco/i });
            expect(tacoHeading).toBeVisible();

            const headings = screen.getAllByRole("heading").filter(h => h.textContent === "Taco");
            expect(headings.length).toBe(1);
        });
    });

