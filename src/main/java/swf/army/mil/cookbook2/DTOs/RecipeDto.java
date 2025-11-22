package swf.army.mil.cookbook2.DTOs;

import swf.army.mil.cookbook2.recipe.MealType;

import java.time.Instant;
import java.util.Set;

public record RecipeDto(
        String title,
        String ingredients,
        String directions,
        Set<MealType> mealTypes,
        Double rating,
        Instant lastChange,
        Boolean favorite
) {
}
