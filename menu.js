window.onload=function()
{
var menu=document.getElementsByClassName("container")[0];
var imagine=document.createElement("img");
imagine.src="/imagini/home2.png";
imagine.alt="Home Page";
imagine.style.width="24";
imagine.style.height="23";
var li=document.createElement("li");
var a=document.createElement("a");
a.href="/";
a.appendChild(imagine);
li.appendChild(a);
//li.appendChild(imagine);

//imagine.innerHTML='<li><img src="/imagini/home2.png" alt="" width="8" height="7.57">A</li>';

menu.insertBefore(li, menu.childNodes[0]);
var main=document.querySelector("main");
var p=document.createElement("p");
//p.nodeValue="Paragraph for news...";
var l=document.createTextNode("Paragraph for news");
p.appendChild(l);
p.style.color="red";
var p2=document.createElement("p");
var l2=document.createTextNode("Paragraph for removal ");
p2.appendChild(l2);
p2.style.color="blue";
var div=document.createElement("div");
div.appendChild(p);
div.appendChild(p2);
main.insertBefore(div, main.childNodes[5]);

div.id="par";

var h=document.querySelector("h1");
h.onload=function()
{
	alert("Welcome");
}

var btn1=document.createElement("button");
var btn2=document.createElement("button");
//console.log(texts);
btn1.innerText='stop alert1';
btn2.innerText='stop alert2';

main.insertBefore(btn2, main.childNodes[1]);
main.insertBefore(btn1, main.childNodes[1]);

btn1.onclick=stopf;
btn2.onclick=stop;
var arr=document.getElementById("par");
main.removeChild(arr);

var w=window.setTimeout(Al, 3000);

var v=window.setInterval(Int, 10000);

function Al()
{
	alert("Alert1: \n       .-- . .-.. -.-. --- -- .");
}

function stopf()
{
	clearTimeout(w);
}

function Int()
{
	alert("Alert2: \n   Spread the Message");
}

function stop()
{
	clearInterval(v);
}



var img=document.createElement("img");
img.src="/imagini/transparentplanet.png";
img.width="100";
img.height="100";
img.style.position="relative";
console.log(img.style.position);

main.appendChild(img);


var id = setInterval(framess, 5);
var pos = 0;
var posY =80;
img.style.left="1px";
img.style.top="500px";
console.log(img.style.left);
function framess() 
{
    if (img.style.left=="2000px")		
      clearInterval(id);
     else 
	{
		console.log("aici");
      pos++; 
	  posY-=2;
	  var aux=img.getComputedStyle;
      //img.style.top++;
      img.style.left= pos +'px';
	  img.style.top= posY+'px';
	  console.log(img.style.left);
    }
}
}
