package com.zx.mytest.controller;


import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.zx.mytest.service.doFile;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RestController
public class Main {



    @Autowired
    doFile dofile;


    @RequestMapping(value = "/getUpImg/{flag}")
    public void getUpImg(@PathVariable String flag,HttpServletRequest request, HttpServletResponse response) throws IOException {
        String filePath = "D://upload//";
        dofile.sendImg(request, response,flag,filePath);
    }
    @RequestMapping(value = "/getDownImg/{flag}")
    public void getDownImg(@PathVariable String flag,HttpServletRequest request, HttpServletResponse response) throws IOException {
        String filePath = "D://download//";
        dofile.sendImg(request, response,flag,filePath);
    }

    @RequestMapping(value="/fileUp",method= RequestMethod.POST)
    public String uploadFileFolder(HttpServletRequest request) {
        MultipartHttpServletRequest params=((MultipartHttpServletRequest) request);
        List<MultipartFile> files = params.getFiles("fileFolder");
        String result = dofile.upload(files);
        dofile.runpy("1");
        return result;
    }

}
