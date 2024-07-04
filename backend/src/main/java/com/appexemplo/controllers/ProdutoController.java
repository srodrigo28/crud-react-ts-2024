package com.appexemplo.controllers;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.appexemplo.dtos.ProdutoDTO;
import com.appexemplo.models.Produto;
import com.appexemplo.repositorys.ProdutoRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@RestController
public class ProdutoController {
    
    @Autowired
    ProdutoRepository produtoRepository;

    @PostMapping("/produto") // Cadastra um produto
    public ResponseEntity<Produto> salveProduto(@RequestBody @Valid ProdutoDTO produtoDTO){
        var produto = new Produto();
        BeanUtils.copyProperties(produtoDTO, produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(produtoRepository.save(produto));
    }

    @GetMapping("/produto") // Lista todos os produtos
    public ResponseEntity<java.util.List<Produto>> listaTodosProdutos(){
        return ResponseEntity.status(HttpStatus.OK).body(produtoRepository.findAll());
    }

    @GetMapping("/produto/{id}") // Lista um produto por ID
    public ResponseEntity<Object> listarUmProduto(@PathVariable @NotNull Long id){
        Optional<Produto> produto = produtoRepository.findById(id);
        if(produto.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(produto.get());
    }

    @PutMapping("/produto/{id}") // Atualiza um produto por ID 
    public ResponseEntity<Object> atualizarProduto(@PathVariable Long id, @RequestBody @Valid ProdutoDTO produtoDTO){
        Optional<Produto> produto = produtoRepository.findById(id);
        if(produto.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
        }
            var produtoModel = produto.get();
            BeanUtils.copyProperties(produtoDTO, produtoModel);
            return ResponseEntity.status(HttpStatus.OK).body(produtoRepository.save(produtoModel));
    }

    @DeleteMapping("/produto/{id}") // Apaga um produto por ID
    public ResponseEntity<Object> apagarProduto(@PathVariable Long id){
        Optional<Produto> produto = produtoRepository.findById(id);
        if(produto.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto not found.");
        }
        produtoRepository.delete(produto.get());
        return ResponseEntity.status(HttpStatus.OK).body("Produto deleted sucessfully");
    }

    /**
     *  CONTINUA
     */
     
}