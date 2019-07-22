let app = 
{
    Image: null,
    canvas: null,
    donwloadLink: null, 
    fileBrowser:null,
    submit:null,
    closeResizeForm:null,
    resizeButton:null,
    effectButton1:null,
    effectButton2:null,
    effectButton3:null,
    effectButton4:null,
    effectButton5:null,
    context:null,
    image:null,
    body:null

}


// draw image method for file input method
app.drawImage = function() 
{  
    let canvas = document.getElementById('canvas');
    canvas.width = app.Image.naturalWidth;
    canvas.height = app.Image.naturalHeight;
    let context = canvas.getContext("2d");
    context.drawImage(app.Image, 0, 0, canvas.width,canvas.height);  
}


// drawImage method for drag and drop
app.drawImageDragDrop = function(image)
{
    app.canvas = document.getElementById('canvas');
    app.canvas.width = image.naturalWidth;
    app.canvas.height = image.naturalHeight;
	let context = app.canvas.getContext('2d');
    context.drawImage(image, 0, 0,app.canvas.width, app.canvas.height);
   
}

// drawImage on the background
app.drawBackground=function(image)
{
    app.body=document.getElementById('background');
    app.body.width=image.naturalWidth;
    app.body.height=image.naturalHeight;
    let context=app.body.getContext('2d');
    context.drawImage(image,0,0,app.body.width,app.body.height);
}

// drawImage Method on the canvas after the resize
app.drawImageResize = function(width,height)
{
    let canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
	let context = canvas.getContext('2d');
    context.drawImage(app.Image, 0, 0,canvas.width,canvas.height);
}

//Events

app.load = function () 
{
    app.Image = document.createElement("img");
    app.closeResizeForm=document.getElementById("close");
    app.donwloadLink = document.getElementById("donwloadLink");
    app.fileBrowser = document.getElementById("fileBrowser");
    app.canvas = document.getElementById("canvas");
    app.submit = document.getElementById("submit");
    app.resizeButton=document.getElementById("resizeButton");
    app.effectButton1=document.getElementById("effectButton1");
    app.effectButton2=document.getElementById("effectButton2");
    app.effectButton3=document.getElementById("effectButton3");
    app.effectButton4=document.getElementById("effectButton4");
    app.effectButton5=document.getElementById("effectButton5");
    app.effectButton6=document.getElementById("effectButton6");
    app.context = app.canvas.getContext('2d');
    app.image = document.getElementById("image");
    app.body=document.getElementById("background");

    registerSW();
      
    app.Image.addEventListener("load",function()
    {
        app.drawImage();

    });
 
    app.fileBrowser.addEventListener('change', function(e)
    {  
        let reader = new FileReader();
        reader.addEventListener('load', function(event)
        {
            app.Image.src = event.target.result;
        });
        reader.readAsDataURL(e.target.files[0]);    
    });


    // Method to prevent default of dragover gesture
    document.addEventListener('dragover', function(e)
    {
        e.preventDefault();
    })


    // Here we add the image input with the drop gesture
    document.addEventListener('drop', function (e) 
    {   
    e.preventDefault();
    
    var files = e.dataTransfer.files;
    
    if (files.length > 0) 
    {
        var reader = new FileReader();
      
        reader.addEventListener('load', function (e) 
        {

            let image = document.createElement('img');

            image.addEventListener('load', function()
            {
                app.drawImageDragDrop(this);
            });
            image.setAttribute('src', e.target.result);
        });
        
        reader.readAsDataURL(files[0]);
    }
    });



    // Here are the methods for the effects

    // Method for Sepia Effect
    app.sepia=function()
    {
        let imageData = app.context.getImageData(0, 0, app.context.canvas.width, app.context.canvas.height);
        let data = imageData.data;

		for(var i = 0; i < data.length; i+=4)
		{
			var r = data[i];
			var g = data[i+1];
			var b = data[i+2];
			data[i] = (r * .393) + (g *.769) + (b * .189);//r'
			data[i+1] = (r * .349) + (g *.686) + (b * .168);//g'
			data[i+2] = (r * .272) + (g *.534) + (b * .131);//b'
		}
		app.context.putImageData(imageData, 0, 0);
    }


    // Method for Blue Effect
    app.blue=function()
    {
        let imageData = app.context.getImageData(0, 0, app.context.canvas.width, app.context.canvas.height);
        let data = imageData.data;

		for(var i = 0; i < data.length; i+=4)
		{
			var b = data[i+2];
			data[i] = 0;
			data[i+1] = 0;
			data[i+2] = b;
		}
		app.context.putImageData(imageData, 0, 0);
    }


    // Method for Red Effect
    app.red=function()
    {
        let imageData = app.context.getImageData(0, 0, app.context.canvas.width, app.context.canvas.height);
        let data = imageData.data;

		for(var i = 0; i < data.length; i+=4)
		{
			var r = data[i];
			data[i] = r;//red
			data[i+1] = 0;
			data[i+2] = 0;
		}
		app.context.putImageData(imageData, 0, 0);
    }

   
    // Method for Green Effect
    app.green=function()
    {
        let imageData = app.context.getImageData(0, 0, app.context.canvas.width, app.context.canvas.height);
        let data = imageData.data;

		for(var i = 0; i < data.length; i+=4)
		{
			var g = data[i+1];//green
			data[i] = 0;//r'
			data[i+1] = g;//g'
			data[i+2] = 0;//b'
		}
		app.context.putImageData(imageData, 0, 0);
    }

   

    // Method for inverting colors
    app.invert=function(context)
    {
        let imageData = app.context.getImageData(0, 0, app.context.canvas.width, app.context.canvas.height);
        let data = imageData.data;

		for(var i = 0; i < data.length; i+=4)
		{
			var r = data[i];
			var g = data[i+1];
			var b = data[i+2];
			data[i] = r;
			data[i+1] = g;
			data[i+2] = g;
		}
		app.context.putImageData(imageData, 0, 0);
    }

    

    //Buttons

    // Submit Button

    app.submit.addEventListener('click',function(e)
    {
			var width = $("#width").val();
			var height = $("#height").val();
			if (width === '' || height === '') 
			{
			alert("Please fill all fields!");
			e.preventDefault();
			} 
			else 
			{  
                app.drawImageResize(width,height);
                $(".popup, .content").removeClass("active");
				alert("All good!");
			}
        });


    // Resize Button
    app.resizeButton.addEventListener('click',function(e)
    {
        $(".popup,.content").addClass("active");
    });

    
    // Close Resize Button
    app.closeResizeForm.addEventListener('click',function(e)
    {
            $(".popup, .content").removeClass("active");
    });


    // Buttons for the Effect Methods

    //1
    app.effectButton1.addEventListener('click',function(e)
    {
        let w=app.canvas.width;
        let h=app.canvas.height;
        app.drawImageResize(w,h);
    });

    //2
    app.effectButton2.addEventListener('click',function(e)
    {
            app.sepia();
    });

    //3
    app.effectButton3.addEventListener('click',function(e)
    {
            app.green();
    });

    //4
    app.effectButton4.addEventListener('click',function(e)
    {
            app.red();
    });

    //5
    app.effectButton5.addEventListener('click',function(e)
    {
            app.blue();
    });

    //6
    app.effectButton6.addEventListener('click',function(e)
    {
            app.invert();
    });

    

    

    

    // download button
    $('#download').on("click", function() 
    {  
        app.canvas.toBlob(function (blob) 
        {  
          saveAs(blob, 'output.png');  
        }, 'image/png');
    });

    // draw a triangle
    $('#drawTriangle').click( function() 
    {  
    let canvas = document.getElementById('canvas');
    cx = canvas.getContext('2d');
    cx.beginPath();
    cx.moveTo(500, 100);
    cx.lineTo(100, 700);
    cx.lineTo(900, 700);
    cx.fillStyle = "yellow";
    cx.fill();
    });
    
    // draw a rectangle
    $('#drawRectangle').click( function() 
    {  
    let canvas = document.getElementById('canvas');
    cx = canvas.getContext('2d');
    cx.beginPath();
    cx.rect(20, 20, 150, 100);
    cx.fillStyle = "pink";
    cx.fill();
    cx.fill();
    });

    // draw a circle
    $('#drawCircle').click( function() 
    {  
    let canvas = document.getElementById('canvas');
    cx = canvas.getContext('2d');
    var cX = canvas.width / 2;// center Y
    var cY = canvas.height / 2;// center X
    var radius = 200;
    cx.beginPath();
    cx.arc(cX, cY, radius, 0, 2 * Math.PI, false);
    cx.fillStyle = 'blue';
    cx.fill();
    cx.lineWidth = 20;
    cx.strokeStyle = '#FF000';
    context.stroke();
    });





}

async function registerSW(){
    if('serviceWorker' in navigator){
        try{
            await navigator.serviceWorker.register('service-worker.js');
        }
        catch(e){
            console.log("Registration failed");
        }
    }
}