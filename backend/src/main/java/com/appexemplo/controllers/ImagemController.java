package com.appexemplo.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/images")
public class ImagemController {
    
    @SuppressWarnings("rawtypes")
    @PostMapping
    public ResponseEntity save(
        @RequestParam("file") MultipartFile file,
        @RequestParam("name") String name,
        @RequestParam("tags") List<String> tags
    ){
        log.info("Imagem recebida: name: {name}, size: {}, tags: {tag}", 
        file.getOriginalFilename(), file.getSize());
        log.info("Nome definido para a image: {}",  name);
        log.info("Tags: {}", tags);

        return ResponseEntity.ok().build();
    }
}
