//倒计时
function timer(intDiff) {
    window.setInterval(function() {
        var day = 0,
            hour = 0,
            minute = 0,
            second = 0; //时间默认值     
        if (intDiff > 0) {
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        $('.hour_show').html('<s id="h"></s>' + hour);
        $('.minute_show').html('<s></s>' + minute);
        $('.second_show').html('<s></s>' + second);
        intDiff--;
    }, 1000);
}
//点击取消对话框
$(".dialog-fixed .quit, .dialog-fixed .sure").live('click',function(){
    $('.mask').hide();
    $(this).parents('.dialog-fixed').removeClass('open');
}); 
//点击关闭弹框
$('.close').on('click',function(){
    $(this).parents('.alert').add('.mask').hide();
    $("html").removeClass('ovfHiden');
}); 
//评分
$('.starI dd').on('click',function(){
    var _this=$(this);
    if(_this.hasClass('on')){
        _this.removeClass('on').nextAll().removeClass('on');
    }else{
        _this.addClass('on').prevAll().addClass('on');
    }
});
//tips位置
var tipW=$('.tips').width()/2,
    tipH=$('.tips').height()/2+50;
$('.tips').css({'marginLeft':-tipW,'marginTop':-tipH});
//对话框位置
var diaH=$('.dialog-fixed').height()/2; 
var diaW=$('.dialog-fixed').width()/2; 
$('.dialog-fixed').css({"marginTop":-diaH,"marginLeft":-diaW});  


//列表页筛选
(function(){
	//点击出现筛选条件
	$('#screen').on('click',function(e){
		e.stopPropagation();
		$('.screen').addClass('on');
		bodyOver();
	});  
	//点击隐藏显示筛选条件
	$('.screen-wrap1 .brand .title').on('click',function(e){
		e.stopPropagation();
		var icon = $(this).find('.fi');
		if(icon.hasClass('fi-up')){
			icon.removeClass('fi-up').addClass('fi-down').parent('.title').next().stop().slideUp();
		}else{
			icon.addClass('fi-up').removeClass('fi-down').parent('.title').next().stop().slideDown();
		}
	});
	//重置筛选条件
	$('.J_reset').on('click',function(){
		$('.screen-wrap .item dd').removeClass('on');
		$('.choseClissfy').text('全部');
	});
	//确认筛选条件
	$('.J_sure').on('click',function(){
		$('.screen').removeClass('on');
		$('body').removeClass('bodyOver');
		bodyBar();
	});
	//筛选条件选择
	$('.allClassify').on('click','.item:not(.brand)',function(e){
		e.stopPropagation();
		var thisTxt=$(this).text();
		$(this).addClass('on').siblings().removeClass('on');
		$(this).parents('.screen-wrap1').removeClass('on').prev().removeClass('hide');
		$(this).parents('.screen-wrap1').prev().find('.choseClissfy').text(thisTxt);
	});
	//出现全部分类
	$('.classify').on('click',function(){
		var parents = $(this).parents('#alertMeue');
		parents.find('.screen-wrap1').addClass('on');
	});
	//关闭全部分类
	$('.allClassify .title .fi-prev').on('click',function(){
		var parents = $(this).parents('#alertMeue');
		parents.find('.screen-wrap1').removeClass('on');
	});
	//点击DIV外隐藏DIV
	$(document).on("click",'.screen',function(e){
		if($(e.target).parents(".screen-wrap").length == 0){
			if(!$(e.target).hasClass('screen-wrap')){
				$('#alertMeue').removeClass('on');
				bodyBar();
			}
		}
  	});
	 //设置弹出层高度；
  var alertH=$('.screen-wrap').height()-$('.screen-wrap .screen-wrap-btn').height();
  $('.screen-wrap .items').css({"height":alertH});
}())
