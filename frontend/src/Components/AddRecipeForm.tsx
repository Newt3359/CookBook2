import * as React from "react";
import {useEffect} from "react";
import {createRecipeCall} from "../clients/RecipeClient.ts";
import {ImageUpload} from "./ImageUpload.tsx";
import {useRecipe} from "../providers/RecipeProvider.tsx"
import {MealTypes, type Recipe} from "../types/Recipe.ts";
import {uploadImage} from "../clients/ImageClient.ts";

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
                id:0,
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

            if (selectedFile){
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("recipeId", createdRecipe.id.toString());

                await uploadImage(formData)
            }
            setRecipe(createdRecipe)
            alert("recipe created successfully");
            if (onSave) onSave();
        }catch (err : any){
            console.error("error creating recipe", err);
            alert("failed to save recipe")
        }

        setRecipe({
            id:0,
            title: "",
            ingredients: "",
            directions: "",
            mealTypes: [],
            rating: 0,
            favorite: false
        })
    }

    const handleMealTypes = (mealLabel: string) => {
        const mealObject = MealTypes.find
        ((m) => m.name === mealLabel);
        if (!mealObject) return;

        const alreadySelected = recipe.mealTypes.some(
            (m) => m.name === mealLabel)

        const updatedMealTypes = alreadySelected
        ? recipe.mealTypes.filter((m) => m.name !== mealLabel)
        :[...recipe.mealTypes, mealObject];

        setRecipe({...recipe, mealTypes: updatedMealTypes})
    }

    const handleOptionChange = () => {

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
                    {MealTypes.map((meal) => <label key={meal.id}>
                        <input
                        type={"checkbox"}
                        checked={recipe.mealTypes.some
                        ((m) => m.id === meal.id)}
                        onChange={() => handleMealTypes(meal.name)}
                        className={"m-1"}
                        />
                        {meal.name}
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
                                        onChange={handleOptionChange}
                                    />
                                </label>
                            </div>

                            <div>
                                <label>No:
                                    <input
                                        type="radio"
                                        name="favorite"
                                        checked={!recipe.favorite}
                                        onChange={handleOptionChange}
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

                {/*{recipeToEdit != null && (*/}
                {/*    <button*/}
                {/*    type={"button"}*/}
                {/*    onClick={handleEditRecipe}*/}
                {/*    >*/}
                {/*    </button>*/}
                {/*)}*/}

            </div>
        </form>
        </div>
        </>
    )
}
