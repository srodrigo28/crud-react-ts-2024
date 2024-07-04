package com.appexemplo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class NameAppexemploApplication {

	public static void main(String[] args) {
		SpringApplication.run(NameAppexemploApplication.class, args);
	}

	@GetMapping("/")
    public String home(){
        return "index";
    }

}
