count = 0;
function changeImage(boolean){
    list = [
        "images/photo1.png",
        "images/photo2.png",
        "images/photo3.png"
    ];
    colors = [
        "rgb(154, 68, 68)",
        "#BC9B44",
        "#AAB396",
    ];
    if(boolean){
        count++
        if(count > 2) count = 0
        document.getElementById("img").setAttribute("src",list[count])
        document.getElementById("glo").style.color = colors[count]
        }
    else{
        count--
        if(count < 0) count = 2
        document.getElementById("img").setAttribute("src", list[count])
        document.getElementById("glo").style.color = colors[count]
    }
}