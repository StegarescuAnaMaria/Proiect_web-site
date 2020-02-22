window.onload=function()
{
var colored=document.getElementById("color");

colored.checked.onchange=function()
{
	var col_img=document.getElementsByClassName("colored")[0];
	if(!colored.checked)
	{	
col_img.className="vid";
	}
}







var colorless=document.getElementById("colorless");



	var colorless_img=document.querySelectorAll(".black");
	console.log(colorless_img.length);
	if(!colorless.checked)
	for(let i=0; i<coloreless_img.length; i++)
	{
		colorless_img[i].style.display="none";
	}
	
}





