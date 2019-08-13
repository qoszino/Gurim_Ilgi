const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //2d로 작업하니까, 3D 등 더 있겠지만?
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

let INITIAL_COLOR = "#2c2c2c";
let CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE; // 윈도우 에게 알려주는거아, canvas의 크기값을 줘야지 펜이 인식하더라
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // 배경안채우고 그림만 그릴경우 transparent로 저장되서 흰색으로 배경지정해주는거.
ctx.strokeStyle = INITIAL_COLOR; //라인채우기, 우리가 그릴선이 저 색을 갖는다고 말해주는거임.
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 3; //  그리고 그 선의 사이즈는 알려주는거야.

let painting = false;
let filling = false; // 기본값은 폴스

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    //console.log("creating path in", x, y); 신기해! // 그림을 그리고 있지 않을때
    ctx.beginPath(); // 그리지않고, 캔버스위에서 움직이는거보고 비긴패스한다는거야. 그릴 준비를 하는거지.
    ctx.moveTo(x, y); // 그거를 마우스의 x,y좌표로 path를 옮기는거야
  } else {
    //console.log("creating line in", x, y); 신기해!
    ctx.lineTo(x, y); // 그림을 그릴때, Path부터 라인까지 선을 만들수 있다는것. 마우스는 항상 움직이지만 클릭하지 않는다면 painting은 false지
    ctx.stroke(); // lineTo에서 stroke까지는 내가 마우스를 클릭하면서 움직이는 내내 발생하는 것.
    // ctx.closePath(); 라인을 finish 시키는거라 moveTo의 좌표만 남아서 처음찍는 곳에서만 라인이 계속 생성됨.
  }
}

function onMouseDown(event) {
  painting = true;
}

function handleColorClick(event) {
  //console.log(event.target.style); 콘솔에 이벤트 스타일 보려구
  const color = event.target.style.backgroundColor; // event 대상의 style 얻기.
  // console.log(color); color 잘 찍히는지 확인해보려구
  ctx.strokeStyle = color; // 여기서부터는 stroke의 색이 target에 있는 색상이 되는거지.override해주는거야 뜻은 change value.
  ctx.fillStyle = color;
}
function handleRangeChange(event) {
  //console.log(event.target.value); step과 관련이 있는데 스텝에 따라서 브러시 사이즈크기사이사이를 조절가능.
  const size = event.target.value;
  ctx.lineWidth = size;
}
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}
function handleCM(event) {
  event.preventDefault();
}
function handleSaveClick() {
  let image = canvas.toDataURL(); // 빈칸안에 "image/jpeg"안넣어주면 기본값이 png인듯
  let link = document.createElement("a");
  link.href = image; // 세이브하게 만드는 절차! 신기해!!!
  link.download = "Gurim_Ilgi[export]"; // download에는 저장할때의 이름을 넣어야함.
  link.click(); //.click is a function that ＜a＞ has on Javascript.
}
/*function onMouseUp(event) {
  stopPainting(); //painting = false;
}
function onMouseLeave(event) {
  stopPainting(); //painting = false;
}*/
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting); // mousedown은 클릭했을때 발생하는 이벤트
  canvas.addEventListener("mouseup", stopPainting); // 마우스를 땟을때 그림그리기를 스탑
  canvas.addEventListener("mouseleave", stopPainting); // 마우스를 캔버스에서 떠났을때 그림그리기를 스탑
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
); // color는 array안의 각각의 이름을 대표하는거라 이름은 상관없어.

if (range) {
  range.addEventListener("input", handleRangeChange);
}
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
