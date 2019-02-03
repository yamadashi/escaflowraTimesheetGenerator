var file = document.getElementById('file');
var canvas = document.getElementById('canvas');
var uploadImgSrc;

// Canvasの準備
canvas.width = 0;
canvas.height = 0;
var ctx = canvas.getContext('2d');

function loadLocalImage(e) {
    // ファイル情報を取得
    var fileData = e.target.files[0];

    // 画像ファイル以外は処理を止める
    if (!fileData.type.match('image.*')) {
        alert('画像を選択してください');
        return;
    }

    // FileReaderオブジェクトを使ってファイル読み込み
    var reader = new FileReader();
    // ファイル読み込みに成功したときの処理
    reader.onload = function () {
        // Canvas上に表示する
        uploadImgSrc = reader.result;
        canvasDraw();
    }
    // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
}

// ファイルが指定された時にloadLocalImage()を実行
file.addEventListener('change', loadLocalImage, false);

// Canvas上に画像を表示する
function canvasDraw(imgSrc) {

    // Canvas上に画像を表示
    var img = new Image();
    img.src = uploadImgSrc;

    img.onload = function () {
        // canvas内の要素をクリアする
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log(img.height, img.width);

        ctx.drawImage(img, 0, 0, canvas.width, this.height * (canvas.width / this.width));

        // Canvas上にテキストを表示
        addText();

        // canvasを画像に変換
        var data = canvas.toDataURL();

        // 画像として出力
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