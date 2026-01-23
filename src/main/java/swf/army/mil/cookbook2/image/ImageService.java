package swf.army.mil.cookbook2.image;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import swf.army.mil.cookbook2.recipe.Recipe;
import swf.army.mil.cookbook2.recipe.RecipeRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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

    public Image saveImage(MultipartFile file, Long id) throws IOException {
        String fileName = file.getOriginalFilename();
        if (fileName == null || fileName.isBlank()) {
            throw new RuntimeException("Invalid file name");
        }

        Path dirPath = Paths.get(uploadDir);
        Files.createDirectories(dirPath);

        Path filePath = dirPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found: " + id));

        Image image = new Image();
        image.setImgUrl("/upload/" + fileName);
        image.setRecipe(recipe);

        return imageRepository.save(image);
    }


    public List<Image> getImagesByRecipeId(Long id){
        System.out.println(id);
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
