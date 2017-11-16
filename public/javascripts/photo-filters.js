			//brightness effect
			function brightness(ctx, canvas, amount){
				var data = ctx.getImageData(0,0,canvas.width,canvas.height);//get pixel data
				var pixels = data.data;
				for(var i = 0; i < pixels.length; i+=4){//loop through all data
					/*
					pixels[i] is the red component
					pixels[i+1] is the green component
					pixels[i+2] is the blue component
					pixels[i+3] is the alpha component
					*/
					pixels[i] += amount;
					pixels[i+1] += amount;
					pixels[i+2] += amount;
				}
				data.data = pixels;
				ctx.putImageData(data,0,0);//put the image data back
			}

			//contrast effect
			function contrast(ctx, canvas, amount){
				var data = ctx.getImageData(0,0,canvas.width,canvas.height);//get pixel data
				var pixels = data.data;
				for(var i = 0; i < pixels.length; i+=4){//loop through all data
					/*
					pixels[i] is the red component
					pixels[i+1] is the green component
					pixels[i+2] is the blue component
					pixels[i+3] is the alpha component
					*/
					var brightness = (pixels[i]+pixels[i+1]+pixels[i+2])/3; //get the brightness
					
					pixels[i] += brightness > 127 ? amount : -amount;
					pixels[i+1] += brightness > 127 ? amount : -amount;
					pixels[i+2] += brightness > 127 ? amount : -amount;
				}
				data.data = pixels;
				ctx.putImageData(data,0,0);//put the image data back
			}

			//It's time for effects
			function greyscale(ctx, canvas){
				var data = ctx.getImageData(0,0,canvas.width,canvas.height);//get pixel data
				var pixels = data.data;
				for(var i = 0; i < pixels.length; i+=4){//loop through all data
					/*
					pixels[i] is the red component
					pixels[i+1] is the green component
					pixels[i+2] is the blue component
					pixels[i+3] is the alpha component
					*/
					var brightness = (pixels[i]+pixels[i+1]+pixels[i+2])/3; //get the brightness
					//This is not the visually correct brightness
					pixels[i] = pixels[i+1] = pixels[i+2] = brightness;
				}
				data.data = pixels;
				ctx.putImageData(data,0,0);//put the image data back
			}

			//sepia effect - make photos looks old
			function sepia(ctx, canvas){
				var data = ctx.getImageData(0,0,canvas.width,canvas.height);//get pixel data
				var pixels = data.data;
				for(var i = 0; i < pixels.length; i+=4){//loop through all data
					/*
					pixels[i] is the red component
					pixels[i+1] is the green component
					pixels[i+2] is the blue component
					pixels[i+3] is the alpha component
					*/
					//Sepia formula
					pixels[i] = 0.393*pixels[i] + 0.769*pixels[i+1] + 0.189*pixels[i+2];
					pixels[i+1] = 0.349*pixels[i] + 0.686*pixels[i+1] + 0.168*pixels[i+2];
					pixels[i+2] = 0.272*pixels[i] + 0.534*pixels[i+1] + 0.131*pixels[i+2];
				}
				data.data = pixels;
				ctx.putImageData(data,0,0);//put the image data back
			}