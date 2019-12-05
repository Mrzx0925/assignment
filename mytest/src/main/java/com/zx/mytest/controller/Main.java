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


    @RequestMapping(value = "/getUpImg/{path}/{flag}")
    public void getUpImg(@PathVariable String flag,@PathVariable String path,HttpServletRequest request, HttpServletResponse response) throws IOException {
        String filePath = "D://myAs//upload//"+path+"//";
        dofile.sendImg(request, response,flag,filePath);
    }
    @RequestMapping(value = "/getDownImg/{path}/{flag}")
    public void getDownImg(@PathVariable String flag,@PathVariable String path,HttpServletRequest request, HttpServletResponse response) throws IOException {
        String filePath = "D://myAs//download//"+path+"//";
        dofile.sendImg(request, response,flag,filePath);
    }

    @RequestMapping(value="/fileUp/{path}",method= RequestMethod.POST)
    public String uploadFileFolder(@PathVariable String path,HttpServletRequest request) {
        MultipartHttpServletRequest params=((MultipartHttpServletRequest) request);
        List<MultipartFile> files = params.getFiles("fileFolder");
        String result = dofile.upload(files,path);
        dofile.runpy(path);
        return result;
    }
    @RequestMapping(value = "/judge/{path}")
    public long  judgeExist(@PathVariable String path){
        return  dofile.judgeExist(path);
    }

}
