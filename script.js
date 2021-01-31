document.addEventListener('DOMContentLoaded',function(){
    let c=0;
    let i=0;
    let apply;
    let applied_image = false;
    var inputInvoke = document.getElementById('file');
    var background = document.querySelector('#imageInput');
    var image = document.querySelector('#image');
    let context = image.getContext("2d");
    var grid_items = document.querySelectorAll('.grid-item-img');

    var left = document.getElementById('left');
    left.onclick = function () {
        var container = document.getElementById('container');
        slideScroll(container,'left',25,100,10);
    };
    

    var right = document.getElementById('right');
    right.onclick = function () {
        var container = document.getElementById('container');
        slideScroll(container,'right',25,100,10);
    };

    function slideScroll(element, direction, speed, distance, step){
        scrollAmount= 0;
        var slideTimer = setInterval(function(){
            if(direction == 'left'){
                element.scrollLeft -= step;
            }else{
                element.scrollLeft += step;
            }

            scrollAmount += step;
            if(scrollAmount >= distance){
                window.clearInterval(slideTimer);
            }
        }, speed);
    }

        image.width = background.clientWidth;
        image.height = background.clientHeight;
        const img1 = new Image();

    inputInvoke.addEventListener('change',(e) => {
         img1.src = URL.createObjectURL(e.target.files[0]);
         img1.onload = () => {
            context.drawImage(img1 , 0 , 0,img1.width,img1.height,0,0,200,200);
            document.querySelector('#message').innerHTML = "";
            inputInvoke.disabled = 'true';
            c=1;
        };
        
    });

    const img2 = new Image();
    grid_items.forEach(element => {
       element.addEventListener('click',(e) => {
           if(c===0){
                document.querySelector('#message').innerHTML = "Please Upload an image First!";
           }else{
                document.querySelector('#message').innerHTML = "";
                if(applied_image){
                    context.clearRect(0, 0, image.width, image.height);
                    context.globalAlpha = 1.0;
                }
                context.drawImage(img1 , 0 , 0,img1.width,img1.height,0,0,200,200);
                context.globalAlpha = 1.0;
                img2.src = e.target.src;
                context.globalAlpha = 0.45;
                context.drawImage(img2 , 0 , 0,img2.width,img2.height,0,0,200,200);
                apply = e.target.id;
                applied_image = true;
           }
       });
   });


    document.getElementById('downloader').addEventListener('click',() => {
        console.log(c);
        if(c === 0){
            document.querySelector('#message').innerHTML = "Please Upload an image First!";
        }else{
            document.getElementById("downloader").download = "image.png";
            document.getElementById("downloader").href = document.getElementById("image").toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        }
    });

});
