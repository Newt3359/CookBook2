import {Navigation} from "../Components/Navigation.tsx";
import {AddRecipeForm} from "../Components/AddRecipeForm.tsx";


export function AddRecipe(){


    return(
        <>
            <Navigation/>
            <h1>Add</h1>
            <AddRecipeForm/>
        </>
    )
}