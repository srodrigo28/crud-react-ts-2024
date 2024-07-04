package com.appexemplo.controllers;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.appexemplo.dtos.CategoriaDTO;
import com.appexemplo.models.Categoria;
import com.appexemplo.repositorys.CategoriaRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@RestController
@CrossOrigin("*")
public class CategoriaController {

    @Autowired
    CategoriaRepository categoriaRepository;

    @CrossOrigin("*")
    @PostMapping("/categoria") // Cadastra um categoria
    public ResponseEntity<Categoria> salveCategoria(@RequestBody @Valid CategoriaDTO categoriaDTO){
        var categoria = new Categoria();
        BeanUtils.copyProperties(categoriaDTO, categoria);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaRepository.save(categoria));
    }
    
    @CrossOrigin("*")
    @GetMapping("/categoria") // Lista todos os categorias
    public ResponseEntity<Iterable<Categoria>> listaTodasCategorias(){
        return ResponseEntity.status(HttpStatus.OK).body(categoriaRepository.findAll());
    }

    @CrossOrigin("*")
    @GetMapping("/categoria/{id}") // Lista Uma categoria
    public ResponseEntity<Object> listarUmaCategoria(@PathVariable @NotNull Long id){
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        if(categoria.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(categoria.get());
    }

    @CrossOrigin("*")
    @PutMapping("/categoria/{id}") // Atualizar categoria
    public ResponseEntity<Object> AtualizarCategoria(@PathVariable Long id,  @RequestBody @Valid CategoriaDTO categoriaDTO){
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        
        if(categoria.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria not found.");
        }
        var categoriaModel = categoria.get();
        BeanUtils.copyProperties(categoriaDTO, categoriaModel);
        return ResponseEntity.status(HttpStatus.OK).body(categoriaRepository.save(categoriaModel));
    }

    @CrossOrigin("*")
    @DeleteMapping("/categoria/{id}") // Apagar categoria
    public ResponseEntity<Object> apagarCategoria(@PathVariable Long id){
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        
        if(categoria.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria not found.");
        }

        categoriaRepository.delete(categoria.get());
        return ResponseEntity.status(HttpStatus.OK).body("Categoria deleted successfully");
    }
}
