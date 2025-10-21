package swf.army.mil.cookbook2.recipe;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

private final RecipeService recipeService;

public RecipeController(RecipeService recipeService){
    this.recipeService = recipeService;
}


}
