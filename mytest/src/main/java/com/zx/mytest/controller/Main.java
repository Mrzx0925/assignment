package com.zx.mytest.controller;


import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.zx.mytest.service.UpFile;
import com.zx.mytest.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RestController
public class Main {


    @Autowired
    Utils utils;
    @Autowired
    UpFile upFile;

    @PostMapping("/up")
    public void main(@RequestParam("file") MultipartFile file, HttpServletResponse response,HttpServletRequest request) {
        String filepath = utils.saveFile(file);
        utils.runpy(filepath);
    }
    @RequestMapping(value = "/getImg/{flag}")
    public void getBiImg(@PathVariable String flag,HttpServletRequest request, HttpServletResponse response) throws IOException {
        utils.sendImg(request, response,flag);
    }
    @RequestMapping(value="/fileUp",method= RequestMethod.POST)
    public void uploadFileFolder(HttpServletRequest request) {
        System.out.println("2222222222");
        MultipartHttpServletRequest params=((MultipartHttpServletRequest) request);
        List<MultipartFile> files = params.getFiles("fileFolder");
        System.out.println(upFile.upload(files));


    }

}
