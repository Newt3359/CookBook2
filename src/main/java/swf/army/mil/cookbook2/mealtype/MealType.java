package swf.army.mil.cookbook2.mealtype;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import swf.army.mil.cookbook2.recipe.Recipe;

import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "meal_types")
public class MealType {

    @Id
    private Long mealId;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal", nullable = false)
    private EMealTypes mealType;

    @ManyToMany(mappedBy = "mealTypes")
    @JsonIgnore
    private Set<Recipe> recipes = new HashSet<>();


    public MealType() {
    }

    public MealType(Long mealId, EMealTypes mealType, Set<Recipe> recipes) {
        this.mealId = mealId;
        this.mealType = mealType;
        this.recipes = recipes;
    }

    public Long getMealId() {
        return mealId;
    }

    public void setMealId(Long mealId) {
        this.mealId = mealId;
    }

    public EMealTypes getMealType() {
        return mealType;
    }

    public void setMealType(EMealTypes mealType) {
        this.mealType = mealType;
    }

    @JsonIgnore
    public Set<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(Set<Recipe> recipes) {
        this.recipes = recipes;
    }
}
