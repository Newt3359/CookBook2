package swf.army.mil.cookbook2.recipe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository <Recipe, Long> {

    List<Recipe> findDistinctByTitleContainingIgnoreCase(String query);

    List<Recipe> findDistinctByIngredientsContainingIgnoreCase(String query);
}
