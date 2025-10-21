package swf.army.mil.cookbook2.recipe;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Recipe{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String ingredients;


    @ElementCollection(targetClass = MealType.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(
            name = "recipe_meal_types",
            joinColumns = @JoinColumn(name = "recipe_id")
    )
    @Column (name = "meal_type")
    private Set<MealType> mealTypes;

    private boolean favorite;

    public Recipe() {
    }

    public Recipe(String title, String ingredients, Set<MealType> mealTypes, boolean favorite) {
        this.title = title;
        this.ingredients = ingredients;
        this.mealTypes = mealTypes;
        this.favorite = favorite;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public Set<MealType> getMealTypes() {
        return mealTypes;
    }

    public void setMealTypes(Set<MealType> mealTypes) {
        this.mealTypes = mealTypes;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }
}
