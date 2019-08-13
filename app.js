const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //2d로 작업하니까, 3D 등 더 있겠지만?

ctx.strokeStyle = "#2c2c2c"; //라인채우기, 우리가 그릴선이 저 색을 갖는다고 말해주는거임.
ctx.lineWidth = 2.5; //  그리고 그 선의 사이즈는 알려주는거야.

canvas.width = 700; // 윈도우 에게 알려주는거아, canvas의 크기값을 줘야지 펜이 인식하더라
canvas.height = 700;

let painting = false;

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
}
