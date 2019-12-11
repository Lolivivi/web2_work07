var notes = document.getElementById("notes");
var box = document.getElementById("box");
var oNavlist = document.getElementById("nav").children;
var slider = document.getElementById("slider");
var left = document.getElementById("left");
var right = document.getElementById("right");
var imgnum = document.getElementsByClassName("slide").length - 2;
var index = 1;
var noteTimer, imgTimer;
var isMoving = false;

//滚动字幕
noteTimer = setInterval(sliding, 15);
//图片自动轮播
imgTimer = setInterval(next, 3000);
//鼠标上滑
box.onmouseover = function(){
	animate(left, {opacity:50});
	animate(right, {opacity:50});
	clearInterval(imgTimer);
}
//鼠标移开
box.onmouseout = function(){
	animate(left, {opacity:0});
	animate(right, {opacity:0});
	imgTimer = setInterval(next, 3000);
}
//左右切换按钮
right.onclick = next;
left.onclick = prev;
//点击图片下标手动切换
for(var i = 0; i < oNavlist.length; ++i){
	oNavlist[i].j = i;
	oNavlist[i].onclick = function(){
		index = this.j + 1;
		navChange();
		animate(slider, {left:-1200 * index});
	}
}