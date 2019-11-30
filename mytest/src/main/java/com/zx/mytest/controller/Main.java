package com.zx.mytest.controller;


import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.zx.mytest.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class Main {


    @Autowired
    Utils utils;

    @PostMapping("/up")
    public void main(@RequestParam("file") MultipartFile file, HttpServletResponse response,HttpServletRequest request) {
        String filepath = utils.saveFile(file);
        utils.runpy(filepath);
    }
    @RequestMapping(value = "/getImg/{flag}")
    public void getBiImg(@PathVariable String flag,HttpServletRequest request, HttpServletResponse response) throws IOException {
        utils.sendImg(request, response,flag);
    }

}
