// 제이쿼리
$(function () {
// 자바스크립트 코드나 제이쿼리 코드

// hide(btn1)버튼을 클릭하면 box1를 숨김
$(".btn1").click(function(){
    // 실행할 코드
    $(".parent .box1").hide()
})

// show 버튼을 클릭하면 box1를 보이게
$("#btn2").click(function(){
    $(".parent .box1").show()
})

 })

// toggle 버튼을 클릭하면 box2를 보이게, 한번 더 클릭하면 숨김 
$("#btn3").click(function(){
    $(".box2").toggle()
})

// big 버튼을 클릭하면 box3의 크기가 두배로 늘어남
$("#btn4").click(function(){
    $(".box3").width(400)
    $(".box3").height(400)
})

// small 버튼을 클릭하면 box3의 크기가 200*200로 줄어듬
$("#btn5").click(function(){
    $(".box3").width(200)
    $(".box3").height(200)
})