package swf.army.mil.cookbook2.recipe;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Set;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

    private ArrayList<Recipe> recipes = new ArrayList<Recipe>();
    Recipe test = new Recipe("Taco", "Tortillas and meat", Set.of(MealType.Lunch, MealType.Dinner), true);
    Recipe test2 = new Recipe("Soup", "Chicken Noodle", Set.of(MealType.Lunch, MealType.Dinner), false);

    private final RecipeService recipeService;

public RecipeController(RecipeService recipeService){
    this.recipeService = recipeService;
}

@PostMapping
public Recipe saveRecipe(@RequestBody Recipe recipe){
    test.setId(1L);
    return test;
}

@GetMapping
public ArrayList<Recipe> getAll (){
    recipes.add(test);
    recipes.add(test2);
    return recipes;
}

@GetMapping("/{id}")
public Recipe getByID(@PathVariable Long id){
    test.setId(1L);
    return test;
}

}
