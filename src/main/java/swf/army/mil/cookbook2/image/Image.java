package swf.army.mil.cookbook2.image;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import swf.army.mil.cookbook2.recipe.Recipe;

@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long imageId;

    @Column(name = "img_url")
    private String imgUrl;

   @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_fk", nullable = false)
    private Recipe recipe;

    public Image() {
    }

    public Image(Long imageId, String imgUrl, Recipe recipe) {
        this.imageId = imageId;
        this.imgUrl = imgUrl;
        this.recipe = recipe;
    }

    public Long getImageId() {
        return imageId;
    }

    public void setImageId(Long imageId) {
        this.imageId = imageId;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    @JsonIgnore
    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }
}
