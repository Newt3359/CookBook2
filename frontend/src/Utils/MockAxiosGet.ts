import axios from "axios";
import { vi } from "vitest";


// Mock axios globally
vi.mock("axios");

const mockedAxios = axios as unknown as {
    get: ReturnType<typeof vi.fn>;
};

export function mockRecipeRequest() {
    mockedAxios.get.mockResolvedValue({
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
}

beforeEach(() => {
    vi.clearAllMocks();
});
