$(function(){

    // fadeOut
    $("#fadeOutBtn").click(function(){
        $(".red-box").fadeOut();
    });

    // fadeIn
    $("#fadeInBtn").click(function(){
        $(".red-box").fadeIn();
    });

    // fadeToggle
    $("#fadeToggleBtn").click(function(){
        $(".green-box").fadeToggle();
    });

    // slideUp
    $("#slideUpBtn").click(function(){
        $(".yellow-box").slideUp();
    });

    // slideDown
    $("#slideDownBtn").click(function(){
        $(".yellow-box").slideDown();
    });

    // slideToggle
    $("#slideToggleBtn").click(function(){
        $(".lime-box").slideToggle();
    });

    // ani1
    $("#ani1Btn").click(function(){
        $(".blue-box").animate({
            left: "500px"
        });
    });

    // ani2
    $("#ani2Btn").click(function(){
        $(".blue-box").animate({
            left: "0px"
        });
    });

});