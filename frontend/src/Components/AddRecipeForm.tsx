import {useState} from "react";
import axios from "axios";



export function AddRecipeForm(){

    const [title, setTitle] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [mealType, setMealType] = useState([])
    const [rating, setRating] = useState(0)
    const [favorite, setFavorite] = useState(false)

    const handleOptionChange = (event) => {
        setFavorite(event.target.value === 'true')
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const recipeData ={
            title: title,
            ingredients: ingredients,
            mealType: mealType,
            rating: rating,
            timesMade: 0,
            lastChange: Date.now(),
            favorite: favorite
        };

        try {
            const response = await axios.post('http://localhost:8080/api/recipe', recipeData)
            console.log("New recipe sent", response.data);
            if (response.status === 201){
                console.log("success")
                event.target.reset()
            }
        }catch (error){
            console.log("Failed to send", error)
        }
    }


    return(

        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor={"title"}>Title:
            <input
                id={"title"}
                type={"text"}
                name={"title"}
                placeholder={"taco"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </label>

            <label htmlFor={"ingredients"}>Ingredients:
                <input
                id={"ingredients"}
                type="textarea"
                name={"ingredients"}
                placeholder={"tortilla, meat, cheese"}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                />
            </label>
        </form>
        </>
    )
}