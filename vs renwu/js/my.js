var action="";
var relength = "";
var down_flag = 1;
var up_flag = 1;
function upchangeimg(){
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
          alert(data);
           $("#upimg").attr("src", "http://localhost:8080/getUpImg/1?\"+Math.random());");
           $("#downimg").attr("src", "http://localhost:8080/getDownImg/1?\"+Math.random());");
        },    
        error : function(data) {    
              
        }    
   });
alert();
    document.getElementById('up').value="";
};

function nifen(){
    action="fileUp";
    $("#up").click();
}


function re(){
    if(down_flag >1){
        down_flag = down_flag-1;
        $("#downimg").attr("src", "http://localhost:8080/getDownImg/"+down_flag+"?"+Math.random());
    
    }
}
function next(){
    
    if(down_flag < relength){
        down_flag = down_flag+1;
        $("#downimg").attr("src", "http://localhost:8080/getDownImg/"+down_flag+"?"+Math.random());
        
    }
}

function sre(){
    if(up_flag >1){
        up_flag = up_flag-1;
        $("#upimg").attr("src", "http://localhost:8080/getUpImg/"+up_flag+"?"+Math.random());
    
    }
}
function snext(){
    
    if(up_flag < relength){
        up_flag = up_flag+1;
        $("#upimg").attr("src", "http://localhost:8080/getUpImg/"+up_flag+"?"+Math.random());
        
    }
}