import axios from "axios";
import {createRecipeCall, deleteRecipeCall} from "../RecipeClient.ts";
import {sampleRecipe} from "../../types/Recipe.ts";
import {expect} from "vitest";


const BASEURL = "/api/recipe"

describe('Should create recipe', () => {

    it('should call axios with post method', async () => {

        const axiosSpy = vi.spyOn(axios, "post")
            .mockResolvedValueOnce({data: []});

        await createRecipeCall(
            sampleRecipe
        )
        expect(axiosSpy).toHaveBeenCalledWith(`${BASEURL}`, expect.any((Object)))
    });
});

describe('should delete recipe', () => {

    it('should call axios with delete method', async () => {
        const axiosSpy = vi.spyOn(axios, "delete")
            .mockResolvedValueOnce({data: []});

        await deleteRecipeCall(
            sampleRecipe.id
        )
        expect(axiosSpy).toHaveBeenCalledWith(`${BASEURL}/${sampleRecipe.id}`)
    });
});