package swf.army.mil.cookbook2.recipe;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class RecipeServiceTest {

    @Mock
    RecipeRepository recipeRepository;

    @InjectMocks
    RecipeService recipeService;

    private ArrayList<Recipe> recipes = new ArrayList<Recipe>();
    Recipe test = new Recipe("Taco", "Tortillas and meat", Set.of(MealType.Lunch, MealType.Dinner), true);
    Recipe test2 = new Recipe("Soup", "Chicken Noodle", Set.of(MealType.Lunch, MealType.Dinner), false);

    @Test
    void shouldSaveAircraft(){
        when(recipeRepository.save(test)).thenReturn(test);

        Recipe acutalRecipe = recipeService.saveRecipe(test);

        verify(recipeRepository, times(1)).save(any(Recipe.class));
        assertThat(acutalRecipe).isEqualTo(test);
    }
}