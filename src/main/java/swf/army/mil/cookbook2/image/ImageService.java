package swf.army.mil.cookbook2.image;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import swf.army.mil.cookbook2.recipe.RecipeRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ImageService {

    @Value("${upload.dir}")
    private String uploadDir;

    private final ImageRepository imageRepository;

    private final RecipeRepository recipeRepository;

    public ImageService(ImageRepository imageRepository, RecipeRepository recipeRepository) {
        this.imageRepository = imageRepository;
        this.recipeRepository = recipeRepository;
    }

    public Image saveImage(MultipartFile file, Long recipeId) throws IOException {
        String fileName = file.getOriginalFilename();
        Path path = Paths.get(uploadDir, fileName);
        Files.copy(file.getInputStream(), path);

        Image image= new Image();
        image.setImgUrl("/upload/" + fileName);
        image.setRecipe(recipeRepository.getRecipesById(recipeId));

        return imageRepository.save(image);
    }

    public List<Image> getImagesByRecipeId(Long id){
        return imageRepository.findImagesByRecipe_Id(id);
    }

    public void deleteImageById(Long id){
        imageRepository.deleteImageByImageId(id);
    }

    public Image updateImage(Image image){
        Image oldImage = imageRepository.findImageByImageId(image.getImageId());
        oldImage = image;
        return imageRepository.save(oldImage);
    }
}
