const body = document.body,
    html = document.documentElement,
    height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ),
    width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth,)
// const screenWidth = window.screen.width;
// const screenHeight = window.screen.height; 
document.addEventListener('mousemove', function(event){
    //console.log(event);
    // console.log(`event y: ${event.clientY}`);
    // console.log(`event X: ${event.clientX}`);
    x = Math.floor((event.clientX/width)*256);
    y = Math.floor((event.clientY/height)*256 );
    z = (x/2)+(y/2);
    // console.log(x);
    // console.log(z);
    // console.log(y);
    document.body.style.backgroundColor = `rgb(${x},${y},${z})`;

})