import {type ChangeEvent, useState} from "react";
import axios, {type AxiosResponse} from "axios";
import type {Recipe} from "../Utils/Recipe.ts";

interface RecipeSearchBarProps {
    setSearchResults: (recipes: AxiosResponse<Recipe>) => void;
}

export function RecipeSearchBar({setSearchResults}:RecipeSearchBarProps){

    const [searchQuery, setSearchQuery] = useState('')

    const handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    const handleSearch = async () => {
        try {


            const response = await axios.get(`http://localhost:8080/api/recipe/search?query=${searchQuery}`)
            if (response.status === 204) {
                console.log("No results found")
            } else {
                setSearchResults(response.data)
            }
        }catch (err){
            console.log("error fetching results", err)
        }
    }

    return(
        <div className={" flex justify-center content-center mt-3"}>
            <label className="mr-3">
                Search:
                <input
                    className={"border border-black"}
                    type="text"
                    placeholder="Search by title, description, or ingredients"
                    style={{width: '325px', marginLeft: "5px"}}
                    value={searchQuery}
                    onChange={handleInputChange}/>
            </label>
            <button onClick={handleSearch} className={"bg-orange-200 border-2 shadow-md hover:bg-orange-300"} type={"button"}>Search</button>
        </div>
    );
}