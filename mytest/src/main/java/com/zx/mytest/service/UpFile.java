package com.zx.mytest.service;



import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

    @Service("UpFile")
    public class UpFile  {
        public String upload(List<MultipartFile> files) {
             String Storage_PATH = "D:\\upload\\";
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
}
