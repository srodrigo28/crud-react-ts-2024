package com.appexemplo.dtos;

import jakarta.validation.constraints.NotNull;

public record CategoriaDTO(@NotNull String nome) {
    
}
