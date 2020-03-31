package com.example.demo.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

@RestController
public class FileUploader {
    private static String currentWorkingDirectory = System.getProperty("user.dir");
    private static String frontendUploadDirectory = "/uploads/";
    private static String backendUploadDirectory = currentWorkingDirectory + "/src/main/resources/static" + frontendUploadDirectory;

    // i Vue - created()
    // Kolla om uploads mappen finns annars skapar den denna
    @PostConstruct
    public void createFolderIfMissing() {
        File dirPath = new File(backendUploadDirectory);
        if (!dirPath.exists()) {
            dirPath.mkdirs();
        }
    }

    @PostMapping("/api/upload-files")
    public List<String> handleFileUpload(@RequestParam List<MultipartFile> files) {
        // Här gör vi så det bara är bilder vi kanske skicka
        final List<String> supportedFileExtensions = List.of(".png,.jpg,.jpeg,.gif,.bmp,.jfif".split(","));
        List<String> resultingFilepaths = new ArrayList<>();

        for (MultipartFile file : files) {
            String fileExt = file.getOriginalFilename().toLowerCase();
            fileExt = fileExt.substring(fileExt.lastIndexOf(".")); // .jpg or .png
            final String filename = file.getOriginalFilename();
            if (!supportedFileExtensions.contains(fileExt)) {
                continue;
            }

            File targetLocation = new File(backendUploadDirectory + filename);

            try {
                file.transferTo(targetLocation);
                resultingFilepaths.add(frontendUploadDirectory + filename);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return resultingFilepaths;
    }
}
