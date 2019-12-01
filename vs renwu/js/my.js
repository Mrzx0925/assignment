var action="";
var relength = "";
var down_flag = 1;
var up_flag = 1;
function upchangeimg(){
    judgeIsUp();
    for(let i=1; i<=relength; i++){
        setTimeout(() => {
            $("#upimg").attr("src", "http://localhost:8080/getUpImg/"+i+"?"+Math.random());
        }, i*1000);
    }
    // setTimeout(() => {
    //     $("#sengimg").attr('src',"images/1/1.jpg"); 
    // }, 0);
    
}
function downchangeimg(){
    judgeIsUp();
    for(let i=1; i<=relength; i++){
        setTimeout(() => {
            $("#downimg").attr("src", "http://localhost:8080/getDownImg/"+i+"?"+Math.random());
        }, i*1000);
        down_flag = i;
    }
    // setTimeout(() => {
    //     $("#sengimg").attr('src',"images/1/1.jpg"); 
    // }, 0);
    
}
document.getElementById('up').onchange = function(e) { 
    // alert(action);
    var formData = new FormData($("#fileup")[0]);
    // console.log($("#up")[0].files.length);   
    relength =  $("#up")[0].files.length 
    $.ajax({    
        url : "http://localhost:8080//"+action,    
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success : function(data) {    
           $("#upimg").attr("src", "http://localhost:8080/getUpImg/1?\"+Math.random());");
           $("#downimg").attr("src", "http://localhost:8080/getDownImg/1?\"+Math.random());");
        },    
        error : function(data) {   
            alert("上传失败"); 
              relength = 0;
        }    
   });

    document.getElementById('up').value="";
};

function nifen(){
    action="fileUp";
    $("#up").click();
}


function re(){
    judgeIsUp();
    if(down_flag >1){
        down_flag = down_flag-1;
        $("#downimg").attr("src", "http://localhost:8080/getDownImg/"+down_flag+"?"+Math.random());
    
    }
}
function next(){
    judgeIsUp();
    if(down_flag < relength){
        down_flag = down_flag+1;
        $("#downimg").attr("src", "http://localhost:8080/getDownImg/"+down_flag+"?"+Math.random());
        
    }
}

function sre(){
    judgeIsUp();
    if(up_flag >1){
        up_flag = up_flag-1;
        $("#upimg").attr("src", "http://localhost:8080/getUpImg/"+up_flag+"?"+Math.random());
    
    }
}
function snext(){
    judgeIsUp();
    if(up_flag < relength){
        up_flag = up_flag+1;
        $("#upimg").attr("src", "http://localhost:8080/getUpImg/"+up_flag+"?"+Math.random());
        
    }
}

function judgeIsUp(){
    if(relength == 0){
        alert("未上传,请点击左边内容上传");
    }
}