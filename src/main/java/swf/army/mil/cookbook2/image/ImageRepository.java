package swf.army.mil.cookbook2.image;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Integer> {

    List<Image> findImagesByRecipe_Id(Long id);

    void deleteImageByImageId(Long id);

    Image findImageByImageId(Long id);
}
