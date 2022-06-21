$(".yt-card").on("click", (e) => {
    var targetId = "";
    if(e.target.id.length){
        targetId = e.target.id;
    }
    else if(e.target.parentElement.id){
        targetId = e.target.parentElement.id;
    }
    else if(e.target.parentElement.parentElement.id){
        targetId = e.target.parentElement.parentElement.id;
    }
    else if(e.target.parentElement.parentElement.parentElement.id){
        targetId = e.target.parentElement.parentElement.parentElement.id;
    }
    else if(e.target.parentElement.parentElement.parentElement.parentElement.id){
        targetId = e.target.parentElement.parentElement.parentElement.parentElement.id;
    }
    else if(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id){
        targetId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    }
    console.log(targetId.length);
    btn_choose_mode = targetId;
    $("#upload_img").click();
});
var mode = {
    "inch1": {
        "width": 331,
        "height": 413,
        "each_width": 360,
        "each_height": 600
    },
    "inch2_body": {
        "width": 496,
        "height": 555,
        "each_width": 600,
        "each_height": 600
    },
    "inch2_head": {
        "width": 413,
        "height": 532,
        "each_width": 450,
        "each_height": 600
    },
    "usa": {
        "width": 591,
        "height": 591,
        "each_width": 600,
        "each_height": 600
    }
}
// inch1 || inch2_body || inch2_head || usa
var btn_choose_mode = "";
var rotate_count = 0;
function canvas_draw() {
    // inch1
    var width_crop = mode[btn_choose_mode].width;
    var height_crop = mode[btn_choose_mode].height;
    var each_width = mode[btn_choose_mode].each_width;
    var each_height = mode[btn_choose_mode].each_height;

    $("#yc").html(`<canvas id="canvas" width="1800" height="1200" style="display:none;"></canvas><a id="save_href"><img id="save_img"></a>`);
    var ctx = document.getElementById('canvas').getContext('2d');
    var crop = document.getElementsByTagName('canvas')[1];
    ctx.setLineDash([3, 4]);
    ctx.lineWidth = 2;
    randomColor = ['#f36', '#f63', '#3f6', '#6f3', '#36f', '#63f'];
    ctx.strokeStyle = randomColor[parseInt(Math.random() * 7)];
    for (var i = 0; i < 5; i++) {
        console.log(i * each_width, width_crop)
        ctx.drawImage(crop, i * each_width, 0, width_crop, height_crop);
        ctx.drawImage(crop, i * each_width, 1200 - height_crop, width_crop, height_crop);
    }
    for (var i = 0; i < 5; i++) {
        // left line
        // first row
        ctx.beginPath();
        ctx.moveTo(each_width * i - 2, 0);
        ctx.lineTo(each_width * i - 2, height_crop + 2);
        ctx.stroke();
        // second row
        ctx.beginPath();
        ctx.moveTo(each_width * i - 2, 1200);
        ctx.lineTo(each_width * i - 2, 1200 - height_crop - 2);
        ctx.stroke();
        // right line
        // first row
        ctx.beginPath();
        ctx.moveTo(each_width * i + width_crop + 2, 0);
        ctx.lineTo(each_width * i + width_crop + 2, height_crop + 2);
        ctx.stroke();
        // second row
        ctx.beginPath();
        ctx.moveTo(each_width * i + width_crop + 2, 1200);
        ctx.lineTo(each_width * i + width_crop + 2, 1200 - height_crop - 2);
        ctx.stroke();
    }
    // draw two horizontal line
    ctx.beginPath();
    ctx.moveTo(0, height_crop + 2);
    ctx.lineTo(1800, height_crop + 2);
    ctx.stroke()
    ctx.beginPath();
    ctx.moveTo(0, 1200 - height_crop - 2);
    ctx.lineTo(1800, 1200 - height_crop - 2);
    ctx.stroke();

    ctx.setLineDash([6, 12]);
    ctx.strokeStyle = "#EEE";
    ctx.lineWidth = 6;
    for (var i = -50; i < 100; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 27.8, 1200 - height_crop - 6);
        ctx.lineTo(1200 - height_crop + i * 27.8, height_crop + 6);
        ctx.stroke();
    }
    // };

    var logo = new Image();
    logo.src = "https://s1031432.github.io/yctest/img/logo.png";
    logo.setAttribute("crossOrigin", 'Anonymous');
    logo.onload = () => {
        if (btn_choose_mode != "usa") {
            ctx.drawImage(logo, 840, 550);
        }
        // let img replace canvas
        var saveHref = document.getElementById("save_href");
        var save_img = document.getElementById("save_img");
        var fileName = 'GoldenYears_' + getDateTime(new Date());
        $("#save_href").attr('download', fileName);
        var tempSrc = canvas.toDataURL("image/png");
        saveHref.href = tempSrc;
        save_img.src = tempSrc;
        // $("canvas").hide();
    }
}
function reload() {
    var image = document.querySelector('#image');
    var data = document.querySelector('#data');
    var button = document.getElementById('button');
    var rotate = document.getElementById('rotate');
    var big = document.getElementById('big');
    var small = document.getElementById('small');
    var result = document.getElementById('result');
    var rotate_bar = document.getElementById("rotate_bar");
    var zoom_bar = document.getElementById("zoom_bar");
    var maxCroppedWidth = $(".cropper-container").eq(0).css("width");
    var maxCroppedHeight = $(".cropper-container").eq(0).css("height");
    var zv=0;
    var cropper = new Cropper(image, {
        aspectRatio: mode[btn_choose_mode].width / mode[btn_choose_mode].height,
        viewMode: 0,
        dragMode: 'move',
        autoCropArea: 1,
        restore: false,
        modal: false,
        data: {
            width: maxCroppedWidth,
            // height: 350,
        },
        // cropBoxMovable: false,
        cropBoxResizable: false,
        crop: function(e){
            add_line();
            console.log(e);
        }
    });
    button.onclick = function () {
        crop.innerHTML = '';
        crop.appendChild(cropper.getCroppedCanvas());
        canvas_draw();
        $(".step2").hide();
        $(".cropper-container").remove();
        // $("#crop_div").remove();
        // $("#button").remove();
        $("#yc").append("（點擊圖片即可下載）");
    };
    rotate_bar.oninput = function(){
        cropper.rotateTo(this.value);
    }
    zoom_bar.oninput = function(){
        while(zv!=this.value){
            if(zv < this.value){
                zv += 1;
                cropper.zoom(0.01);
            }
            else{
                zv -= 1;
                cropper.zoom(-0.01);
            }
        }
    }
    // rotate.onclick = function () {
    //     cropper.rotate(90);
    // }
    // big.onclick = function(){
    //     cropper.zoom(0.05);
        
    // }
    // small.onclick = function(){
    //     cropper.zoom(-0.05);
    // }
};

function readFile(input) {
    if (input.files && input.files[0]) {
        file = input.files[0];
    } else {
        return;
    }
    if (file.type.indexOf("image") == 0) {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log(e);
            if (e.total > 30000000) {
                alert("錯誤：檔案太大！");
            }
            else {
                $(`.yt-row-container`).remove();
                image.src = e.target.result;
                reload();
                window.scrollTo(0, 0);
            }
        };
        reader.readAsDataURL(file);
    }
    else {
        alert("上傳的不是圖檔！");
    }
}

$("#upload_img").on("change", function () {
    readFile(this);


    $(".step2").css("display", "block");
    $("#image").css("display", "block");
});

$("#ok").on("click", function () {
    canvas_draw();
    
});