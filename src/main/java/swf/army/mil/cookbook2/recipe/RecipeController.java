package swf.army.mil.cookbook2.recipe;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

    private ArrayList<Recipe> recipes = new ArrayList<Recipe>();
    Recipe test = new Recipe(1L, "Taco", "Tortillas and meat", true);

private final RecipeService recipeService;

public RecipeController(RecipeService recipeService){
    this.recipeService = recipeService;
}

@PostMapping
public Recipe saveRecipe(@RequestBody Recipe recipe){
    return test;
}

}
