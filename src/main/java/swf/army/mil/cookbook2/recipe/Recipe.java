package swf.army.mil.cookbook2.recipe;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import swf.army.mil.cookbook2.mealtype.MealType;
import swf.army.mil.cookbook2.image.Image;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "recipe")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id")
    private Long id;

    @Column(name = "recipe_title")
    private String title;

    @Column(name = "recipe_ingredients")
    private String ingredients;

    @Column(name = "recipe_directions")
    private String directions;


    @ManyToMany
    @JoinTable(
        name = "meal_type_mapping_table",
        joinColumns = @JoinColumn(name = "recipe_fk_id"),
        inverseJoinColumns = @JoinColumn(name = "meal_type_id")
    )
    private Set<MealType> mealTypes = new HashSet<>();

    @Column(name = "recipe_rating")
    private Double rating;

    @Column(name = "recipe_last_change")
    private Instant lastChange;

    @Column(name = "recipe_favorite")
    private Boolean favorite;

    @Nullable
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images = new ArrayList<>();

    public Recipe() {
    }

    public Recipe(Long id, String title, String ingredients, String directions, Set<MealType> mealTypes, Double rating, Instant lastChange, Boolean favorite, List<Image> images) {
        this.id = id;
        this.title = title;
        this.ingredients = ingredients;
        this.directions = directions;
        this.mealTypes = mealTypes;
        this.rating = rating;
        this.lastChange = lastChange;
        this.favorite = favorite;
        this.images = images;
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

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }
}