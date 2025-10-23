import {useState} from "react";
import axios from "axios";
import * as React from "react";
import {RatingComponent} from "./RatingComponent.tsx";




export function AddRecipeForm(){

    const [title, setTitle] = useState("")
    const [ingredients, setIngredients] = useState("")
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
            title: title,
            ingredients: ingredients,
            mealTypes: mealType
                .filter(m => m.isChecked)
                .map(m => m.name),
            rating: rating,
            timesMade: 0,
            lastChange: Date.now(),
            favorite: favorite
        };

        const atLeastOneSelected = mealType.some(m => m.isChecked);

        if (!atLeastOneSelected) {
            alert("Please select at least one meal type.");
            return;
        }

        if (rating === 0){
            alert("At least 1 Star is required")
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/recipe', recipeData)
            console.log("New recipe sent", response.data);
            console.log(response.status)
            if (response.status === 200){
                console.log("success")
                handleReset()
            }
        }catch (error){
            console.log("Failed to send", error)
        }
    }

    const handleReset = () => {
        setTitle("")
        setIngredients("")
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
                    className={"placeholder:text-gray-400 placeholder:font-light border-1 ml-1 w-100 h-50"}
                    id={"ingredients"}
                    name={"ingredients"}
                    // placeholder={"tortilla, meat, cheese"}
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
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

            <div>
                <button type={"submit"} className={"bg-orange-200 border-2 shadow-md ml-2 mr-2 mt-2 hover:bg-orange-300"}>Submit</button>
                <button type="reset" className={"bg-orange-200 border-2 shadow-md hover:bg-orange-300"}>Reset</button>
            </div>
        </form>
        </>
    )
}