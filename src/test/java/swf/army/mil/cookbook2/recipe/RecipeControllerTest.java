package swf.army.mil.cookbook2.recipe;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Set;

import static org.hamcrest.Matchers.hasItems;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RecipeController.class)
@AutoConfigureMockMvc
class RecipeControllerTest {


    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private RecipeService recipeService;

    @Autowired
    private ObjectMapper mapper;

    private ArrayList<Recipe> recipes = new ArrayList<Recipe>();
    Instant time = LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant();
    Recipe test = new Recipe("Taco", "Tortillas and meat", Set.of(MealType.Lunch, MealType.Dinner), 4.5, 10, time, true);
    Recipe test2 = new Recipe("Soup", "Chicken Noodle", Set.of(MealType.Lunch, MealType.Dinner), 3.2, 2, time, false);

    @BeforeEach
    void setup(){
        test.setId(1L);
        test2.setId(2L);
    }



    @Test
    public void shouldSaveRecipe()throws Exception{
        when(recipeService.saveRecipe(any(Recipe.class))).thenReturn(test);
        String testJson = mapper.writeValueAsString(test);
        mvc.perform(MockMvcRequestBuilders
                .post("/api/recipe")
                .contentType(MediaType.APPLICATION_JSON)
                .content(testJson))
                .andExpect(status().is2xxSuccessful())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.title").value("Taco"))
                .andExpect(jsonPath("$.ingredients").value("Tortillas and meat"))
                .andExpect(jsonPath("$.mealTypes", hasItems("Lunch", "Dinner")))
                .andExpect(jsonPath("$.rating").value(4.5))
                .andExpect(jsonPath("$.timesMade"). value(10))
//                .andExpect(jsonPath("$.lastChange").value(time))
                .andExpect(jsonPath("$.favorite").value(true));
        Mockito.verify(recipeService).saveRecipe(any(Recipe.class));
    }

    @Test
    public void shouldReturnAllRecipes()throws Exception{
        recipes.add(test);
        recipes.add(test2);
        String testJson = mapper.writeValueAsString(recipes);
        when(recipeService.getAll()).thenReturn(recipes);
        mvc.perform(MockMvcRequestBuilders
                .get("/api/recipe"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.*").isArray());
        Mockito.verify(recipeService).getAll();
    }

    @Test
    public void shouldGetRecipeById() throws Exception{
        test.setId(1L);
        when(recipeService.getRecipeById(1L)).thenReturn(test);
        mvc.perform(MockMvcRequestBuilders
                .get("/api/recipe/single/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.mealTypes", hasItems("Lunch", "Dinner")));
        Mockito.verify(recipeService).getRecipeById(1L);
    }


    @Test
    void shouldUpdateIngredients() throws Exception {
        Recipe updatedRecipe = test;
        updatedRecipe.setIngredients("Tortillas, meat, and cheese");

        when(recipeService.partialUpdate(eq(1L), any(Recipe.class)))
                .thenReturn(updatedRecipe);

        mvc.perform(patch("/api/recipe/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(updatedRecipe)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ingredients").value("Tortillas, meat, and cheese"));
        verify(recipeService, times(1)).partialUpdate(eq(1L), any(Recipe.class));
    }
    @Test
    public void shouldDeleteRecipe() throws Exception{
        doNothing().when(recipeService).deleteRecipe(anyLong());

        mvc.perform(MockMvcRequestBuilders
                .delete("/api/recipe/2"))
                .andExpect(status().isNoContent());
        Mockito.verify(recipeService, times(1)).deleteRecipe(2L);
    }
}