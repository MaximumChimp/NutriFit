package com.nutrifit.nutrifit.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;

@RestController
@RequestMapping("/api/uploads")
@CrossOrigin(origins = "*")
public class ImageUploadController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/meal-image")
    public ResponseEntity<String> uploadMealImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "oldImage", required = false) String oldImage) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        try {
            // Secure filename
            String filename = Paths.get(file.getOriginalFilename()).getFileName().toString();
            Path filepath = Paths.get(uploadDir).resolve(filename);

            // Create upload folder if not exists
            Files.createDirectories(filepath.getParent());

            // 🔥 Delete old image if provided
            if (oldImage != null && !oldImage.isEmpty()) {
                Path oldPath = Paths.get(uploadDir).resolve(Paths.get(oldImage).getFileName().toString());
                Files.deleteIfExists(oldPath);
            }

            // Save new image
            Files.copy(file.getInputStream(), filepath, StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok(filename);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload: " + e.getMessage());
        }
    }

    @DeleteMapping("/meal-image/{filename}")
    public ResponseEntity<String> deleteMealImage(@PathVariable String filename) {
        try {
            Path filepath = Paths.get(uploadDir + File.separator + filename);
            boolean deleted = Files.deleteIfExists(filepath);
            if (deleted) {
                return ResponseEntity.ok("Image deleted");
            } else {
                return ResponseEntity.status(404).body("Image not found");
            }
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to delete image: " + e.getMessage());
        }
    }
}
