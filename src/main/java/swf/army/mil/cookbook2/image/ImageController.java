package swf.army.mil.cookbook2.image;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import swf.army.mil.cookbook2.recipe.RecipeService;

import java.util.List;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    private final ImageService imageService;

    private final RecipeService recipeService;

    public  ImageController(ImageService imageService, RecipeService recipeService) {
        this.imageService = imageService;
        this.recipeService = recipeService;
    }

    @PostMapping({"/{id}"})
    public ResponseEntity<Image> saveImage(@RequestParam("file") MultipartFile file, @PathVariable Long id) {
        System.out.println("saveImage called with recipe ID: " + id);
        System.out.println("Received file: " + file);
        if (file != null) {
            System.out.println("File name: " + file.getOriginalFilename());
            System.out.println("File size: " + file.getSize());
        }

        try {

            Image saved = imageService.saveImage(file, id);
            return ResponseEntity.ok().body(saved);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Image>> getImagesByRecipeId(@PathVariable Long id){
        System.out.println(id);
        return ResponseEntity.ok().body(imageService.getImagesByRecipeId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id){
        imageService.deleteImageById(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping
    public ResponseEntity<Image> updateImage(@RequestBody Image image){
        return ResponseEntity.ok().body(imageService.updateImage(image));
    }
}
