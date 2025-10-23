import {useEffect, useState} from "react";
import axios from "axios";
import type {Recipe} from "../Utils/Recipe.ts";
import {Star} from "lucide-react";

interface RecipeCardProps{
    searchResults: Recipe[];
}
export function RecipeCard({searchResults}:RecipeCardProps){

    const [data, setData] = useState<Recipe[]>([]);

    const maxStars = 5;

useEffect(() => {
        if (searchResults.length === 0) {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/api/recipe/random');
                    console.log(response.data)
                    setData(response.data);
                } catch (err) {
                    console.log(err);
                }
            };

            fetchData();
        }
    }, [searchResults]);

    const recipesToShow = searchResults.length > 0 ? searchResults : data;

    if (!Array.isArray(recipesToShow)) {
        console.log("recipesToShow is not an array:", recipesToShow);
        return <p>Error: expected array</p>;
    }
    console.log(recipesToShow)
    return(
        <>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
                {recipesToShow.length > 0 ? (
                    recipesToShow.map((recipe: Recipe) => (
                        <div
                            key={recipe.id}
                            className="w-full sm:w-1/2 md:w-1/4 p-2"
                            data-testid={"Card"}
                        >
                            <div className="bg-white shadow-md rounded-lg p-4 h-full flex flex-col justify-between">
                                <div>
                                    <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
                                    {/*<p className="text-gray-700 whitespace-pre-line mb-2">{recipe.ingredients}</p>*/}
                                    <p className="text-gray-600">
                                        Meal Type: {recipe.mealTypes?.join(", ")}
                                    </p>
                                </div>
                                <div className={"flex"}>
                                    <p>
                                        Favorite: <span className="font-semibold">{recipe.favorite ? "Yes" : "No"}</span>
                                    </p>
                                    <div className={"flex relative left-25"}>
                                        <label>Rating:</label>
                                    {[...Array(maxStars)].map((_, index) => {
                                    const currentRating = index + 1;
                                    return (
                                    <Star
                                    key={index}
                                    size={24}
                                    fill={currentRating <= recipe.rating ? '#ffc107' : '#e4e5e9'}
                                    style={{ marginRight: '2px' }}
                                    />

                                    );
                                    })}
                                    </div>
                                </div>

                                <div>
                                    <button type={"button"} className={"border-2 bg-orange-200 hover:bg-orange-300"}>Expand</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="w-full text-center mt-4">No results found</p>
                )}
            </div>
        </>
    )
}


