package swf.army.mil.cookbook2.dto;

import swf.army.mil.cookbook2.mealtype.EMealTypes;

import java.time.Instant;
import java.util.Set;

public record RecipeDto(
        Long id,
        String title,
        String ingredients,
        String directions,
        Set<EMealTypes> mealTypes,
        Double rating,
        Instant lastChange,
        Boolean favorite
) {
}
