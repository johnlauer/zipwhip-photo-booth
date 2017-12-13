var i = 0;
var photoCount = 1;

// Put event listeners into place
var video = document.getElementById("video");

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

if (navigator.getUserMedia) {
	navigator.getUserMedia({
		video: true
	}, handleVideo, videoError);
}

function handleVideo(stream) {
	video.src = window.URL.createObjectURL(stream);
}

function videoError(e) {
	// do something
}
// Grab elements, create settings, etc.
// var video = document.getElementById("video"),
// 	videoObj = {
// 		"video": true
// 	},
// 	errBack = function(error) {
// 		console.log("Video capture error code: ", error.code);
// 		console.log("Video capture error: ", error);
// 	};

// // Put video listeners into place
// if (navigator.getUserMedia) { // Standard
// 	navigator.getUserMedia(videoObj, function(stream) {
// 		video.src = stream;
// 		video.play();
// 	}, errBack);
// } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
// 	navigator.webkitGetUserMedia(videoObj, function(stream) {
// 		video.src = window.webkitURL.createObjectURL(stream);
// 		video.play();
// 	}, errBack);
// } else if (navigator.mozGetUserMedia) { // WebKit-prefixed
// 	navigator.mozGetUserMedia(videoObj, function(stream) {
// 		video.src = window.URL.createObjectURL(stream);
// 		video.play();
// 	}, errBack);
// }

function loadCanvas() {
	var canvas = document.createElement('canvas');
	div = document.getElementById("canvas-container");
	canvas.id = "canvas-" + i;
	canvas.className = "photo";
	canvas.width = 240 * 3;
	canvas.height = 180 * 3;
	canvas.style.zIndex = 8;
	div.appendChild(canvas);
	div.appendChild(document.createElement('br'));
	var context = document.getElementById('canvas-' + i).getContext("2d");
	context.drawImage(video, 0, 0, 240 * 3, 180 * 3);
	//sepia(context, canvas);
	i++;
}

function flash() {

	$('#timer').css('display', 'none');
	$('#timer').html('');
	var capture = new Audio('/audio/capture.ogg');

	$('body').css('display', 'none');
	var video = document.getElementById("video-container");
	video.style.visibility = "hidden";
	var photos = document.getElementById("canvas-container");
	photos.style.display = "none";


	var capture = new Audio('/audio/capture.ogg');
	capture.play();
	setTimeout(function() {
		loadCanvas();

		$('body').css('display', '');
		video.style.visibility = "visible";
		photos.style.display = "";
		showTimerMessage(photoCount);
		photoCount++;

		setTimeout(function() {
			showTimer();
		}, (photoCount > 4 ? 0 : 3000));

	}, 200);



}

function printDiv(divName) {

	var canvas = document.createElement('canvas');
	canvas.height = 770 * 3;
	canvas.width = 450 * 3;
	var context = canvas.getContext('2d');
	var img0 = new Image();
	var img1 = new Image();
	var img2 = new Image();
	var img3 = new Image();
	var img4 = document.getElementById("zipwhip-vertical")

	img0.src = document.getElementById("canvas-0").toDataURL();
	img1.src = document.getElementById("canvas-1").toDataURL();
	img2.src = document.getElementById("canvas-2").toDataURL();
	img3.src = document.getElementById("canvas-3").toDataURL();

	context.rect(0, 0, 450 * 3, 770 * 3);
	context.fillStyle = "white";
	context.fill();

	//context.translate(width, 0);
	//context.scale(-1, 1)
	setTimeout(function() {
		context.drawImage(img0, 10 * 3, 10 * 3);
	}, 200)
	setTimeout(function() {
		context.drawImage(img1, 10 * 3, 200 * 3); // 180
	}, 200)
	setTimeout(function() {
		context.drawImage(img2, 10 * 3, 390 * 3);
	}, 200)
	setTimeout(function() {
		context.drawImage(img3, 10 * 3, 580 * 3);
	}, 200)
	setTimeout(function() {
		context.drawImage(img4, 825, 200, 181 * 3, 640 * 3);
	}, 200)
	setTimeout(function() {

			roundRect(context, canvas, 5 * 3, 5 * 3, 250 * 3, 190 * 3, 20 * 3);
			roundRect(context, canvas, 5 * 3, 195 * 3, 250 * 3, 190 * 3, 20 * 3);
			roundRect(context, canvas, 5 * 3, 385 * 3, 250 * 3, 190 * 3, 20 * 3);
			roundRect(context, canvas, 5 * 3, 575 * 3, 250 * 3, 190 * 3, 20 * 3);
		}, 200)
		// this was uncommented
		//sepia(context, canvas);
		//context.restore();


	setTimeout(function() {
		$("#final-image-container").html("<img id=final-image src=" + canvas.toDataURL() +
			" style=\"width:260px;margin-top:0px;margin-bottom:-16px;padding:0;\" />"
		);
		sendImage();
	}, 500);
	// setTimeout(function() {
	// 	console.log("we are going to print");
	// 	alert("going to print");
	// 	$("#final-image-container").printIt();
	// }, 700);
	setTimeout(function() {
		document.location = '#final/' + $('#phone').val();
	}, 2500);

}


function roundRect(context, canvas, x, y, w, h, radius) {
	var r = x + w;
	var b = y + h;
	context.beginPath();
	context.strokeStyle = "white";
	context.lineWidth = "10";
	context.moveTo(x + radius, y);
	context.lineTo(r - radius, y);
	context.quadraticCurveTo(r, y, r, y + radius);
	context.lineTo(r, y + h - radius);
	context.quadraticCurveTo(r, b, r - radius, b);
	context.lineTo(x + radius, b);
	context.quadraticCurveTo(x, b, x, b - radius);
	context.lineTo(x, y + radius);
	context.quadraticCurveTo(x, y, x + radius, y);
	context.stroke();
}

function sendImage() {
	var blobBin = atob(document.getElementById("final-image").src.split(',')[1]);
	var array = [];
	for (var i = 0; i < blobBin.length; i++) {
		array.push(blobBin.charCodeAt(i));
	}
	var file = new Blob([new Uint8Array(array)], {
		type: 'image/png'
	});


	var formdata = new FormData();
	formdata.append("photo", file);
	var ph = $('#phone').val();
	ph = ph.replace(/\D/g, "");
	formdata.append("phone", ph);
	$.ajax({
		url: "/send",
		type: "POST",
		data: formdata,
		processData: false,
		contentType: false,
	}).done(function(respond) {
		totalFiles = respond.total;
		console.log('total files', totalFiles)
		console.log('url', respond.url)
		url = respond.url;
		window.url = respond.url;
		//debugger;
		// this is the final transition, so comment out

	});
}

function showTimer() {
	var countdown = new Audio('/audio/countdown.ogg');
	var time = 3;
	var timer = $("#timer");
	var videoDiv = $("#video");

	var offset = videoDiv.offset();
	var width = videoDiv.outerWidth();
	var height = videoDiv.outerHeight();


	var timerInterval = setInterval(function() {
		console.log('timerInterval', time, photoCount);
		var vp = $("video");
		var position = vp.position();
		if (!position) {
			return;
		}
		timer.css('display', '');
		timer.css('left', (vp.width() / 2) + (position.left) - 450);
		timer.css('top', (vp.height() / 2) + (position.top) - 300);
		timer.css('font-size', '500px');

		if (photoCount > 4) {
			clearInterval(timerInterval);
			timerInterval = null;
			timer.css('display', 'none');

			printDiv();
			return;
		}
		if (time < 1) {
			clearInterval(timerInterval);
			timerInterval = null;
			flash();

			return;
		}
		countdown.play();
		timer.html(time);
		time--;
	}, 1000);

}

function getRandomMessage() {
	var messagesArray = [];

	messagesArray.push('Say Zipwhip Christmas Party!')
	messagesArray.push('Say Hi To Santa!')
	messagesArray.push('Work it!')
	messagesArray.push('The camera loves you baby!')
	messagesArray.push('Zipwhip Christmas Party 2017!')
	var to = messagesArray.length;
	var from = 0;
	return messagesArray[((Math.random() * (to - from) + from).toFixed(0) * 1)];
}

function showTimerMessage(photoCount) {
	if (photoCount > 3) {
		return;
	}
	var vp = $("video");
	var position = vp.position();
	if (!position) {
		return;
	}
	var timer = $('#timer');
	timer.css('font-size', '130px');
	timer.css('left', (vp.width() / 2) + (position.left) - 450);
	timer.css('top', (vp.height() / 2) + (position.top) - 250);


	switch (photoCount) {
		case 0:
			timer.css('display', '');
			timer.html(getRandomMessage());
			break;
		case 1:
			timer.css('display', '');
			timer.html(getRandomMessage());
			break;
		case 2:
			timer.css('display', '');
			timer.html(getRandomMessage());
			break;
		case 3:
			timer.css('display', '');
			timer.html('Last photo. Give it all you got!');
			break;
		default:
			timer.css('display', '');
			timer.html("Get ready for your 4 pics!");
			break;
	}
}

setTimeout(function() {
	showTimerMessage();
	setTimeout(function() {
		$("#timer").html('');
		$("#timer").css('display', 'none');
		showTimer();
	}, 3000);
}, 1000);
