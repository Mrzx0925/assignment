var action = "";
var relength = "";
var down_flag = 1;
var up_flag = 1;
var run_flag = 0;
var element;
layui.use('element', function () {
    element = layui.element;
});
var path = "";

function upchangeimg() {
    judgeIsUp();
    for (let i = 1; i <= relength; i++) {
        setTimeout(() => {
            $("#upimg").attr("src", "http://localhost:8080/getUpImg/" + path + "/" + i + "?" + Math.random());
        }, i * 1000);
    }
    // setTimeout(() => {
    //     $("#sengimg").attr('src',"images/1/1.jpg"); 
    // }, 0);

}

function downchangeimg() {
    judgeIsUp();
    for (let i = 1; i <= relength; i++) {
        setTimeout(() => {
            $("#downimg").attr("src", "http://localhost:8080/getDownImg/" + path + "/" + i + "?" + Math.random());
        }, i * 1000);
        down_flag = i;
    }
    // setTimeout(() => {
    //     $("#sengimg").attr('src',"images/1/1.jpg"); 
    // }, 0);

}
document.getElementById('up').onchange = function (e) {
    run_flag = 1;
    $("#lab").css("visibility", "visible");

};

function nifen() {
    run_flag = 0;
    path = "nifeng";
    layer.open({
        type: 1,
        title: '设置参数/选择图片',
        skin: 'layui-layer-rim', //加上边框
        area: ['350px', '200px'], //宽高
        // content: "<input id='file' type='file'><button onclick='dian();'>上传</buttton>"
        content: "\
        <div class=\"layui-form-item\" style=\"height: 100px;width: 300px;\">\
        <button class = \"openbu\"  style=\"margin-left: 5%;margin-top:5%;\" onclick=\"chosefile()\" >chose file</button>\
        <lable id=\"lab\" style=\"visibility:hidden\">✔</lable>\
        <div class=\"layui-progress\" lay-filter=\"demo\" style=\"margin-left: 5%;margin-top:5%;\">\
            <div class=\"layui-progress-bar\"  lay-percent=\"0%\"></div>\
        </div>\
    </a>\
    <button class=\"openbu\" style=\"margin-left: 10%;margin-top:10%;\" onclick='last();'>re</button>\
    <button class=\"openbu\" style=\"margin-left: 21%;margin-top:10%;\" onclick='run();'>run</button>\
</div>\
        "
    });
    //$("#up").click();

}


function re() {
    judgeIsUp();
    if (down_flag > 1) {
        down_flag = down_flag - 1;
        $("#downimg").attr("src", "http://localhost:8080/getDownImg/" + path + "/" + down_flag + "?" + Math.random());
    }
}

function next() {
    judgeIsUp();
    if (down_flag < relength) {
        down_flag = down_flag + 1;
        $("#downimg").attr("src", "http://localhost:8080/getDownImg/" + path + "/" + down_flag + "?" + Math.random());

    }
}

function sre() {
    judgeIsUp();
    if (up_flag > 1) {
        up_flag = up_flag - 1;
        $("#upimg").attr("src", "http://localhost:8080/getUpImg/" + path + "/" + up_flag + "?" + Math.random());

    }
}

function snext() {
    judgeIsUp();
    if (up_flag < relength) {
        up_flag = up_flag + 1;
        $("#upimg").attr("src", "http://localhost:8080/getUpImg/" + path + "/" + up_flag + "?" + Math.random());

    }
}

function judgeIsUp() {
    if (relength == 0) {
        alert("未上传,请点击左边内容上传");
    }
}



function run() {
    if (run_flag == 0) {
        alert("请上传文件");
    } else {
        loading(1, 30);

        setTimeout(() => {
            upfile();
        }, 700);
    }



}


function chosefile() {
    $("#up").click();

}

function upfile() {
    var formData = new FormData($("#fileup")[0]);
    //  formData.append("fileFolder", $('#up')[0]); //添加图片信息的参数
    // console.log($("#up")[0].files.length);   
    relength = $("#up")[0].files.length
    $.ajax({
        url: "http://localhost:8080//fileUp//" + path,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            loading(40, 100);
            setTimeout(() => {
                layer.closeAll();
                layer.alert("成功");
                $("#upimg").attr("src", "http://localhost:8080/getUpImg/" + path + "/1?" + Math.random());
                $("#downimg").attr("src", "http://localhost:8080/getDownImg/" + path + "/1?" + Math.random());
            }, 3000);
        },
        error: function (data) {
            alert("上传失败");
            relength = 0;
            layer.closeAll();
        }
    });
    document.getElementById('up').value = "";

}

function loading(begin, end) {
    for (let index = begin; index < end + 1; index++) {
        setTimeout(() => {
            element.progress("demo", index + "%");
        }, index * 20);

    }
}

function last() {
    $.ajax({
        url: "http://localhost:8080//judge//" + path,
        type: 'POST',
        success: function (data) {
            if (data == 0) {
                alert("no exist")
            } else {
                relength =data;
                $("#upimg").attr("src", "http://localhost:8080/getUpImg/" + path + "/1?" + Math.random());
                $("#downimg").attr("src", "http://localhost:8080/getDownImg/" + path + "/1?" + Math.random());
                layer.closeAll();
                
            }
        },
        error: function (data) {

        }
    });
}