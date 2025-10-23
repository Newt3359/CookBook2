import {Navigation} from "../Components/Navigation.tsx";
import {RecipeCard} from "../Components/RecipeCard.tsx";
import {RecipeSearchBar} from "../Components/RecipeSerachBar.tsx";
import {useState} from "react";


export function ReadRecipe(){

    const [searchResults, setSearchResults] = useState([])

    return(
        <>
            <Navigation/>
            <h1 className={"flex content-center justify-center text-2xl mb-2"}>Read</h1>
            <div>
                <RecipeSearchBar setSearchResults={setSearchResults}/>
            </div>
            <div>
                <RecipeCard searchResults={searchResults}/>
            </div>
        </>
    )
}