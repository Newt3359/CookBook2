package swf.army.mil.cookbook2.recipe;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Set;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class RecipeControllerIntegrationTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    ObjectMapper mapper;

    @Autowired
    RecipeService recipeService;

    @Autowired
    RecipeRepository recipeRepository;

    Instant time = LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant();
    Recipe test = new Recipe("Taco", "Tortillas and meat", Set.of(MealType.Lunch, MealType.Dinner), 4.5, 10, time, true);
    Recipe test2 = new Recipe("Soup", "Chicken Noodle", Set.of(MealType.Lunch, MealType.Dinner), 3.2, 2, time, false);

    @Test
    @Transactional
    public void shouldCreateRecipe() throws Exception{
        String testJson = mapper.writeValueAsString(test);

        MvcResult result = mvc.perform(post("/api/recipe")
                .contentType(MediaType.APPLICATION_JSON)
                .content(testJson)).andReturn();

        String responseType = result.getResponse().getContentType();
        String responseBody = result.getResponse().getContentAsString();
        Recipe recipeResult = mapper.readValue(responseBody, Recipe.class);

        assertEquals(recipeResult.getTitle(), test.getTitle());
        assertEquals("application/json", responseType);
    }

    @Test
    @Transactional
    public void shouldCreateRecipePart2()throws Exception{
        String testJson = mapper.writeValueAsString(test2);

        MvcResult savedRecipe = mvc.perform(MockMvcRequestBuilders
                .post("/api/recipe")
                .contentType(MediaType.APPLICATION_JSON)
                .content(testJson))
                .andReturn();
        String expectType = savedRecipe.getRequest().getContentType();
        Recipe expectedRecipe = mapper.readValue(savedRecipe.getResponse().getContentAsString(), Recipe.class);

        assertEquals("application/json", expectType);
        assertEquals(expectedRecipe.getTitle(), test2.getTitle());
    }

    @Test
    @Transactional
    public void shouldGetAllRecipes()throws Exception{
        recipeRepository.save(test);
        recipeRepository.save(test2);

        mvc.perform(get("/api/recipe"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.*", hasSize(2)))
                .andExpect(jsonPath("$[0].title").value("Taco"))
                .andExpect(jsonPath("$[1].title").value("Soup"))
                .andExpect(jsonPath("$[0].mealTypes", hasItems("Lunch", "Dinner")))
                .andExpect(jsonPath("$[1].mealTypes", hasItems("Lunch", "Dinner")));
    }

    @Test
    @Transactional
    public void shouldGetRecipeById() throws Exception{
        Recipe savedRecipe = recipeRepository.save(test);
        mvc.perform(get("/api/recipe/" +savedRecipe.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Taco"));
    }
}
