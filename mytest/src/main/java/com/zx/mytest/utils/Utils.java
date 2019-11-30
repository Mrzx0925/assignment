package com.zx.mytest.utils;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class Utils {

    public String saveFile(MultipartFile file) {

        String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
        String filePath = "E://resources//pic//or."+suffix;
       // System.out.println(file.getOriginalFilename());
        File desFile = new File(filePath);
        if (!desFile.getParentFile().exists()) {
            desFile.mkdirs();
        }
        try {
            file.transferTo(desFile);
        } catch (IllegalStateException | IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return filePath;
    }

    public void sendImg(HttpServletRequest request, HttpServletResponse response, String flag) {

        String filePath = "E://resources//pic//";
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        response.setContentType("image/png");
        File file;
        if (flag.equals("one")) {
            file = new File(filePath+"2.png");
        } else {
            file = new File(filePath+"3.png");
        }
       // System.out.println(file.getAbsoluteFile());
        InputStream is;
        try {
            is = new FileInputStream(file);
            BufferedImage bi = ImageIO.read(is);
            ImageIO.write(bi, "JPEG", response.getOutputStream());
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }


    }

    public void runpy(String filepath) {
        String run = "python  -W ignore  E://resources//py//file.py  "+filepath;
        Process proc;
        try {
            proc = Runtime.getRuntime().exec(run);
            proc.waitFor(); //等待执行完成x
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } // 执行py文件
        catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }
}