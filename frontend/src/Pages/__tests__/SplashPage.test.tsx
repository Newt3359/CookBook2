import SplashPage from "../SplashPage.tsx";
import {render, screen} from "@testing-library/react";
import {expect, describe, it} from "vitest";
import '@testing-library/jest-dom'
import {MemoryRouter} from "react-router-dom";


describe("Splash page tests", () => {

    it('should display title', () => {
        render(<MemoryRouter><SplashPage/></MemoryRouter>)
        expect(screen.getByRole("heading", {name: "Home"})).toBeVisible()
    });

    it('should display nav bar', () => {
        render(<MemoryRouter><SplashPage/></MemoryRouter>)
        expect(screen.getByTestId("navbar"))
    });

    it('should have a home button', () => {
        render(<MemoryRouter><SplashPage/></MemoryRouter>)
        expect(screen.getByRole("button", {name: "Home"})).toBeVisible()
    });

})