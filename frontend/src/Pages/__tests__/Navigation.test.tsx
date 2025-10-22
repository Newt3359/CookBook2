import {render, screen} from "@testing-library/react";
import {expect, describe, it} from "vitest";
import '@testing-library/jest-dom'
import {MemoryRouter} from "react-router-dom";
import {Navigation} from "../../Components/Navigation.tsx";
import {ChefHat} from "lucide-react";
import renderer from 'react-test-renderer';


describe("Navigation Bar Tests", () => {

    it('should render', () => {
        render(<MemoryRouter><Navigation/></MemoryRouter>)
        expect(screen.getByTestId("navbar"))
    });

    it('should have chef hat', () => {
        render(<MemoryRouter><Navigation/></MemoryRouter>)
        const chef = renderer.create(<ChefHat/>).toJSON();
        expect(chef).toMatchSnapshot();
    });

    it('should have a home button', () => {
        render(<MemoryRouter><Navigation/></MemoryRouter>)
        expect(screen.getByRole("button", {name: "Home"})).toBeVisible()
    });

    it('should have a add recipe button', () => {
        render(<MemoryRouter><Navigation/></MemoryRouter>)
        expect(screen.getByRole("button", {name: "Add Recipe"})).toBeVisible()
    });

    it('should have a view recipes button', () => {
        render(<MemoryRouter><Navigation/></MemoryRouter>)
        expect(screen.getByRole("button", {name: "Read Recipes"})).toBeVisible()
    });
})