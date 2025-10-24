import {Navigation} from "../Components/Navigation.tsx";
import {AddRecipeForm} from "../Components/AddRecipeForm.tsx";


export function AddRecipe(){


    return(
        <>
            <Navigation/>
            <h1 className={"flex justify-center content-center text-2xl"}>Add Recipe</h1>
            <div className={"flex justify-center content-center"}>
                <div className={"flex justify-center content-center border-2 max-w-250 p-5"}>
                    <AddRecipeForm/>
                </div>
            </div>
        </>
    )
}