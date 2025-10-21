package swf.army.mil.cookbook2.recipe;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
@AutoConfigureMockMvc
class RecipeControllerTest {


    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private RecipeService recipeService;

    @Autowired
    private ObjectMapper mapper;

    private ArrayList<Recipe> recipes = new ArrayList<Recipe>();
    Recipe test = new Recipe("Taco", "Tortillas and meat", true);
    Recipe test2 = new Recipe("Soup", "Chicken Noodle", false);

    @Test
    public void shouldSaveRecipe()throws Exception{
        test.setId(1L);
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
                .andExpect(jsonPath("$.favorite").value(true));
    }

    @Test
    public void shouldReturnAllRecipes()throws Exception{
        test.setId(1L);
        test2.setId(2L);
        recipes.add(test);
        recipes.add(test2);
        String testJson = mapper.writeValueAsString(recipes);
        Mockito.when(recipeService.getAll()).thenReturn(recipes);
        mvc.perform(MockMvcRequestBuilders
                .get("/api/recipe")
                .contentType(MediaType.APPLICATION_JSON)
                .content(testJson))
                .andExpect(status().is2xxSuccessful());
    }
}