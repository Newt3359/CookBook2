import {render, screen} from "@testing-library/react";
import {expect, describe, it} from "vitest";
import '@testing-library/jest-dom'
import {MemoryRouter} from "react-router-dom";
import {Navigation} from "../../Components/Navigation.tsx";

describe("Navigation Bar Tests", () => {

    it('should render', () => {
        render(<MemoryRouter><Navigation/></MemoryRouter>)
        expect(screen.getByTestId("navbar"))
    });
})