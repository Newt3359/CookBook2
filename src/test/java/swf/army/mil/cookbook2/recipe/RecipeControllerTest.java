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
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
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
        Mockito.when(recipeService.saveRecipe(any(Recipe.class))).thenReturn(test);
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
                .andExpect(jsonPath("$.favorite").value(true));
    }

    @Test
    public void shouldReturnAllRecipes()throws Exception{
        recipes.add(test);
        recipes.add(test2);
        String testJson = mapper.writeValueAsString(recipes);
        Mockito.when(recipeService.getAll()).thenReturn(recipes);
        mvc.perform(MockMvcRequestBuilders
                .get("/api/recipe"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.*").isArray());
//        Mockito.verify(recipeService).getAll();
    }

    @Test
    public void shouldGetRecipeById() throws Exception{
        test.setId(1L);
        Mockito.when(recipeService.getRecipeById()).thenReturn(test);
        mvc.perform(MockMvcRequestBuilders
                .get("/api/recipe/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.mealTypes", hasItems("Lunch", "Dinner")));
    }

    @Test
    public void shouldUpdateRecipeById() throws Exception{
        Recipe updated = new Recipe("Taco", "Tortillas and meat", Set.of(MealType.Lunch, MealType.Dinner), 4.5, 10, time, true);
        String updatedRecipe = mapper.writeValueAsString(updated);

        mvc.perform(MockMvcRequestBuilders
                .put("/api/recipe/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(updatedRecipe))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ingredients").value("Tortillas, meat, and cheese"))
                .andExpect(jsonPath("$.favorite").value(false));
    }

    @Test
    public void shouldUpdateIngredients()throws Exception{
        Recipe existing = new Recipe();
        existing.setId(2L);
        existing.setTitle("Soup");
        existing.setMealTypes(Set.of(MealType.Lunch, MealType.Dinner));
        existing.setFavorite(false);


        mvc.perform(MockMvcRequestBuilders.patch("/api/recipe/2")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"ingredients\": \"noodles, beef, broth\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ingredients").value("noodles, beef, broth"));
    }

    @Test
    public void shouldDeleteRecipe() throws Exception{
        doNothing().when(recipeService).deleteRecipe(anyLong());

        mvc.perform(MockMvcRequestBuilders
                .delete("/api/recipe/2"))
                .andExpect(status().isNoContent());
    }
}