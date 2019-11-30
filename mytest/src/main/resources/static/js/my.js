var flag = 0;
var formData = new FormData();
function one() {
    flag=0;
    $("#getimg").attr("src", " https://goss.veer.com/creative/vcg/veer/612/veer-101125166.jpg");
    $("#sendimg").attr("src", " https://goss.veer.com/creative/vcg/veer/612/veer-101125166.jpg");
    formData = new FormData();
    layer.open({
        type: 1,
        title: '设置参数/选择图片',
        skin: 'layui-layer-rim', //加上边框
        area: ['350px', '400px'], //宽高
        // content: "<input id='file' type='file'><button onclick='dian();'>上传</buttton>"
        content: "\
        <div class=\"layui-form-item\" style=\"height: 230px;width: 300px;\">\
                <label class=\"layui-form-label\">参数一</label>\
                <div class=\"layui-input-block\">\
        <input type=\"text\" name=\"title\" id=\"msgone\"  placeholder=\"请输入参数一\"\
            class=\"layui-input myinput\">\
    </div>\
    <label class=\"layui-form-label\">参数二</label>\
    <div class=\"layui-input-block\">\
        <input type=\"text\" name=\"title\"  placeholder=\"请输入参数二\"\
            class=\"layui-input myinput\">\
    </div>\
    <label class=\"layui-form-label\">参数三</label>\
    <div class=\"layui-input-block\">\
        <input type=\"text\" name=\"title\" placeholder=\"请输入参数三\"\
            class=\"layui-input myinput\">\
    </div>\
    <a href=\"javascript:;\" class=\"file\" id=\"changefile\">选择图片\
            <form id=\"myform\">\
            <input type=\"file\" accept=\"image/*\" name=\"file\" id=\"file\" onchange=\"writefile()\">\
            </form>\
            <label  name=\"title\" id=\"filename\" style=\"float: left;\"></label>\
    </a>\
    <button class=\"layui-btn layui-btn-normal\" style=\"margin-left: 75%;margin-top:5%;\" onclick='upload();'>提交</button>\
</div>\
        "
    });
}
$("#next").click(function () {
    if (flag == 2) {
        layer.msg("没有了", {
            icon: 5
        });
    } else if (flag == 0) {
        layer.msg("没有上传图片", {
            icon: 5
        });
    } else {
        $("#getimg").attr("src", "http://localhost:8080/getImg/two?random="+Math.random());
        flag = 2;
    }
});
$("#last").click(function () {
    if (flag == 1) {
        layer.msg("没有了", {
            icon: 5
        });
    } else if (flag == 0) {
        layer.msg("没有上传图片", {
            icon: 5
        });
    } else {
        $("#getimg").attr("src", "http://localhost:8080/getImg/one?"+Math.random());
        flag = 1;
    }
});


$(document).ready(function () {
    $("body").css("min-width", document.body.clientWidth + "px");
    $(".img").css("height", (document.body.clientHeight)*0.6 + "px");
    $(".img").css("width", (document.body.clientWidth)*0.37 + "px");
    $(".img").css("height", (document.body.clientHeight)*0.6 + "px");
    $(".img").css("width", (document.body.clientWidth)*0.37 + "px");
    $(".content").css("width", (document.body.clientWidth)-200 + "px");
});

function writefile() {
    var lastname = $("#file").val();
    var obj = lastname.lastIndexOf("\\");
    var name = lastname.substr(obj + 1); //获取文件名
    var showfile = name;
    if (name.length > 15) {
        showfile = name.substring(name.length - 10);
    }
    $("#filename").text(showfile);
}
//加载层
function loading(msg) {
    layer.msg(msg, {
        icon: 16,
        shade: [0.1, '#fff'],
        time: false //取消自动关闭
    });
}

function upload() {
    layer.close(layer.index);
    $("#txt").text("算法一");
    var imgFile = document.getElementById('file');
    var index = imgFile.value.lastIndexOf(".");
    var typefile = imgFile.value.substring(index + 1).toUpperCase();
    // alert(typefile);
    if (imgFile.value == "") {
        layer.msg("未选择文件", {
            icon: 5
        });
    } else if (typefile != "BMP" && typefile != "JPG" && typefile != "JPEG" && typefile != "PNG") {
        layer.msg("请上传图片文件", {
            icon: 5
        });
    } else {
        loading("数据处理中.........");
        $("#sendimg").attr("src", window.URL.createObjectURL(imgFile.files[0]));
        formData.append("file", $('#file')[0].files[0]); //添加图片信息的参数
        setTimeout("up();",10);
    }
}
function up(){
    $.ajax({
        url: "http://localhost:8080/up",
        xhrFields: {
            withCredentials: true
        },
        type: 'POST',
        data: formData,
        cache: false,
        async: false,
        processData: false, //必须false才会避开jQuery对 formdata 的默认处理
        contentType: false, //必须false才会自动加上正确的Content-Type
        success: function (data) {
            layer.closeAll();
            layer.msg("处理成功", {
                icon: 6
            });
            setTimeout("$(\"#getimg\").attr(\"src\", \"http://localhost:8080/getImg/one?\"+Math.random());",100);
            flag = 1;
        },
        error: function (data) {
            layer.alert("失败");
        }
    });
}