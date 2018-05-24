//tips弹框位置
	var tipW=$('.tips').width()/2,
			tipH=$('.tips').height()/2+100;
	$('.tips').css({'marginLeft':-tipW,'marginTop':-tipH});
	setTimeout(function(){
			$('.tips').removeClass('open');
		},1500);
/*登陆页面获取验证码的倒计时*/
    var value = '60S后重发';
    var countDown = value.substr(0,2);
    var initailValue = '获取验证码';
    function setTime(obj){
        if(countDown == 0){
            obj.removeAttribute('disabled');
            obj.value = initailValue;
            countDown = '10';
            return;
        }else{
            obj.setAttribute('disabled','true');
            obj.value = countDown + 's后重新获取';
            countDown--;
        }
        setTimeout(function(){
            setTime(obj);
        },1000);     
    }	
 //会员页导航
    $('.head-menu').on('click',function(){
        $('.footer').toggle();
    }); 
 // //点击DIV外隐藏DIV
 //    $(document).on("click",'.alert',function(e){
 //        if($(e.target).parents(".alert-content").length == 0)
 //            if(!$(e.target).hasClass('alert-content')){
 //                $('.alert').removeClass('on');
 //                $('html,body').removeClass('ovfHiden');
 //            }   
 //  });  
 //模拟radio-box选择
 $('.chose dd').on('click',function(){
    $(this).addClass('on').siblings().removeClass('on');
 });  
//点击取消对话框
$(".dialog-fixed .quit, .dialog-fixed .sure").on('click',function(){
    $('.mask').hide();
    $(this).parents('.dialog-fixed').removeClass('open');
}); 
//点击关闭弹框
$('.close').on('click',function(){
    $(this).parents('.alert').add('.mask').hide();
});  
//对话框位置
var diaH=$('.dialog-fixed').height()/2; 
var diaW=$('.dialog-fixed').width()/2; 
$('.dialog-fixed').css({"marginTop":-diaH,"marginLeft":-diaW});  



/***************************************
* name: logistcsCompany
* tips: 选择物流公司
****************************************/
(function(id){
    if($(id).size()>0){
        var item=' .logistcs-item';
        var letterBar=' .letter-index-bar';
        var letterItem=' .letter-index-bar .item';
        var size=$(id+item).size();
        var dataId='data-id';
        for(var i=0;i<size;i++){
            var curId=$(id+item).eq(i).attr(dataId);
            $(id+letterItem+'['+dataId+'='+curId+']').addClass('on');  
        }
        $('#logistcsCompany .letter-index-bar .item').click(function(){
            var curItemH=$('#logistcsCompany .logistcs-item .letter').innerHeight();
            var curDataId=$(this).attr('data-id');
            var curLetterP=$("#logistcsCompany .logistcs-item[data-id="+curDataId+"]").offset().top-curItemH;   
            $('html,body').animate({'scrollTop':curLetterP},300);
        });
        var letterBarH=$(id+letterBar).outerHeight();
        $(id+letterBar).css({'margin-top':-letterBarH/2});
    }
})('#logistcsCompany');

