var xhr = new XMLHttpRequest();
xhr.open("GET", "http://123.207.89.151/jrtt/forecast", true);
xhr.setRequestHeader("Content-type","text/plain");
xhr.send();

//获取天气信息并添加函数:
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
        var forecast = JSON.parse(xhr.responseText);
        tomorrow = forecast.明天;
        var div = document.querySelector("div");
        var p = document.createElement("p");
        p.style.position = "relative";
        p.style.top = "25px";
        p.style.margin = "0";
        p.style.color ="white";
        p.style.fontSize ="19px";
        p.style.textAlign = "center";
        p.style.padding ="10px 0px";
        p.style.borderTop = "1px solid";
        p.style.borderBottom = "1px solid";
        for(var i in tomorrow){
            var content = i + ": " + tomorrow[i];
            var br = document.createElement("br");
            var text_node = document.createTextNode(content);
            p.appendChild(text_node);
            p.appendChild(br);
        }
        div.appendChild(p);
    }
}

var cnt = 0;

//创建方块函数:
function creatDiv() {
    document.documentElement.style.height = "100%";
    document.documentElement.style.backgroundColor = "snow";
    var div = document.createElement("div");
    var b = document.querySelector("body");
    b.style.margin = "0";
    div.style.width = "200px";
    div.style.height = "200px";
    div.style.backgroundColor = "darkslategrey";
    div.style.userSelect = "none";
    div.style.position = "absolute";
    div.style.top = "0px";
    div.style.left = "0px";
    div.style.transition = "background-color 0.5s";
    b.appendChild(div);
}


//绑定事件函数:
function addEvent(){
    var div = document.querySelector("div");
    div.addEventListener("dblclick",function(){
        div.style.transition = "left 0.5s, background-color 0.5s";
        var div_w = div.offsetWidth;
        var Width = document.documentElement.offsetWidth;
        var max_width = Width - div_w;
        var left = parseInt(div.style.left);
        if(cnt == 0){
            if(left+500 > max_width)   div.style.left = max_width+"px";
            else                        div.style.left = (left+500)+"px";
        }
        else{
            if(left-500 < 0)            div.style.left = 0+"px";
            else                        div.style.left = (left-500)+"px";
        }
        colorChange(div);
        cnt = cnt==0 ? 1:0;
    },false);
}

//颜色变换函数:
function colorChange(div){
    if(cnt == 0)    div.style.backgroundColor = "#"+ rand();
    else            div.style.backgroundColor = "darkslategrey";       
}


//生成随机数函数:
function rand(){
    var chars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    var color_str = "";
    for(var i = 1; i<=6; i++){
        color_str += chars[Math.floor(Math.random()*16)];
    }
    return color_str;
}

//添加拖拽事件函数:
function setDrag(){
    var div = document.querySelector("div");
    div.onmousedown = mouse_down;
    div.onmouseup = mouse_up;
}


//鼠标按下:
function mouse_down(event){
    var div_drag = document.querySelector("div");
    div_drag.style.transition = "background-color 0.5s";
    var div_w = div_drag.offsetWidth;
    var div_h = div_drag.offsetHeight;
    var Width = document.documentElement.offsetWidth;
    var Height = document.documentElement.offsetHeight;
    var max_height = Height - div_h;
    var max_width = Width - div_w;
    var disX = event.clientX - div_drag.offsetLeft;
    var disY = event.clientY - div_drag.offsetTop;
    document.onmousemove = function(event){ 
        l = event.clientX - disX;
        t = event.clientY - disY;
        console.log(document.documentElement.offsetHeight);
        if(l<0)                 l=0;
        else if(l>max_width)    l=max_width;
        if(t<0)                 t=0;
        else if(t>max_height)   t=max_height;
        div_drag.style.top = t + "px";
        div_drag.style.left = l + "px";
   }
}

//鼠标放开:
function mouse_up(){
    document.onmousemove = null;
    document.onmouseup = null;
}


//添加注释函数:
function addNote(){
    var b = document.querySelector("body");
    var div = document.createElement("div");
    var p = document.createElement("p");
    var note = document.createTextNode("因为单击和拖拽有时候会同时发生,用双击代替了单击.");
    p.appendChild(note);
    div.appendChild(p);
    b.appendChild(div);
    div.style.width = "366px";
    div.style.height = "28px";
    div.style.backgroundColor = "lightgray";
    div.style.userSelect = "none";
    div.style.color = "snow";
    div.style.position = "relative";
    div.style.top = document.documentElement.offsetHeight/9*7 + "px";
    div.style.fontSize = "14px";
    div.style.textAlign = "center";
    div.style.zIndex = "-1";
    div.style.margin = "0 auto";
    div.style.lineHeight = "29px";
}

//预载:
window.onload = function(){
    creatDiv();
    addEvent();
    setDrag();
    addNote();
}
