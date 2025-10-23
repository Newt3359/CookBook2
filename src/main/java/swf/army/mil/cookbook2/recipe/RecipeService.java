package swf.army.mil.cookbook2.recipe;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

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

    public List<Recipe> getNumberOfRandom(int count) {
        long totalEntries = recipeRepository.count();

        if (count <= 0 || totalEntries == 0) {
            return Collections.emptyList();
        }

        if (totalEntries <= count) {
            return recipeRepository.findAll();
        }

        List<Long> allIds = new ArrayList<>(
                recipeRepository.findAll()
                        .stream()
                        .map(Recipe::getId)
                        .toList()
        );

        Collections.shuffle(allIds);

        List<Long> selectedIds = new ArrayList<>(allIds.subList(0, count));

        return recipeRepository.findAllById(selectedIds);
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
        if (!recipeRepository.existsById(id)){
            System.out.println("not found");
        }
        recipeRepository.deleteById(id);
    }

    public List<Recipe> searchRecipeByTitleKeyword(String query){
        return recipeRepository.findDistinctByTitleContainingIgnoreCase(query);
    }

    public List<Recipe> searchRecipeByIngredientsKeyword(String query){
        return recipeRepository.findDistinctByIngredientsContainingIgnoreCase(query);
    }
}
