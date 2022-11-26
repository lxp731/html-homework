window.addEventListener('load',function(){
    // 自动播放功能
    // 1.获取元素
    var focus = document.querySelector('.focus');
    var ol = focus.children[1];
    var ul = focus.children[0];
    // 获得focus的宽度
    var w = focus.offsetWidth;
    // 2.利用定时器自动轮播图片
    var index = 0;
    var timer = setInterval(function(){
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    },2000);
    // 等着过渡完成之后，再去判断
    // 监听过渡结束的事件： transitionend
    ul.addEventListener('transitionend',function(){
        // 无缝滚动
        if(index >= 4){
            index = 0;
            // 去掉过渡效果，让ul 快速的跳到目标位置
            ul.style.transition = 'none';
            // 利用最新的索引去滚动图片
            var translatex = - index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        else if(index < 0){
            index = 4;
            ul.style.transition = 'none';
            // 利用最新的索引去滚动图片
            var translatex = - index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 3.小圆点跟随变化效果  类名操作
        // 把ol 里面 li 带有current 类名的选出来去掉类名 remove
        ol.querySelector('.current').classList.remove('current');
        // 让当前索引号的小li 加上current 类 add
        ol.children[index].classList.add('current');
    });
    // 4.手指滑动轮播图
    // 触摸元素 touchstart：获取手指初始坐标
    var startX = 0;     //获取手指初始坐标
    var moveX = 0;     // 移动距离
    var flag = false;  
    ul.addEventListener('touchstart',function(e){
        startX = e.targetTouches[0].pageX;
        // 手指触摸的时候就停止定时器
        clearInterval(timer);
    })
    // 移动手指 touchmove：计算手指的滑动距离，并且移动盒子
    ul.addEventListener('touchmove', function (e) {
        // 计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子：盒子原来的位置 + 手指移动的距离
        var translatex = -index * w + moveX;
        // 手指拖动的时候不需要动画效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;// 如果用户手指移动过我们再去判断 否则不做判断效果
        e.preventDefault();  //阻止滚动屏幕的行为
    })
    // 手指离开根据移动距离去判断是回弹还是播放上一张下一章
    ul.addEventListener('touchend',function(e){
        if(flag){
            //（1）如果移动距离 > 50像素 就播放上一张或者下一张
            if (Math.abs(moveX) > 50) {
                // 如果是右滑 播放上一张 moveX 是正值
                if (moveX > 0) {
                    index--;
                } else {
                    // 如果是左滑 播放下一张 moveX 是负值
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
            else {
                // （2）如果移动距离小于50像素就回弹
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        // 当手指离开的时候就重新开启定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);
    })
})  