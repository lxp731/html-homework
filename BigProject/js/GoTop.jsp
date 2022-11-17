var nav = document.querySelector("#NorthBar");
var goBack = document.querySelector(".gotop");
window.addEventListener("scroll",function(){

// pageXOffset：设置或返回当前页面相对于窗口显示区左上角的 X 位置。
// pageYOffset：设置或返回当前页面相对于窗口显示区左上角的 Y 位置。
// pageXOffset 和 pageYOffset 属性相等于 scrollX 和 scrollY 属性。

if(window.pageYOffset >= nav.offsetTop + 600){
goBack.style.display = "block";
}
else{
goBack.style.display = "none";
}

goBack.addEventListener("click", function(){
window.scroll(0,
0);
})
})