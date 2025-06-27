package com.nutrifit.nutrifit.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/uploads")
@CrossOrigin(origins = "*")
public class FileServeController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> serveImage(@PathVariable String filename) throws IOException {
        File file = new File(uploadDir + File.separator + filename);
        if (!file.exists())
            return ResponseEntity.notFound().build();

        Resource resource = new UrlResource(file.toURI());

        return ResponseEntity.ok()
                .contentType(MediaTypeFactory.getMediaType(resource).orElse(MediaType.APPLICATION_OCTET_STREAM))
                .body(resource);
    }
}
