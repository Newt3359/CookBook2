package swf.army.mil.cookbook2.recipe;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.Set;

@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String ingredients;

    private String directions;


    @ElementCollection(targetClass = MealType.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(
            name = "recipe_meal_types",
            joinColumns = @JoinColumn(name = "recipe_id")
    )
    @Column(name = "meal_type")
    private Set<MealType> mealTypes;

    private Double rating;

    private Instant lastChange;

    private Boolean favorite;

    public Recipe() {
    }

    public Recipe(Long id, String title, String ingredients, String directions, Set<MealType> mealTypes, Double rating, Instant lastChange, Boolean favorite) {
        this.id = id;
        this.title = title;
        this.ingredients = ingredients;
        this.directions = directions;
        this.mealTypes = mealTypes;
        this.rating = rating;
        this.lastChange = lastChange;
        this.favorite = favorite;
    }

    public Recipe(String title, Double rating, Boolean favorite) {
        this.title = title;
        this.rating = rating;
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

    public String getDirections() {
        return directions;
    }

    public void setDirections(String directions) {
        this.directions = directions;
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

    public Instant getLastChange() {
        return lastChange;
    }

    public void setLastChange(Instant lastChange) {
        this.lastChange = lastChange;
    }

    public Boolean getFavorite() {
        return favorite;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }
}