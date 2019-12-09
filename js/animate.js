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

//
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj, json, callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj, attr)*100);
			}else{
				now = parseInt(getStyle(obj, attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback && callback();
		}
	}, 30)
}
function animateNote(obj, json, callback){
	for(var attr in json){
		var timer = setInterval(function(){
			var now = parseInt(getStyle(obj, attr));
			now--;
			obj.style[attr] = now + "px";
			if(now == json[attr]){
				callback();
			}
			clearInterval(timer);
		}, 30);
	}
}

function sliding(){
		animateNote(notes, {marginLeft:-350}, function(){
			notes.style.marginLeft = "1000px";
		});	
}
function navChange(){
	for(var i = 0; i < oNavlist.length; ++i){
		oNavlist[i].className = "";
	}
	if(index > imgnum){
		oNavlist[0].className = "active";
	} else if(index == 0) {
		oNavlist[imgnum-1].className = "active";
	} else {
		oNavlist[index-1].className = "active";
	}
}
function next(){
	if(!isMoving){
		isMoving = true;
		index++;
		navChange();
		animate(slider, {left:-1200 * index}, function(){
			if(index > imgnum){
				slider.style.left = "-1200px";
				index = 1;
			}
			isMoving = false;
		});
	}
}
function prev(){
	if(!isMoving){
		isMoving = true;
		index--;
		navChange();
		animate(slider, {left:-1200 * index}, function(){
			if(index == 0){
				slider.style.left = "-6000px";
				index = imgnum;
			}
			isMoving = false;
		});
	}
}

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