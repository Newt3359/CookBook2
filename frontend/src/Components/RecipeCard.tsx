import {useEffect, useState} from "react";
import {MealTypes, type Recipe} from "../types/Recipe.ts";
import {Star} from "lucide-react";
import {RatingComponent} from "./RatingComponent.tsx";
import {deleteRecipeCall, getAllRecipesCall, updateRecipe} from "../clients/RecipeClient.ts";
import {getImagesByRecipeId} from "../clients/ImageClient.ts";
import type {RecipeImage} from "../types/RecipeImage.ts";


interface RecipeCardProps {
    searchResults: Recipe[];
}

export function RecipeCard({searchResults}: RecipeCardProps) {

    const [data, setData] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
    const maxStars = 5;
    const [isEditing, setIsEditing] = useState(false);
    type MealOption = (typeof MealTypes)[number];

    const handleFieldChange = async (field: keyof Recipe, value: Recipe[keyof Recipe]) => {
        setSelectedRecipe((prev) => (prev ? {...prev, [field]: value} : prev));
    };

    const handleUpdate = async (recipe:Recipe) => {
        await updateRecipe(recipe)
        setSelectedRecipe(null)
    }

    const handleDelete = async (id: number | undefined) => {
        setData(prev => prev.filter(selectedRecipe => selectedRecipe?.id !== id))
        await deleteRecipeCall(selectedRecipe?.id)
    }


    const handleCheckboxChange = (meal: MealOption) => {
        setSelectedRecipe(prev =>
            prev
                ? {
                    ...prev,
                    mealTypes: prev.mealTypes.some(
                        mt => mt.mealType === meal.name
                    )
                        ? prev.mealTypes.filter(
                            mt => mt.mealType !== meal.name
                        )
                        : [
                            ...prev.mealTypes,
                            {
                                mealId: meal.id,
                                mealType: meal.name,
                            },
                        ],
                }
                : prev
        );
    };

    const handleExpand = async (recipe: Recipe) => {
        const images = await getImagesByRecipeId(recipe.id);

        setSelectedRecipe({
            ...recipe,
            images,
        });
    };

    useEffect(() => {

    }, [selectedRecipe]);

    useEffect(() => {
        if (searchResults.length === 0) {
            const load = async () => {
                const results = await getAllRecipesCall();
                setData(results);
            };
            load();
        }
    }, [searchResults]);

    const recipesToShow = searchResults.length > 0 ? searchResults : data;

    if (!Array.isArray(recipesToShow)) {
        console.log("recipesToShow is not an array:", recipesToShow);
        return <p>Error: expected array</p>;
    }
    console.log(recipesToShow)

    return (
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
                                        Meal
                                        Type: {recipe.mealTypes.map(m => m.mealType).join(", ")}                                    </p>
                                </div>
                                <div className={"flex"}>
                                    <p>
                                        Favorite: <span
                                        className="font-semibold">{recipe.favorite ? "Yes" : "No"}</span>
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
                                                    style={{marginRight: '2px'}}
                                                />

                                            );
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <button type={"button"} className={"border-2 bg-orange-200 hover:bg-orange-300"}
                                            onClick={() => handleExpand(recipe)}>Expand
                                    </button>
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

                        {selectedRecipe?.images && selectedRecipe.images.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto mb-4">
                                {selectedRecipe.images
                                    .filter((img): img is RecipeImage => !!img.url) // remove any image without a url
                                    .map((img) => (
                                        <img
                                            key={img.id ?? Math.random()} // fallback key if id is missing
                                            src={`http://localhost:8080${img.url}`}
                                            alt={selectedRecipe.title}
                                            className="w-52 h-52 object-cover rounded-md"
                                            onError={(e) =>
                                                console.error("Image failed to load:", e.currentTarget.src)
                                            }
                                        />
                                    ))}
                            </div>
                        )}

                        <h2 className="text-2xl font-bold mb-3">{selectedRecipe.title}</h2>

                        <p className="text-gray-700 mb-2">
                            {Array.isArray(selectedRecipe.mealTypes)
                                ? selectedRecipe.mealTypes.map(m => m.mealType).join(", ")
                                : ""}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Favorite:</strong> {selectedRecipe.favorite ? "Yes" : "No"}
                        </p>
                        <p className="text-gray-700 mb-4 whitespace-pre-line">
                            <strong>Ingredients:</strong> <br/> {selectedRecipe.ingredients}
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
                                        style={{marginRight: "2px"}}
                                    />
                                );
                            })}
                        </div>

                        <div className={'flex justify-center content-center'}>
                            <button type={"button"} className={"bg-orange-200 hover:bg-orange-300 border-2 m-1"}
                                    onClick={() => setIsEditing(true)}>Edit Recipe
                            </button>
                            <button type={"button"} className={"bg-orange-200 hover:bg-orange-300 border-2 m-1"}
                                    onClick={() => handleDelete(selectedRecipe?.id)}>Delete Recipe
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {selectedRecipe && isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
                        {/* Close button */}
                        <button
                            type="button"
                            className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
                            onClick={() => setSelectedRecipe(null)}
                        >
                            ✕
                        </button>

                        {/* Title */}
                        <label className="mr-1 block">Title:</label>
                        <input
                            value={selectedRecipe.title}
                            onChange={(e) => handleFieldChange("title", e.target.value)}
                            className="border p-1 rounded w-full mb-3"
                        />

                        {/* Meal Types */}
                        <label className="mr-1 block">Meal Type:</label>
                        <div className="inline-flex flex-wrap gap-2 mb-3">
                            {MealTypes.map((meal) => (
                                <label key={meal.id} className="inline-flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        checked={selectedRecipe.mealTypes.some(
                                            (mt) => mt.mealType === meal.name
                                        )}
                                        onChange={() => handleCheckboxChange(meal)}
                                        className="w-4 h-4"
                                    />
                                    {meal.name}
                                </label>
                            ))}
                        </div>

                        <div>
                            {/* Favorite */}
                            <label className="inline-flex items-center gap-2 mb-3">
                                <input
                                    type="checkbox"
                                    checked={selectedRecipe.favorite}
                                    onChange={(e) =>
                                        handleFieldChange("favorite", e.target.checked)
                                    }
                                    className="w-4 h-4"
                                />
                                Favorite
                            </label>
                        </div>

                        <div>
                            {/* Ingredients */}
                            <label className="block mb-1">Ingredients:</label>
                            <textarea
                                value={selectedRecipe.ingredients}
                                onChange={(e) =>
                                    handleFieldChange("ingredients", e.target.value)
                                }
                                rows={4}
                                className="border p-2 rounded w-full mb-3"
                            />
                        </div>

                        {/* Rating */}
                        <div className="flex items-center mb-3">
                            <RatingComponent
                                rating={selectedRecipe.rating}
                                setRating={(value) => handleFieldChange("rating", value)}
                            />
                        </div>
                        <div className={'flex justify-center content-center'}>
                            <button type={"button"} className={"bg-orange-200 hover:bg-orange-300 border-2 m-1"}
                                    onClick={() => setIsEditing(false)}>Cancel
                            </button>
                            <button type={"button"} className={"bg-orange-200 hover:bg-orange-300 border-2 m-1"} onClick={() => handleUpdate(selectedRecipe)}>Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


