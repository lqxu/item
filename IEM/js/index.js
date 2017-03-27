/**
 * Created by Administrator on 2017/2/24.
 */
<!--返回顶部-->
 $(function(){
     $('#db a').eq(0).click('on',function(){
         $('html,body').animate({scrollTop: '0px'},800);
     });
 });
// 登录界面
$(function(){
    $("#login").click(function(){
        $("#all").addClass('change');
    });
    $('#login_x').click(function(){
        $(".all").removeClass('change');
    });
});
//上下抖动
$(function(){
    $('.jump').each(function(k,obj){
        new JumpObj(obj,10);
    })
});

<!--轮播图-->
$(function(){
    var sps = [];
    //存储定时器
    var timer;
    var spans = $('#spans').get(0);
    var as = $('#sort img');
    // 01动态生成span
    $('#sort img').each(function (index,value) {
        $(spans).append($('<span>').html(index+1).attr('index',index));
    });
    // 1.页面加载后,找到Class等于swapImg的第一个对象，让它显示，它的兄弟元素隐藏
    $(".swapImg").eq(0).show(0).siblings().hide();
    $('#spans').children().eq(0).addClass('color');

    showTimer(0);
    //2 图片span结合 等
    $('#spans').children().mouseover(function () {
        //鼠标放上去之后，展示当前页面，停止定时器
        var index = $(this).attr('index');
        show(index);
        clearInterval(timer);
    }).mouseout(function () {
        //离开后开启定时器
        var index = $(this).attr('index');
        showTimer(index);
    });

    $('#sort').mouseover(function(){
        //鼠标放上去之后，停止定时器
        clearInterval(timer);
    }).mouseout(function(){
        //鼠标离开，开启定时器
        var index = $('#spans .color').attr('index');
        showTimer(index);
    })

    //要求四，当我点击左右切换
    $(".btnLeft").click(function ()
    {
        //1.点击之前要停止轮播
        clearInterval(timer);
        //点了之后，-1
        var index = $('#spans .color').attr('index');
        if (index == 0)
        {
            index =5;
        }
        index--;
        show(index);
        showTime(index);
    });
    $(".btnRight").click(function () {
        //1.点击之前要停止轮播
        clearInterval(timer);
        //点了之后，-1
        var index = $('#spans .color').attr('index');
        if (index == 4) {
            index = -1;
        }
        index++;
        show(index);
        showTime(index);
    });


    //淡入淡出的函数
    function show(index) {
        $(".swapImg").eq(index).fadeIn().siblings().fadeOut();
        $('#spans').children().eq(index).addClass('color').siblings().removeClass('color');
        $('#top-l a').addClass('change');
    }
    //定时轮播
    function showTimer(index) {
        timer =  setInterval(function(){
            index++;
            if(index == '5'){
                index = 0;
            }
            show(index);
        },2000);
    }
    
});
















