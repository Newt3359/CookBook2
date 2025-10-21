package swf.army.mil.cookbook2.recipe;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
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

    public List<Recipe> getAll(){
        return recipeRepository.findAll();
    }

    public Recipe getRecipeById(Long id){
        return recipeRepository.findById(id).orElse(null);
    }

    public Recipe updateById(Long id, Recipe recipe){
        Recipe existingRecipe = recipeRepository.findById(id).orElse(null);
        if (existingRecipe == null){
            System.out.println("Recipe not found");
        }
        recipe.setId(id);
        return recipeRepository.save(recipe);
    }

    public Recipe partialUpdate(Long id, Recipe recipe){
        return recipeRepository.findById(id)
                .map(existingRecipe -> {

                    if (recipe.getTitle() != null){
                        existingRecipe.setTitle(recipe.getTitle());
                    }

                    if (recipe.getIngredients() != null){
                        existingRecipe.setIngredients(recipe.getIngredients());
                    }

                    if (recipe.getMealTypes() != null){
                        existingRecipe.setMealTypes(recipe.getMealTypes());
                    }

                    if (recipe.getRating() != null){
                        existingRecipe.setRating(recipe.getRating());
                    }

                    if (recipe.getTimesMade() != null){
                        existingRecipe.setTimesMade(recipe.getTimesMade());
                    }

                    if (recipe.getLastChange() != null){
                        existingRecipe.setLastChange(recipe.getLastChange());
                    }

                    return recipeRepository.save(existingRecipe);
                })
                .orElseThrow(() -> new RuntimeException("Not found"));
    }

    public void deleteRecipe(Long id){

    }
}
