export type Recipe = {
    id?: number,
    title: string,
    ingredients: string,
    directions: string,
    mealTypes: ("Breakfast" | "Lunch" | "Dinner" | "Dessert")[],
    rating: number,
    lastChange: Date,
    favorite: boolean
}