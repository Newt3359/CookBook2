package swf.army.mil.cookbook2.recipe;

import java.util.ArrayList;

public class RecipeService {

    private ArrayList<Recipe> recipes = new ArrayList<Recipe>();

    public Recipe saveRecipe(Recipe recipe){
        recipes.add(recipe);
        return recipe;
    }
}
