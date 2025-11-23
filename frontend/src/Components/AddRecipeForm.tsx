import {useState} from "react";
import axios from "axios";
import * as React from "react";
import {RatingComponent} from "./RatingComponent.tsx";
import {checkNewRecipeSubmission} from "../Utils/FormChecker.ts";
import {createRecipeCall} from "../Utils/Client.ts";




export function AddRecipeForm(){

    const [title, setTitle] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [directions, setDirections] = useState("")
    const [mealType, setMealType] = useState([
        {id: 1, name: "Breakfast", isChecked: false},
        {id: 2, name: "Lunch", isChecked: false},
        {id: 3, name: "Dinner", isChecked: false},
        {id: 4, name: "Dessert", isChecked: false}
    ])
    const [rating, setRating] = useState(0)
    const [favorite, setFavorite] = useState(false)


    const handleOptionChange = () => {
        setFavorite(!favorite)
    }

    const handleCheckboxChange = (id: number) => {
        setMealType(prevMealType =>
            prevMealType.map(mealType =>
                mealType.id === id ? {...mealType, isChecked: !mealType.isChecked} : mealType))
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const recipeData ={
            // id:0,
            title: title,
            ingredients: ingredients,
            directions: directions,
            mealTypes: mealType
                .filter(m => m.isChecked)
                .map(m => m.name),
            rating: rating,
            lastChange: Date.now(),
            favorite: favorite
        };

        checkNewRecipeSubmission(recipeData)

        const submission = await createRecipeCall(recipeData)
        if (submission.value === 200) {
            handleReset()
        }
    }

    const handleReset = () => {
        setTitle("")
        setIngredients("")
        setDirections("")
        setMealType([
            {id: 1, name: "Breakfast", isChecked: false},
            {id: 2, name: "Lunch", isChecked: false},
            {id: 3, name: "Dinner", isChecked: false},
            {id: 4, name: "Dessert", isChecked: false}
        ])
        setRating(0)
    }


    return(

        <>
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className={"mt-1"}>
                <label htmlFor={"title"}>Title:</label>
                <div>
                    <input
                        className={"placeholder:text-gray-400 placeholder:font-light border-1 ml-1"}
                        id={"title"}
                        type={"text"}
                        name={"title"}
                        placeholder={"taco"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
            </div>

            <div className={"mt-1"}>
                <label htmlFor={"ingredients"}>Ingredients:</label>
                <div>
                    <textarea
                    className={"placeholder:text-gray-400 placeholder:font-light border-1 ml-1 w-full h-32"}
                    id={"ingredients"}
                    name={"ingredients"}
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <label htmlFor={"directions"}>Directions:</label>
                <div>
                    <textarea
                    className={"placeholder:text-gray-400 placeholder:font-light border-1 ml-1 w-full h-32"}
                    id={"directions"}
                    name={"directions"}
                    value={directions}
                    onChange={(e) => setDirections(e.target.value)}
                    />
                </div>
            </div>

            <div className={"border-2 w-70 mt-3 ml-0.5"}>
                <h5>Meal Type:</h5>
                <div className={"inline-flex m-0.5 gap-1"}>
                    {mealType.map(mealType => (
                        <div key={mealType.id}>
                            <label htmlFor={`checkbox-${mealType.id}`} className={"mr-0.5"}>{mealType.name}:</label>
                            <input
                                type="checkbox"
                                id={`checkbox-${mealType.id}`}
                                checked={mealType.isChecked}
                                onChange={() => handleCheckboxChange(mealType.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <RatingComponent rating={rating} setRating={setRating}/>
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
                                        value="true"
                                        checked={favorite}
                                        onChange={handleOptionChange}
                                    />
                                </label>
                            </div>

                            <div>
                                <label>No:
                                    <input
                                        type="radio"
                                        name="favorite"
                                        value="false"
                                        checked={!favorite}
                                        onChange={handleOptionChange}
                                    />
                                </label>
                            </div>
                        </div>

                </fieldset>
            </div>

            <div className={'flex justify-center content-center'}>
                <button type={"submit"} className={"bg-orange-200 border-2 shadow-md hover:bg-orange-300 m-2 pl-0.5 pr-0.5"}>Submit</button>
                <button type="reset" className={"bg-orange-200 border-2 shadow-md hover:bg-orange-300 m-2 pl-0.5 pr-0.5"}>Reset</button>
            </div>
        </form>
        </>
    )
}