package com.zx.mytest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class myController {


    @RequestMapping("/main")
    public String main(){
        //System.out.println("11111111111W");
        return "main";
    }
}
