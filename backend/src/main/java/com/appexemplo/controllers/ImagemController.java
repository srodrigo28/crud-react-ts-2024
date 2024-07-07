package com.appexemplo.controllers;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.appexemplo.enums.ImageExtension;
import com.appexemplo.models.Image;
import com.appexemplo.repositorys.ImageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImagemController {

    private final ImageService service;
    
    @SuppressWarnings("rawtypes")
    @PostMapping
    public ResponseEntity save(
        @RequestParam("file") MultipartFile file,
        @RequestParam("name") String name,
        @RequestParam("tags") List<String> tags
    ) throws Exception {
        log.info("Imagem recebida: name: {name}, size: {}, tags: {tag}", file.getOriginalFilename(), file.getSize());
        log.info("Nome definido para a image: {}",  name);
        log.info("Tags: {}", tags);
        log.info("Content Type: " + file.getContentType());

        // log.info("Media Type: {} ", MediaType.valueof(file.getContentType()));


        Image image = Image.builder()
            .name(name)
            .tags(String.join(",", tags))
            .size(file.getSize())
            .extension(ImageExtension.valueOf(MediaType.valueOf(file.getContentType())))
            .file(file.getBytes())
            .build();

        service.save(image);

        return ResponseEntity.ok().build();
    }
}
