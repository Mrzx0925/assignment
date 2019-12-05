package com.zx.mytest.service;



import java.awt.image.BufferedImage;
import java.io.*;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service("UpFile")
    public class doFile {
        public String upload(List<MultipartFile> files,String path) {
             String Storage_PATH = "D:\\myAs\\upload\\"+path+"\\";
            int i = 1;
            BufferedOutputStream bos = null;
            BufferedInputStream bis = null;
            try {

                //遍历文件夹
                for (MultipartFile mf : files) {
                    if (!mf.isEmpty()) {
                        String originalFilename = mf.getOriginalFilename();
                        //格式限制，非wav格式的不上传
//                        if (!"wav".equals(originalFilename.substring(originalFilename.lastIndexOf(".") + 1))) {
//                            continue;
//                        }
                        String fileName = i+"."+originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
 //                       String fileName = originalFilename.substring(originalFilename.lastIndexOf("/") + 1);
//                        //为避免文件同名覆盖，给文件名加上时间戳
//                        int index = fileName.lastIndexOf(".");
//                        String firstName = fileName.substring(0, index);
//                        String lastName = fileName.substring(index);
//                        fileName = firstName + "_" + System.currentTimeMillis() + lastName;
//                        //读取文件
                        bis = new BufferedInputStream(mf.getInputStream());
//                        //指定存储的路径
                        bos = new BufferedOutputStream(new FileOutputStream
                                (Storage_PATH + fileName));
                        int len = 0;
                        byte[] buffer = new byte[10240];
                        while ((len = bis.read(buffer)) != -1) {
                            bos.write(buffer, 0, len);
                        }
                        //刷新此缓冲的输出流，保证数据全部都能写出
                        bos.flush();
                        i++;
                        bis.close();
                        bos.close();
                    }
                }
                return "ok";
            } catch (FileNotFoundException e) {
                e.printStackTrace();
                return "error";
            } catch (IOException e) {
                e.printStackTrace();
                return "error";
            }
        }


    public void sendImg(HttpServletRequest request, HttpServletResponse response, String flag,String filePath) {
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        response.setContentType("image/JPG");
        java.io.File file;
        file = new java.io.File(filePath+flag+".JPG");
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
       // String run = "python  -W ignore  E://resources//py//file.py  "+filepath;
        String run="xcopy D:\\myAs\\wait\\"+filepath+" D:\\myAs\\download\\"+filepath+"\\  /y /s /f /h";
        System.out.println(run);
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


    public long judgeExist(String path) {
            File file = new File("D://myAS//upload//"+path+"//1.jpg");
            if(!file.exists()){
                return 0;
            }
            else{
                file = new File("D://myAs//upload//"+path);
            }
            return file.listFiles().length;
    }
}
