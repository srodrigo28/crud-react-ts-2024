package com.appexemplo.services;

import org.springframework.stereotype.Service;

import com.appexemplo.models.Image;
import com.appexemplo.repositorys.ImageRepository;
import com.appexemplo.repositorys.ImageService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService{

    private final ImageRepository repository;

    @Override
    @Transactional
    public Image save(Image image) {
        return repository.save(image);
    }
    
}
