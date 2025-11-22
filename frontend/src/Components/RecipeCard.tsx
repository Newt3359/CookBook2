import {useEffect, useState} from "react";
import axios from "axios";
import type {Recipe} from "../Utils/Recipe.ts";
import {Star} from "lucide-react";
import {RatingComponent} from "./RatingComponent.tsx";





interface RecipeCardProps{
    searchResults: Recipe[];
}
export function RecipeCard({searchResults}:RecipeCardProps){

    const [data, setData] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
    const maxStars = 5;
    const [isEditing, setIsEditing] = useState(false);

    const MEAL_TYPE_OPTIONS: Recipe["mealTypes"] = ["Breakfast", "Lunch", "Dinner", "Dessert"];

    const handleFieldChange = (field: keyof Recipe, value: Recipe[keyof Recipe]) => {
        setSelectedRecipe((prev) => (prev ? { ...prev, [field]: value } : prev));
    };

    const handleDelete = (id : number) => {
        const recipeId = selectedRecipe?.id
        setData(prev => prev.filter(selectedRecipe => selectedRecipe?.id !== id))

           axios.delete(`http://localhost:8080/api/recipe/${recipeId}`)
               .then(response => {
                   console.log(response.status)
               })
               .catch(error => {
                   console.log(error)
               })
    }

    const handleCheckboxChange = (mealType: Recipe["mealTypes"][number]) => {
        setSelectedRecipe(prev =>
            prev
                ? {
                    ...prev,
                    mealTypes: prev.mealTypes.includes(mealType)
                        ? prev.mealTypes.filter(m => m !== mealType)
                        : [...prev.mealTypes, mealType],
                }
                : prev
        );
    };

    const handleMakeRecipe = async (id: number) => {
        try {
            // @ts-ignore
            const patchData = { timesMade: selectedRecipe.timesMade + 1};
            const response = await axios.patch(`http://localhost:8080/api/recipe/${id}`, patchData);
            setSelectedRecipe(response.data);
        } catch (error) {
            console.error("Error updating recipe:", error);
        }

    };

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
                                    <button type={"button"} className={"border-2 bg-orange-200 hover:bg-orange-300"} onClick={() => setSelectedRecipe(recipe)}>Expand</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="w-full text-center mt-4">No results found</p>
                )}
            </div>
            {selectedRecipe && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
                        <button
                            type="button"
                            className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
                            onClick={() => setSelectedRecipe(null)}
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold mb-3">{selectedRecipe.title}</h2>

                        <p className="text-gray-700 mb-2">
                            <strong>Meal Type:</strong> {selectedRecipe.mealTypes?.join(", ")}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Favorite:</strong> {selectedRecipe.favorite ? "Yes" : "No"}
                        </p>
                        <p className="text-gray-700 mb-4 whitespace-pre-line">
                            <strong>Ingredients:</strong> <br /> {selectedRecipe.ingredients}
                        </p>

                        <div className="flex items-center mb-3">
                            <span className="mr-2 font-semibold">Rating:</span>
                            {[...Array(maxStars)].map((_, index) => {
                                const currentRating = index + 1;
                                return (
                                    <Star
                                        key={index}
                                        size={24}
                                        fill={
                                            currentRating <= selectedRecipe.rating
                                                ? "#ffc107"
                                                : "#e4e5e9"
                                        }
                                        style={{ marginRight: "2px" }}
                                    />
                                );
                            })}
                        </div>

                            <p><strong>Times Made:</strong> {selectedRecipe.timesMade}</p>
                        <div className={'flex justify-center content-center'}>
                            <button type={"button"} className={"bg-orange-200 hover:bg-orange-300 border-2 m-1"} onClick={() => handleMakeRecipe(selectedRecipe?.id)}>Make Recipe</button>
                            <button type={"button"} className={"bg-orange-200 hover:bg-orange-300 border-2 m-1"} onClick={() => setIsEditing(true)}>Edit Recipe</button>
                            <button type={"button"} className={"bg-orange-200 hover:bg-orange-300 border-2 m-1"} onClick={() => handleDelete(selectedRecipe?.id)}>Delete Recipe</button>
                        </div>
                    </div>
                </div>
            )}
            {selectedRecipe && isEditing &&(
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
                        <button
                            type="button"
                            className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
                            onClick={() => setSelectedRecipe(null)}
                        >
                            ✕
                        </button>

                        {/*<h2 className="text-2xl font-bold mb-3">{selectedRecipe.title}</h2>*/}
                        <label className={"mr-1"}>Title:</label>
                        <input
                        value={selectedRecipe.title}
                        onChange={(e) => handleFieldChange("title", e.target.value)}
                        />

                        {/*<p className="text-gray-700 mb-2">*/}
                        {/*    <strong>Meal Type:</strong> {selectedRecipe.mealTypes?.join(", ")}*/}
                        {/*</p>*/}

                        <label className={"mr-1"}>Meal Type: </label>
                        <div className="inline-flex m-0.5 gap-1">
                            {MEAL_TYPE_OPTIONS.map((mealType) => (
                                <div key={mealType}>
                                    <label htmlFor={`checkbox-${mealType}`} className="mr-0.5">
                                        {mealType}:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${mealType}`}
                                        checked={selectedRecipe?.mealTypes.includes(mealType) ?? false}
                                        onChange={() => handleCheckboxChange(mealType)}
                                    />
                                </div>
                            ))}
                        </div>


                        <p className="text-gray-700 mb-2">
                            <strong>Favorite:</strong> {selectedRecipe.favorite ? "Yes" : "No"}
                        </p>
                        <p className="text-gray-700 mb-4 whitespace-pre-line">
                            <strong>Ingredients:</strong> <br /> {selectedRecipe.ingredients}
                        </p>

                        <div className="flex items-center mb-3">
                            <RatingComponent rating={selectedRecipe.rating} setRating={(value) => handleFieldChange("rating", value)}/>
                        </div>

                        <p><strong>Times Made:</strong> {selectedRecipe.timesMade}</p>
                        <div className={'flex justify-center content-center'}>
                            <button type={"button"} className={"bg-orange-200 hover:bg-orange-300 border-2 m-1"} onClick={() => setIsEditing(false)}>Cancel</button>
                            <button type={"button"} className={"bg-orange-200 hover:bg-orange-300 border-2 m-1"}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


