package swf.army.mil.cookbook2.recipe;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Set;

@Service
public class RecipeService {

    Recipe test = new Recipe("Taco", "Tortillas and meat", Set.of(MealType.Lunch, MealType.Dinner), true);
    Recipe test2 = new Recipe("Soup", "Chicken Noodle", Set.of(MealType.Lunch, MealType.Dinner), false);

    private ArrayList<Recipe> recipes = new ArrayList<Recipe>();

    public Recipe saveRecipe(Recipe recipe){
        recipes.add(recipe);
        return recipe;
    }

    public ArrayList<Recipe> getAll(){
        return recipes;
    }

    public Recipe getRecipeById(){
        return test;
    }
}
