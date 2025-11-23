import type {Recipe} from "./Recipe.ts";

export const createRecipeCall = async (recipe) => {
    try{
        const response = await axios.post(`http://localhost:8080/api/recipe`, recipe)
        console.log("New recipe sent", response.data);
        console.log(response.status)
        if (response.status === 200){
            console.log("success")
            return response.status;
        }
    }catch (error){
        console.log("Failed to send", error)
        alert("See console for details")
    }
}

export const deleteRecipeCall = async (id) => {
    axios.delete(`http://localhost:8080/api/recipe/${id}`)
        .then(response => {
            console.log(response.status)
        })
        .catch(error => {
            console.log(error)
        })
}

export const getAllRecipesCall = async ()  => {
        try {
            const response = await axios.get('http://localhost:8080/api/recipe/random');
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
}