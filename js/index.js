// 拖拽菜单条
(function () {
    var scrollWrap = document.querySelector('.scrollWrap');
    var inner = document.querySelector('.inner');


    var startPointX = 0,
        startLeft = 0,
        movePointX = 0;

    inner.style.transform = 'translateX(0px)';

    scrollWrap.addEventListener('touchstart', function (ev) {
        startPointX = ev.changedTouches[0].pageX;

        startLeft = parseFloat(inner.style.transform.split("(")[1]);
    });

    scrollWrap.addEventListener('touchmove', function (ev) {
        movePointX = ev.changedTouches[0].pageX - startPointX;

        var x = movePointX + startLeft;

        if(x >= 0) {
            x = 0;
        } else if(x <= scrollWrap.offsetWidth - inner.offsetWidth) {
            x = scrollWrap.offsetWidth - inner.offsetWidth;
        }

        inner.style.transform = 'translateX(' + x +'px)';

        ev.preventDefault();//组织默认事件
    });
})();
// 展开菜单
(function () {
    var more = document.querySelector('.channel .more span');
    var channel = document.querySelector('.channel');
    var shadow = document.querySelector('.shadow');
    var inner = document.querySelector('.inner');

    var time = true;

    more.addEventListener('touchend', function () {
        if(time) {
            channel.classList.add('blockChannel');

            shadow.style.display = 'block';

            inner.style.transform = 'translateX(0px)';
        } else {
            channel.classList.remove('blockChannel');

            shadow.style.display = 'none';
        }

        time = !time;
    });

    shadow.addEventListener('touchstart', function (ev) {
        ev.preventDefault();
    })
})();
// 轮播图
(function () {
   var banner = document.querySelector('.banner');
   var wrap = document.querySelector('.wrap'); 
   var circle = document.querySelectorAll('.banner .circle span');
   var imageWidth = banner.offsetWidth;
   var timer = null;

   var startPointX = 0,
        startLeft = 0,
        movePointX = 0,
        cn = 0,
        ln = 0;
    wrap.innerHTML += wrap.innerHTML;
    var len = wrap.children.length;
    wrap.style.width = len * 100 + 'vw';
    wrap.style.transform = 'translateX(0px)';

    wrap.addEventListener('touchstart', function (ev) {
        wrap.style.transition = null;
        if(cn == 0){
            cn = len / 2;
        }
        if(cn == len - 1) {
            cn = len / 2 - 1;
        }
        wrap.style.transform = 'translateX(' + -cn * imageWidth + 'px)';
        wrap.style.transition = '.3s transform';
        startPointX = ev.changedTouches[0].pageX;

        startLeft = parseFloat(wrap.style.transform.split("(")[1]);
    });

    wrap.addEventListener('touchmove', function (ev) {
        movePointX = ev.changedTouches[0].pageX - startPointX;

        var x = movePointX + startLeft;


        wrap.style.transform = 'translateX(' + x +'px)';

        ev.preventDefault();//组织默认事件
    });

    wrap.addEventListener('touchend', function () {

        var backWidth = imageWidth / 8;
        // movePointX存在是负数得情况所以用math.abs()转化为绝对值
        if(Math.abs(movePointX) > backWidth){
            if(movePointX > 0){
                cn--;
            } else {
                cn++;
            }
        }
        wrap.style.transition = '.3s transform';
        wrap.style.transform = 'translateX(' + -cn*imageWidth +'px)';

        var hn = cn % (len / 2);

        circle[ln].className = '';
        circle[hn].className = 'active';
        ln = hn;


    });
    function move() {
        cn ++;
        wrap.style.transition = '.3s transform';
        wrap.style.transform = 'translateX(' + -cn*imageWidth +'px)';

        wrap.addEventListener('transitionend', function () {
            if(cn == len - 1){
                cn = len / 2 - 1;

                wrap.style.transition = 'null';
                wrap.style.transform = 'translateX(' + -cn*imageWidth +'px)';
            }

        });
        var hn = cn % (len / 2);
        circle[ln].className = '';   //上一个选中的
        circle[hn].className = 'active';
        ln = hn;
    }

    timer = setInterval(move,3000);
})();
// 回到顶部
(function () {
    var backTop = document.querySelector('.backTop');

    window.onscroll = function () {
        var top = window.pageYOffset;

        backTop.style.opacity = top > 600 ? 1 : 0;
    }

    backTop.addEventListener('touchend', function () {
        window.scrollTo(0, 0);
    });
})();