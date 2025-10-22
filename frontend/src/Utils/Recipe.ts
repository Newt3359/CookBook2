export type Recipe = {
    id: number,
    title: string,
    ingredients: string,
    mealTypes: ("Breakfast" | "Lunch" | "Dinner" | "Dessert")[],
    rating: number,
    timesMade: number,
    lastChange: Date,
    favorite: boolean
}