export const MealTypes = [
    {id: 1, name: "BREAKFAST", isChecked: false},
    {id: 2, name: "LUNCH", isChecked: false},
    {id: 3, name: "DINNER", isChecked: false},
    {id: 4, name: "DESSERT", isChecked: false}
] as const;

export type RecipeMeal = (typeof MealTypes)[number]

export type Recipe = {
    id?: number,
    title: string,
    ingredients: string,
    directions: string,
    mealTypes: RecipeMeal[],
    rating: number,
    lastChange?: Date,
    favorite: boolean
}