package swf.army.mil.cookbook2.recipe;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Set;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository){
        this.recipeRepository = recipeRepository;
    }

    private ArrayList<Recipe> recipes = new ArrayList<Recipe>();
    Instant time = LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant();
    Recipe test = new Recipe("Taco", "Tortillas and meat", Set.of(MealType.Lunch, MealType.Dinner), 4.5, 10, time, true);
    Recipe test2 = new Recipe("Soup", "Chicken Noodle", Set.of(MealType.Lunch, MealType.Dinner), 3.2, 2, time, false);


    public Recipe saveRecipe(Recipe recipe){
        return recipeRepository.save(recipe);
    }

    public ArrayList<Recipe> getAll(){
        return recipes;
    }

    public Recipe getRecipeById(){
        return test;
    }

    public void deleteRecipe(Long id){

    }
}
