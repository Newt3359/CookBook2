package swf.army.mil.cookbook2.recipe;

import jakarta.persistence.*;

import java.time.Instant;
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

    private Double rating;

    private Integer timesMade;

    private Instant lastChange;

    private Boolean favorite;

    public Recipe() {
    }

    public Recipe(String title, String ingredients, Set<MealType> mealTypes, Double rating, Integer timesMade, Instant lastChange, Boolean favorite) {
        this.title = title;
        this.ingredients = ingredients;
        this.mealTypes = mealTypes;
        this.rating = rating;
        this.timesMade = timesMade;
        this.lastChange = lastChange;
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

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getTimesMade() {
        return timesMade;
    }

    public void setTimesMade(Integer timesMade) {
        this.timesMade = timesMade;
    }

    public Instant getLastChange() {
        return lastChange;
    }

    public void setLastChange(Instant lastChange) {
        this.lastChange = lastChange;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }
}
