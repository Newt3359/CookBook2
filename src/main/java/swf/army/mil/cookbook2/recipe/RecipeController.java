package swf.army.mil.cookbook2.recipe;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

//    private ArrayList<Recipe> recipes = new ArrayList<Recipe>();
//    Instant time = LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant();
//    Recipe test = new Recipe("Taco", "Tortillas and meat", Set.of(MealType.Lunch, MealType.Dinner), 4.5, 10, time, true);
//    Recipe test2 = new Recipe("Soup", "Chicken Noodle", Set.of(MealType.Lunch, MealType.Dinner), 3.2, 2, time, false);


    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService){
        this.recipeService = recipeService;
    }

    @PostMapping
    public Recipe saveRecipe(@RequestBody Recipe recipe){

        return recipeService.saveRecipe(recipe);
    }

    @GetMapping
    public List<Recipe> getAll (){
        return recipeService.getAll();
    }

    @GetMapping("/{id}")
    public Recipe getByID(@PathVariable Long id){
        return recipeService.getRecipeById(id);
    }

    @PutMapping("/{id}")
    public Recipe UpdateById(@PathVariable Long id, @RequestBody Recipe recipe){
       return recipeService.updateById(id,recipe);
    }

    @PatchMapping("/{id}")
    public Recipe partialUpdate (@PathVariable Long id, @RequestBody Recipe recipe){
        return recipeService.partialUpdate(id,recipe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id){
        recipeService.deleteRecipe(id);
        return ResponseEntity.noContent().build();
    }

}
