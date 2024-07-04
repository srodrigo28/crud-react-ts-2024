package com.appexemplo.controllers;

import org.springframework.web.bind.annotation.GetMapping;

public class IndexController {
    
    @GetMapping("/")
    public String home(){
        return "index";
    }
}
