//TODO:
//フォント、フォントサイズ　スケーラビリティ


// Canvasの準備
var canvas = document.getElementById('canvas');
canvas.width = 0;
canvas.height = 0;
var ctx = canvas.getContext('2d');
canvas.style.display = "none"; //canvasから画像を生成するがcanvas自体は表示しない


//フォーム追加
var timeline = document.getElementById("timeline");
const input_form = document.getElementById("input_form");
function clone_form() {
    var new_form = input_form.cloneNode(true);
    new_form.style.display = 'inline';
    //フォーム消去イベント
    var delete_button = getElementsWithAttribute(new_form, "name", "delete")[0];
    delete_button.addEventListener('click', function(){
        timeline.removeChild(new_form);
    });

    timeline.appendChild(new_form);
}
var add_button = document.getElementById("add_button");
add_button.addEventListener('click', clone_form);
//一つ目のフォーム
clone_form();


//画像生成
const baseImageInfo = {
    size: {
        width: 800,
        height: 960
    },
    timelineArea: {
        top: 195,
        bottom: 677,
        leftOffset: 100
    },
    //幅が均一でないためテーブルで位置を保持
    timePosTable: new Map(
        [
            [12, 195],
            [13, 237],
            [14, 280],
            [15, 318],
            [16, 360],
            [17, 400],
            [18, 440],
            [19, 480],
            [20, 519],
            [21, 559],
            [22, 599],
            [23, 639],
            [24, 677]
        ]
    )
}

var gen_button = document.getElementById('gen_button');
function generateImage() {

    // Canvas上に画像を表示
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        //日付を表示
        putDate();

        //名前とラインを表示
        var shiftInfo = getShiftInfo();
        var eachWidth = (baseImageInfo.size.width - baseImageInfo.timelineArea.leftOffset) / shiftInfo.length;
        for (var i = 0; i < shiftInfo.length; i++) {
            var xpos = baseImageInfo.timelineArea.leftOffset + eachWidth * (i + 1 / 2);
            putNameAndLine(xpos, shiftInfo[i]);
        }

        //Canvasを画像として出力
        var data = canvas.toDataURL();
        var outputImg = document.createElement('img');
        //outputImg.crossOrigin = 'anonymous';
        outputImg.src = data;
        var result = document.getElementById('result');
        if (result.firstChild) result.removeChild(result.firstChild);
        result.appendChild(outputImg);
    }
    img.src = "base.jpg";

}
gen_button.addEventListener('click', generateImage, false);

//入力フォームからシフト情報を受け取る
function getShiftInfo() {
    var shiftInfo = [];
    var elm = timeline.firstElementChild;
    while (elm) {
        var info = {
            name: getElementsWithAttribute(elm, "name", "cast_name")[0].value,
            begin: getElementsWithAttribute(elm, "name", "begin")[0].value,
            end: getElementsWithAttribute(elm, "name", "end")[0].value
        }
        shiftInfo.push(info);
        elm = elm.nextElementSibling;
    }
    return shiftInfo;
}

function getElementsWithAttribute(parent, attributeName, value) {
    var elements = [];
    var elm = parent.firstElementChild;
    while (elm) {
        if (elm.getAttribute(attributeName) === value) {
            elements.push(elm);
        }
        elm = elm.nextElementSibling;
    }
    return elements;
}

//日付を表示
function putDate() {
    ctx.font = "40px 'ヒラギノ角ゴ W3'";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(document.getElementById("date").value, baseImageInfo.size.width / 2, baseImageInfo.size.height / 12);
}

//名前とタイムラインを表示
function putNameAndLine(xpos, castInfo) {
    //名前
    ctx.font = "27px 'ヒラギノ明朝 W6'";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = '#375b8b';
    ctx.fillText(castInfo.name, xpos, baseImageInfo.timelineArea.top);
    //タイムライン
    const barWidth = (baseImageInfo.size.width - baseImageInfo.timelineArea.leftOffset) / 30;
    const barTop = calcPos(castInfo.begin);
    const barBottom = calcPos(castInfo.end);
    ctx.fillStyle = '#01aed9';
    ctx.fillRect(xpos - barWidth / 2, barTop, barWidth, barBottom - barTop);
}

function calcPos(timeStr) {
    //数値に変換して範囲外の場合は補正する
    const time = timeStr.split(':');
    var hour = parseInt(time[0]);
    var minute = parseInt(time[1]);
    if (hour < 12 || hour >= 24) {
        hour = 24;
        minute = 0;
    }

    var h_pos = baseImageInfo.timePosTable.get(hour);
    var h_pos_next = baseImageInfo.timePosTable.get(hour + 1);
    if (!h_pos_next) return h_pos; //hourが24のときh_pos_nextはundefined
    return h_pos + minute * (h_pos_next - h_pos) / 60;
}
