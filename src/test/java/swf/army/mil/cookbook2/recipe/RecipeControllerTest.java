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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
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

    Recipe test = new Recipe(1L, "Taco", "Tortillas and meat", true);

    @Test
    public void shouldSaveRecipe()throws Exception{
        Mockito.when(recipeService.saveRecipe(any(Recipe.class))).thenReturn(test);
        String testJson = mapper.writeValueAsString(test);
        mvc.perform(MockMvcRequestBuilders
                .post("/api/recipe")
                .contentType(MediaType.APPLICATION_JSON)
                .content(testJson))
                .andExpect(status().is2xxSuccessful());
    }
}