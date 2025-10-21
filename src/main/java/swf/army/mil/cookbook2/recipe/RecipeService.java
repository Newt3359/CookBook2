package swf.army.mil.cookbook2.recipe;

import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RecipeService {

    private ArrayList<Recipe> recipes = new ArrayList<Recipe>();

    public Recipe saveRecipe(Recipe recipe){
        recipes.add(recipe);
        return recipe;
    }
}
