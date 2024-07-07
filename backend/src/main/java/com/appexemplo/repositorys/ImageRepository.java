package com.appexemplo.repositorys;

import com.appexemplo.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<String, Image> {

    Image save(Image image);}
