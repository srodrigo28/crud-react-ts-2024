package com.appexemplo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Endereco {
    
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    @Column( length = 10 )
    private Integer cep;

    @Column( length = 20 )
    private String estado;

    @Column( length = 40 )
    private String logradouro;

    @Column( length = 20 )
    private String cidade;

    @Column( length = 40)
    private String complemento;

    @OneToOne
    private Cliente cliente;
}
