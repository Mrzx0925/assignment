
function changeimg(){

    // setTimeout(() => {
    //     $("#sengimg").attr('src',"images/1/1.jpg"); 
    // }, 0);

    // setTimeout(() => {
    //     $("#sengimg").attr('src',"images/1/2.jpg"); 
    // }, 1000);
    // setTimeout(() => {
    //     $("#sengimg").attr('src',"images/1/3.jpg"); 
    // }, 2000);
    // setTimeout(() => {
    //     $("#sengimg").attr('src',"images/1/4.jpg"); 
    // }, 3000);
    // setTimeout(() => {
    //     $("#sengimg").attr('src',"images/1/5.jpg"); 
    // }, 4000);
}

document.getElementById('zx').onchange = function(e) {  
    //判断是否选中文件  
      var file=$("#zx").val();  

      if(file!=''){  
          $("#msg").text('');  
      }  
       var files = e.target.files; // FileList  
      //文件数量
      console.log(files[0].webkitRelativePath);
      actual_filesCount = files.length;  
      if(actual_filesCount > filesCount){  
         $("#msg").text("文件过多，单次最多可上传"+filesCount+"个文件");  
         return;  
      }  
      for (var i = 0, f; f = files[i]; ++i){  
          actual_filesSize += f.size;  
          if(actual_filesSize > filesSize){  
             $("#msg").text("单次文件夹上传不能超过"+filesSize/1024/1024+"M");  
             return;  
          }  
      }  
    };