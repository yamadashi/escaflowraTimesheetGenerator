var canvas = document.getElementById('canvas');
var input_form = document.getElementById('input_form');
var gen_button = document.getElementById('gen_button');
var uploadImgSrc;


var cast_tl = document.getElementById("cast_tl");
const cast_shift = document.getElementById("cast_shift");
function clone_form() {
    var new_cast_shift = cast_shift.cloneNode(true);
    new_cast_shift.style.display = 'inline';
    cast_tl.appendChild(new_cast_shift);
}
clone_form();

var add_button = document.getElementById("add_button");
add_button.addEventListener('click', clone_form);


// Canvasの準備
canvas.width = 0;
canvas.height = 0;
var ctx = canvas.getContext('2d');
canvas.style.display = "none"; //canvasから画像を生成するがcanvas自体は表示しない

function generateImage() {

    imageDraw();
}

// ファイルが指定された時にloadLocalImage()を実行
gen_button.addEventListener('click', generateImage, false);

// Canvas上に画像を表示する
function imageDraw(imgSrc) {

    // Canvas上に画像を表示
    var img = new Image();
    img.src = uploadImgSrc;

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, this.height * (canvas.width / this.width));

        //編集

        // 画像として出力
        var data = canvas.toDataURL();
        var outputImg = document.createElement('img');
        outputImg.src = data;
        document.getElementById('result').appendChild(outputImg);
    }
}

// Canvas上にテキストを表示する
function addText() {
    ctx.fillStyle = '#fdd000';
    ctx.fillRect(10, 10, 140, 30);

    ctx.font = "bold 20px 'MS Pゴシック'";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#002B69';
    ctx.fillText('ういちゃんぺろぺろ', 80, 25);
}