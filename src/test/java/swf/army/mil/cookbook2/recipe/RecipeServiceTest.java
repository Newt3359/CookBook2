package swf.army.mil.cookbook2.recipe;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class RecipeServiceTest {

    @Mock
    RecipeRepository recipeRepository;

    @InjectMocks
    RecipeService recipeService;

    private List<Recipe> recipes = new ArrayList<Recipe>();
    Instant time = LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant();
    Recipe test = new Recipe("Taco", "Tortillas and meat", Set.of(MealType.Lunch, MealType.Dinner), 4.5, 10, time, true);
    Recipe test2 = new Recipe("Soup", "Chicken Noodle", Set.of(MealType.Lunch, MealType.Dinner), 3.2, 2, time, false);

    @Test
    void shouldSaveAircraft(){
        when(recipeRepository.save(test)).thenReturn(test);

        Recipe acutalRecipe = recipeService.saveRecipe(test);

        verify(recipeRepository, times(1)).save(any(Recipe.class));
        assertThat(acutalRecipe).isEqualTo(test);
    }

    @Test
    void shouldGetAllRecipes(){
        when(recipeRepository.findAll()).thenReturn(recipes);

        List<Recipe> recipeList = recipeService.getAll();

        verify(recipeRepository, times(1)).findAll();
        assertThat(recipeList).isEqualTo(recipes);
    }

    @Test
    void shouldGetRecipeById(){
        when(recipeRepository.findById(1L)).thenReturn(Optional.of(test));

        Recipe singleRecipe = recipeService.getRecipeById(1L);
        assertThat(singleRecipe).isEqualTo(test);
    }

    @Test
    void shouldUpdateAircraftById(){
        when(recipeRepository.save(test)).thenReturn(test);

        Recipe updatedRecipe = recipeService.updateById(1L,test);
        assertThat(updatedRecipe).isEqualTo(test);
    }
}