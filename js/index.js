$(function () {

    var startFlag = 0;
    var score = 0;
    // 1.监听游戏规则的点击
    $(".rules").click(function () {
        $(".rule").stop().fadeIn(100);
    });

    // 2.监听关闭按钮的点击
    $(".close").click(function () {
        $(".rule").stop().fadeOut(100);
    });

    // 3.监听开始游戏按钮的点击
    $(".start").click(function (e) {
        e.stopPropagation();
        $(this).stop().fadeOut(100);
        // 调用处理进度条的方法
        progressHandler();
        // 开始游戏
        score = 0;
        $(".score").text("得分：" + score);
        startFlag = 1;
        startAnimation();
    });

    // 4.监听重新开始按钮的点击
    $(".reStart").click(function (e) {
        e.stopPropagation();
        $(".mask").stop().fadeOut(100);
        // 调用处理进度条的方法
        progressHandler();
        // 开始游戏
        startFlag = 1;
        score = 0;
        $(".score").text("得分：" + score);
        startAnimation();
    });

    // 定义一个专门处理进度条的方法
    function progressHandler() {
        // 重新设置进度条的宽度
        $(".progress").css({
            width: 180
        });
        // 开启定时器处理进度条
        var timer = setInterval(function () {
            // 拿到进度条当前的宽度
            var progressWidth = $(".progress").width();
            // 减少当前的宽度
            progressWidth -= 1;
            // 重新给进度条赋值宽度
            $(".progress").css({
                width: progressWidth
            });
            // 监听进度条是否走完
            if(progressWidth <= 0){
                // 关闭定时器
                clearInterval(timer);
                // 显示重新开始界面
                $(".mask").stop().fadeIn(100);
                // 停止游戏
                stopAnimation();
            }
        }, 100);
    }

    var Timer;
    // 定义一个专门处理灰太狼动画的方法
    function startAnimation() {
        var balloonTop = 600;
        var $arrow1Image;
        var $arrow0Image = $("<img src='./images/arrow0.png' class='arrow0'>"); //弓

        var $balloonImage = $("<img src='./images/balloon.png' class='balloon'>");//气球

        $(".container").append($arrow0Image);
        $(".container").append($balloonImage);

        $(".container").mousemove(function (e) {
            if(e.pageY > 780){
                e.pageY = 780;
            }

            if(e.pageY < 260){
                e.pageY = 260;
            }

            $arrow0Image.css({
                position: "absolute",
                top: e.pageY-300
            });
        });

        $(document).click(function (e) {
            if(startFlag == 0) {
                return;
            }

            if($arrow1Image){
                return;
            }
            $arrow1Image = $("<img src='./images/arrow1.png' class='arrow1'>"); //箭
            $(".container").append($arrow1Image);

            $arrow1Image.css({
                position: "absolute",
                top:$arrow0Image.css("top")
            });

            var Timer1 = setInterval(function () {
                if(!$balloonImage){
                    return;
                }
                var curballoonLeft =parseInt($balloonImage.css("left"));
                var curballoonTop =parseInt($balloonImage.css("top"));
                var curarrow1Left =parseInt($arrow1Image.css("left"))+ 70;
                var curarrow1Top =parseInt($arrow1Image.css("top"))+100;

                if( (curarrow1Left > curballoonLeft - 20 && curarrow1Left < curballoonLeft)
                   && (curarrow1Top > curballoonTop && curarrow1Top < curballoonTop + 80))
                {
                    $(".balloon").remove();
                    $balloonImage = 0;
                    score += 10;
                    $(".score").text("得分：" + score);
                    var progressWidth = $(".progress").width();
                    // 减少当前的宽度
                    progressWidth += 20;
                    // 重新给进度条赋值宽度
                    $(".progress").css({
                        width: progressWidth
                    });
                }
            }, 1);

            $arrow1Image.animate({
                position: "absolute",
                left: 880
            }, 1500, "linear", function () {
                $(this).remove();
                $arrow1Image = undefined;
                clearInterval(Timer1);
            });
        });


        Timer = setInterval(function () {
            balloonTop = balloonTop - 10;
            if(balloonTop < -50){
                balloonTop = 600;
            }
            if(!$balloonImage){
                $balloonImage = $("<img src='./images/balloon.png' class='balloon'>");
                balloonTop = 600;
                $(".container").append($balloonImage);
            }
            else{
                $balloonImage.css({
                    position: "absolute",
                    top:balloonTop + "px"
                });
            }
        }, 50);
    }

    function stopAnimation() {
        $(".arrow0").remove();
        $(".balloon").remove();
        $(".arrow1").remove();
        clearInterval(Timer);
        startFlag = 0;
    }
});