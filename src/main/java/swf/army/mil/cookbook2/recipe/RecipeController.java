package swf.army.mil.cookbook2.recipe;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

    private ArrayList<Recipe> recipes = new ArrayList<Recipe>();
    Recipe test = new Recipe("Taco", "Tortillas and meat", true);
    Recipe test2 = new Recipe("Soup", "Chicken Noodle", false);

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

}
