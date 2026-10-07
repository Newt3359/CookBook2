import * as React from "react";
import {useEffect} from "react";
import {createRecipeCall} from "../clients/RecipeClient.ts";
import {ImageUpload} from "./ImageUpload.tsx";
import {useRecipe} from "../providers/RecipeProvider.tsx"
import {MealTypes, type Recipe} from "../types/Recipe.ts";
import {uploadImage} from "../clients/ImageClient.ts";
import type {RecipeMeal} from "../types/RecipeMeal.ts";

interface AddRecipeFormProps{
    handleNewRecipe: () => void;
    recipeToEdit?: Recipe | null;
    onSave?: () => void;
}


export const AddRecipeForm = ({handleNewRecipe, recipeToEdit, onSave}: AddRecipeFormProps) => {

    const {recipe, setRecipe} = useRecipe();
    const [selectedFile, setSelectedFile] = React.useState<File>();
    const [previewImage, setPreviewImage] = React.useState<string>();

    useEffect(() => {
        if (recipeToEdit){
            setRecipe(recipeToEdit)
        }else {
            setRecipe({
                title: "",
                ingredients: "",
                directions: "",
                mealTypes: [],
                rating: 0,
                favorite: false
            })
        }
    }, [recipeToEdit])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const payload ={
            ...recipe
        }
        console.log(payload)

        try {
            const createdRecipe = await createRecipeCall(payload)
            const newRecipeId = createdRecipe.id;
            console.log(selectedFile)
            if (selectedFile){
                const formData = new FormData();
                formData.append("file", selectedFile);
                await uploadImage(newRecipeId,formData)
            }
            alert("recipe created successfully");
            if (onSave) onSave();

        }catch (err : any){
            console.error("error creating recipe", err);
            alert("failed to save recipe")
        }

    }

    const handleMealTypes = (mealOfTheDay: RecipeMeal) => {
        const alreadySelected = recipe.mealTypes.some(
            m => m.mealId === mealOfTheDay.mealId);

        const updatedMealTypes = alreadySelected
        ? recipe.mealTypes.filter((m) => m !== mealOfTheDay)
        :[...recipe.mealTypes, mealOfTheDay];

        if(updatedMealTypes.length === 0) return;

        setRecipe({...recipe, mealTypes: updatedMealTypes})
    }

    const handleOptionChange = (favorite:boolean) => {
        setRecipe({
            ...recipe,
            favorite: favorite,
        });
    }

    return(

        <>
            <div className="bg-white flex justify-center content-center border-2 shadow-md z-50 items-center fixed">
            <form onSubmit={handleSubmit}>
            <div>
                <ImageUpload
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    previewImage={previewImage}
                    setPreviewImage={setPreviewImage}
                />
            </div>

            <div className={"mt-3"}>
                <label className="m-1">
                    Title:
                    <input
                        className="placeholder:text-gray-400 placeholder:font-light border-1 ml-0.5"
                        type="text"
                        value={recipe.title}
                        onChange={(e) =>
                            setRecipe({ ...recipe, title: e.target.value })
                        }
                    />
                </label>
            </div>


            <div className={"mt-3"}>
                <label className="m-1">
                    Ingredients:
                    <textarea
                        className="placeholder:text-gray-400 placeholder:font-light border-1 ml-0.5"
                        value={recipe.ingredients}
                        onChange={(e) =>
                            setRecipe({ ...recipe, ingredients: e.target.value })
                        }
                    />
                </label>
            </div>

            <div className={"mt-3"}>
                <label className="m-1">
                    Directions:
                    <textarea
                    className="placeholder:text-gray-400 placeholder:font-light border-1 ml-0.5"
                    value={recipe.directions}
                    onChange={(e) =>
                        setRecipe({...recipe, directions: e.target.value})
                    }
                    />
                </label>
            </div>

            <div>
                <label>
                    Meal Type:
                    {MealTypes.map((m) => <label key={m.id}>
                        <input
                        type={"checkbox"}
                        checked={recipe.mealTypes.some(mt => mt.mealId == m.id)}
                        onChange={() => handleMealTypes({mealId: m.id, mealType: m.name})}
                        className={"m-1"}
                        />
                        {m.name}
                    </label>)}
                </label>
            </div>
        <div>


        <div>
            <label>
                Rating:
                <input
                    className="border-1 m-0.5"
                    value={recipe.rating}
                    onChange={(e) =>
                        setRecipe({
                            ...recipe,
                            rating: Number(e.target.value),
                        })
                    }
                    type="number"
                    min={0}
                    max={5}
                    step={0.01}
                />
            </label>
        </div>

        </div>
            <div>
                <fieldset className={"inline-flex"}>
                    <h5 className={"mr-0.5 ml-0.5"}>Favorite:</h5>
                        <div className={"inline-flex ml-1"}>
                            <div>
                                <label className={"mr-2"}>Yes:
                                    <input
                                        type="radio"
                                        name="favorite"
                                        checked={recipe.favorite}
                                        onChange={() => handleOptionChange(true)}
                                    />
                                </label>
                            </div>

                            <div>
                                <label>No:
                                    <input
                                        type="radio"
                                        name="favorite"
                                        checked={!recipe.favorite}
                                        onChange={() => handleOptionChange(false)}
                                    />
                                </label>
                            </div>
                        </div>

                </fieldset>
            </div>

            <div className={'flex justify-center content-center'}>
                <button
                type={"button"}
                onClick={handleNewRecipe}
                >
                Close
                </button>

                {recipeToEdit == null && (
                <button
                className={"bg-orange-200 border-2 shadow-md hover:bg-orange-300 m-2 pl-0.5 pr-0.5"}
                type={"submit"}
                >
                Submit
                </button>
                )}
            </div>
        </form>
        </div>
        </>
    )
}
