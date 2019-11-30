
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

document.getElementById('up').onchange = function(e) { 
    var formData = new FormData($("#fileup")[0]);
    $.ajax({    
        url : "http://localhost:8080/fileUp",    
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success : function(data) {    
            $("#sendimg").attr("src", "http://localhost:8080/getImg/1?\"+Math.random());")
        },    
        error : function(data) {    
              
        }    
   });   
};

    function nifen(){
        $("#up").click();
    }