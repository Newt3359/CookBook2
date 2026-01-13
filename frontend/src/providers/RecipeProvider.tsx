
import * as React from "react";
import {createContext, useContext, useState} from "react";
import type {Recipe} from "../types/Recipe.ts";


type RecipeContextType = {
    recipe : Recipe
    setRecipe: React.Dispatch<React.SetStateAction<Recipe>>
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

export function RecipeManager({children}: {children: React.ReactNode}){
    const [recipe, setRecipe] = useState<Recipe>({
        id: 0,
        title: "",
        ingredients: "",
        directions: "",
        mealTypes: [],
        rating: 0,
        favorite: false
    })

    return(
        <RecipeContext.Provider value={{recipe, setRecipe}}>
            {children}
        </RecipeContext.Provider>
    )
}

export const useRecipe = () => {
    const context = useContext(RecipeContext)
    if (!context){
        throw new Error("Used recipe must be wrapped in Recipe Provider")
    }
    return context
}