/*
* @ description: 公共底层JS
* @ author: Spring
* @ update: Spring(2016.12.15)
*/

/*=============================================================== common JS ===============================================================*/
var config = {
    version: 1.0,
    siteWidth: 320,
    windowW: $(window).width(),
    windowH: $(window).height(),
    tools: {
        mask: false,
        alert: false,
        loading: false,
        page: false
    }
};

config.tools.mask = $('#j_mask');

/*=============================================================== local JS ===============================================================*/
$(function(){
    //浮动导航
    $('#floatNav').on('click',function(){
        $(this).find('.items').toggle();
    });
    // 返回顶部
    $('#J_ToTop').toTop({
        showHeight: 250,
        speed: 600
    });
    // 全局返回上一步
    (function(){
        var btn = $('.btn-goBack');
        btn.on('click', function(event) {
            if($(this).hasClass('btn-special')){
                return
            }else{
                window.history.go(-1);
            }
        });
    })();

    // header addClass on
    (function($, window){
        var header = $('.header-search-logo, .header-transparent');

        function getScrollTop(){
            var scrolltop = $(this).scrollTop();

            if(scrolltop > 0){
                header.addClass('on');
            }else{
                header.removeClass('on');
            }
        }

        $(window).on('scroll', function(event) {
            getScrollTop();
        }).trigger('scroll');

    })(jQuery, window);

    /***************************************
    * name: mask
    * tips: 动态加载弹窗 mask
    ****************************************/
    (function(){
        if(!$('.mask').size()>0){
            $('body').append('<div class="mask"></div>');
        }
    })();
    /***************************************
    * name: labelGroup
    * tips: 标签切换添加当前状态
    ****************************************/
    labelGroup('.labelGroup','.labelTitleItem','.labelContentItem');
    labelGroup('.skuList','.skuItem');
});

/*===== alert 弹窗类 ===============================================================================================*/
//弹出窗口
function uiAlert(id,callback){
    if(!config.tools.mask.length){
        config.tools.mask = $('<!--S ui-mask--><div class="ui-mask" id="j_mask"></div><!--E ui-mask-->').appendTo('body');
    }
    var elem = config.tools.alert = $(id);
    var func = callback;

    config.tools.mask.show();
    elem.addClass('open');
    config.tools.alert.closeBtns = elem
    .find('.alert-close-botton, .alert-comfrim-btnCancle, .alert-comfrim-btnSure, .dialog-close-btn')
    .bind('click', function(event){
        uiAlertClose(elem);
    });

    // 回调
    doCallback(callback);
}
//关闭弹出窗口
function uiAlertClose(id,callback){
    var elem = $(id);
    var func = callback;

    doCallback(callback);
    config.tools.mask.hide();
    elem.removeClass('open');
}
//窗口切换
function uiAlertSwitch(elem1,elem2,callback){
    var elem1 = $(elem1);
    var elem2 = $(elem2);

    elem1.removeClass('open');
    elem2.addClass('open');
    doCallback(callback);
}
//消息提示窗
function uiAlertMsg(type,text,timeout,callback){
    var type = 'succ' || type, 
        text = text, 
        timeout = timeout, 
        callback = callback,
        html = $('<div class="ui-alert-msg" id="J_UiAlertMsg'+ new Date().getTime() +'"><div class="text"><i class="icon icon-check"></i>'+ text +'</div></div>');

    html.appendTo('body').addClass('show');
    setTimeout(function(){
        html.removeClass('show');
        setTimeout(function(){
            html.remove();
        },200);
    },timeout);
}

/*----------functions-------------*/
//取得事件对象
function getEvent(e) {
    return e || window.event
}
//取得事件目标对象
function getTarget(e) {
    var e=e||window.event,
        target=e.target||e.srcElement;
    return target
}
//执行回调函数
function doCallback(fn){
    if(typeof(fn) == 'function') fn();
}
function show(){
    var arg = arguments;
    for(var i=0;i<arg.length;i++){
        var one = typeof(arg[i]) === 'string'?document.getElementById(arg[i]):arg[i];
        one.style.display = 'block';
    }
}
function hide(){
    var arg = arguments;
    for(var i=0;i<arg.length;i++){
        var one = typeof(arg[i]) === 'string'?document.getElementById(arg[i]) : arg[i];
        one.style.display = 'none';
    }
}

//去除页面滚动
function bodyOver(){
	$('body,html').addClass('bodyOver');
}
function bodyBar(){
	$('body,html').removeClass('bodyOver');
}

//收藏网站
function addToFavorite() {
    var url = "www.xx.com";
    var title = "网站标题";
    if (document.all) {
        window.external.AddFavorite(url, title)
    } else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "")
    } else {
        alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。")
    }
}
/*
name：加载图片
desc：url(目标url),callback(图片加载完成执行的函数)
*/
function loadImg(url,callback){
  var url = url,
      img = new Image();

  img.onload = function(){
    if(typeof(callback) == 'function') callback.call(img);
    img.onload = null;
  }
  img.src = url;
}
/*S------------JQuery微插件---------------*/
(function($) {  
$.fn.extend({ 
    /*
    ===================================================================================
    name：仿iphone开关切换效果
    make: xiaohe (qq)1563482488
    date：2015.12.11
    desc：注意html结构
    ===================================================================================
    */ 
    faToggle: function(ops) {
        var defaults = $.extend({

        }, ops);

        return this.each(function() {
            $(this).on('click',function(){
                if($(this).hasClass('fa-toggle-on'))
                  $(this).removeClass('fa-toggle-on').addClass('fa-toggle-off');
                else
                  $(this).removeClass('fa-toggle-off').addClass('fa-toggle-on');
            });
        });
    },
    /*
    ===================================================================================
    name：淡显幻灯片(banner)
    make: xiaohe (qq)1563482488
    date：2013.03.15
    desc：注意html结构
    ===================================================================================
    */ 
    banner: function(ops) {
        var defaults = $.extend({
            speed: 600,    // 当前的索引
            time: 6000     // 切换间隔
        }, ops);

        return this.each(function() {
            var _this = $(this),
                _imgs = _this.find('.currPic a'),
                _img0 = _this.find('.currPic a:first'),
                _ctrl = _this.find('.currTitle li'),
                _indx = 0;
            //初始化
            _img0.show().siblings('a').hide();
            //自动开始
            var timer = setInterval(IntervalShow, defaults.time);
            //滑过控制按钮
            _ctrl.mouseover(function() {
                _indx = _ctrl.index(this);
                myShow(_indx);
            });
            //滑入停止动画，滑出开始动画
            _this.hover(function() {
                if (timer) {
                    clearInterval(timer);
                    timer = null;
                }
            },function() {
                timer = setInterval(IntervalShow, defaults.time);
            });
            //切换函数
            function myShow(i) {
                _ctrl.eq(i).addClass("on").siblings("li").removeClass("on");
                _imgs.eq(i).stop(true, true).fadeIn(defaults.speed).siblings("a").fadeOut(defaults.speed);
            }
            //定时切换
            function IntervalShow() {
                myShow(_indx);
                _indx++;
                if (_indx == 6) { _indx = 0; }
            }
        });
    },
    /*
    ===================================================================================
    name：选项卡切换(不带延迟加载图片)
    make: xiaohe (qq)1563482488
    date：2013.11.01
    desc：html结构
    ===================================================================================
    */
    taber: function(ops) {
        var defaults = {           
            tabNavs: '.tabNavs', //选项卡头部
            tabNav: '.tabNav', //选项卡头部列表项class
            target: 'data-id', //绑定的目标id
            tabCon: '.tabCon',//选项卡主体列表项class
            onEvent: 'click', //出发事件，mouseover/click
        };
        var options = $.extend(defaults,ops);

        return this.each(function(){
            var _this = $(this),
                event = options.onEvent == 'mouseover'?'mouseover':'click';
            _this.find(options.tabNav).bind(event,function(){
                var that = $('#'+ $(this).attr(options.target));
                $(this).addClass('on').siblings(options.tabNav).removeClass('on');   // 切换tab栏选中状态
                that.addClass('on').siblings(options.tabCon).removeClass('on');   // 切换内容
             });
        });
    },
    /*
    ===================================================================================
    name：点击返回顶部
    make: xiaohe (qq)1563482488
    date：2013.11.01
    desc：暂只支持div下ul li的滚动
    ===================================================================================
    */
    toTop: function(ops) {
        var defaults = {           
            showHeight: 150,
            speed: 1000
        };
        var options = $.extend(defaults,ops);

        var self = $(this);
        $(window).scroll(function(){
            var scrolltop = $(this).scrollTop();     
            if(scrolltop >= options.showHeight){
                self.fadeIn('fast');
            }else{self.hide();}
        });
        self.click(function(){
            $("html,body").animate({scrollTop: 0}, options.speed); 
        });
    },
    hSlider: function(ops) {
        var config=$.extend({
            slideSpeed:200,//滑动速度
            intervalTime:5000,//滑动间隔时间
            autoSlide:true,//是否为自动滑动
            slideStep:1,
            slideDirection:'left',
            prevBtn:'',//控制按钮prev,例如:$('#prevBtn');
            nextBtn:''//控制按钮next,例如:$('#nextBtn');
        }, ops);

        return this.each(function(){
            var outer = $(this),
                inner = outer.find('.sliderInner'),
                item  = inner.find('.item'),
                intervalSlide,
                intervalSlideStatic = false,
                stepWidth=parseInt(item.outerWidth())+parseInt(item.css('margin-left'))+parseInt(item.css('margin-right')),
                innerWidth=item.length*stepWidth,
                liCloneL = item.clone(),
                liCloneR = liCloneL.clone();

            if(config.autoSlide) _startInterval();
            inner.append(liCloneL).prepend(liCloneR).css({'width':3*innerWidth+'px','margin-left':'-'+innerWidth+'px'}); 

            config.prevBtn.click(function(){
                intervalSlideStatic=false;
                _stopInterval();
                _doScroll('right',1,_startInterval);
            });
            config.nextBtn.click(function(){
                intervalSlideStatic=false;
                _stopInterval();
                _doScroll('left',1,_startInterval);
            }); 

            function _doScroll(direction,step,callback){
                var dir = direction,
                    step = step,
                    callback = callback;

                circulation = dir == 'right' ? ':right' : ':left';
                dir = dir == 'right' ? '+='+ stepWidth : '-='+stepWidth;
                step = step ? step : config.slideStep;
                inner.animate({'marginLeft':dir+'px'},config.slideSpeed,function(){
                    if (circulation === ':right') {
                        inner.find('.item:last').prependTo(inner);
                        inner.css('margin-left','-='+ stepWidth);
                    }else{
                        inner.find('.item:first').appendTo(inner);
                        inner.css('margin-left','+='+ stepWidth);
                    };
                    if(config.autoSlide && callback){callback();}
                });
            }
            function _stopInterval(){
                clearInterval(intervalSlide);
            }
            function _startInterval(){
                if (!intervalSlideStatic) {intervalSlide=setInterval(_doScroll,config.intervalTime);intervalSlideStatic=true;};
            }
        });
    },
    /*
    ===================================================================================
    name：鼠标hover延迟执行
    make: xiaohe (qq)1563482488
    date：2014.07.01
    desc：实例：$("#test").hoverDelay({hoverEvent: function(){alert("经过我！");}});
    ===================================================================================
    */ 
    hoverDelay: function(ops){        
        var defaults = {
            hoverDuring: 200,   //鼠标经过的延时时间         
            outDuring: 200,     //鼠标移开的延时时间        
            hoverEvent: function(){
                $.noop();       //鼠标经过执行的方法          
            },            
            outEvent: function(){
                $.noop();       //鼠标移开执行的方法           
            }        
        };        
        var sets = $.extend(defaults,ops || {}); 

        var hoverTimer, outTimer;        
        return $(this).each(function(){
            $(this).hover(function(){
                clearTimeout(outTimer);                
                hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);            
            },function(){
                clearTimeout(hoverTimer);
                outTimer = setTimeout(sets.outEvent, sets.outDuring);
            });
        });
    },
    /*
    ===================================================================================
    name：固定元素（多用于详情页面的tab）
    make: xiaohe (qq)1563482488
    date：2014.04.01
    desc：html结构
    ===================================================================================
    */ 
    fixeder: function(ops) {
        var defaults = $.extend({
            data: 'data-target', //捆绑的对象
            onClass: 'fixed' // 被执行的对象
        }, ops);

        return this.each(function () {
            var _this = $(this),
                target = $('#' +_this.attr(defaults.data)),
                top = _this.offset().top;
            $(window).scroll(function(){
                var lt = $(this).scrollTop() - top;
                if (lt >= 0) {_this.addClass(defaults.onClass);target.show();}
                else {_this.removeClass(defaults.onClass);target.hide();}
            });
        });
    },
    /*
    ===================================================================================
    name：jQuery滑动锚点（多用于详情页面的tab）
    make: xiaohe (qq)1563482488
    date：2014.07.23
    desc：html结构
    ===================================================================================
    */ 
    anchor: function(ops) {
        var defaults = $.extend({
            item: '.tabNav', //描点集合
            data: 'data-anchorID', //捆绑的对象
            adjust: 0, // 调整上下差距
            time: 800  // 滚动时间
        }, ops);

        return this.each(function () {
            var parent = $(this),
                item = parent.find(defaults.item);
            item.click(function(){
                var that = $(this),
                    target = $('#' + that.attr(defaults.data)),
                    tOff = target.offset(),
                    tTop = tOff.top;
                var top = tTop + defaults.adjust;
                $('html,body').animate({'scrollTop':top},defaults.time,function(){
                    that.addClass('on').siblings(defaults.item).removeClass('on');
                });
            });
        });
    },
    /*
    ===================================================================================
    name：全选/反选功能
    make: xiaohe (qq)1563482488
    date：2014.08.15
    desc：只适用于checkbox
    ===================================================================================
    */ 
    selectAll: function(opts) {
        var elem = $(this);
        var o = $.extend({}, {
            item: [] //待选的元素集合
        }, opts);
        
        var item = o.item.filter(function(){
            return $(this)[0] !== elem[0];
        });

        elem.on('change', function(){
            var self = $(this);
            var checked = self.prop('checked');
            elem.filter(function(){
                return $(this)[0] != self[0];                 
            }).prop('checked', checked);
            item.each(function(){
                $(this).prop('checked', checked);
            });
        });
        
        item.each(function(){
            $(this).off().on('change', function(){
                if(item.filter(function(){
                    return $(this).prop('checked') === true;
                }).length === item.length){
                    elem.prop('checked', true);
                }else{
                    elem.prop('checked', false);   
                }
            });
        });
        
        return elem;
        
    },
    /*
    ===================================================================================
    name：全选按钮
    make: coffee (qq)649494509
    date：2016.01.19
    desc：html结构
    ===================================================================================
    */ 
    chooseInput: function(ops) {
        var defaults = $.extend({
            iTemFirst:'.J_chkAll',      // 全选按钮
            iTems: '.J_childCheckBox'    //  子按钮
        }, ops);
                return this.each(function() {
            var _this      =  $(this),
                iTemFirst  =  _this.find(defaults.iTemFirst),
                iTems      =  _this.find(defaults.iTems),
                num        =  1 ;

            iTemFirst.bind( 'click' , function(){
                if(!$(this).hasClass('fi-gou')){
                    iTemFirst.addClass('fi-gou')
                    $(iTems).each(function(){
                        $(this).addClass('fi-gou')

                    });

                }else{

                    iTemFirst.removeClass('fi-gou')
                    $(iTems).each(function(){
                        $(this).removeClass('fi-gou')
                        $('.J_allChoose').removeClass('fi-gou')//对购物车最顶全选按钮做特殊处理
                    });

                };
            });

            iTems.each(function(){
                $(this).bind('click',function(){
                    
                    if($(this).hasClass('fi-gou')){

                        $(this).removeClass('fi-gou') ;
                        iTemFirst.removeClass('fi-gou'); 
                        $('.J_allChoose').removeClass('fi-gou')//对购物车最顶全选按钮做特殊处理
                    } else{  

                        $(this).addClass('fi-gou');
                    }

                    iTems.each(function(){

                        if($(this).hasClass('fi-gou')){
                            num = 1
                            
                        }else{
                            num = 2
                            return false;
                        };
                    });

                    if(num!==2){
                         iTemFirst.addClass('fi-gou');

                    };
                    
                });
            }); 
        });
    },
    chooseInput1: function(ops) {
        var defaults = $.extend({
            iTemFirst:'.J_chkAll',      // 全选按钮
            iTems: '.J_childCheckBox'    //  子按钮
        }, ops);
                return this.each(function() {
            var _this      =  $(this),
                iTemFirst  =  _this.find(defaults.iTemFirst),
                iTems      =  _this.find(defaults.iTems),
                num        =  1 ;

            iTemFirst.bind( 'click' , function(){
                if(!$(this).hasClass('on')){
                                    iTemFirst.addClass('on')
                    $(iTems).each(function(){
                        $(this).addClass('on')

                    });

                }else{

                    iTemFirst.removeClass('on')
                    $(iTems).each(function(){
                        $(this).removeClass('on')
                        $('.J_allChoose').removeClass('on')//对购物车最顶全选按钮做特殊处理
                    });

                };
            });

            iTems.each(function(){
                $(this).bind('click',function(){
                    
                    if($(this).hasClass('on')){

                        $(this).removeClass('on') ;
                        iTemFirst.removeClass('on'); 
                        $('.J_allChoose').removeClass('on')//对购物车最顶全选按钮做特殊处理
                    } else{  

                        $(this).addClass('on');
                    }

                    iTems.each(function(){

                        if($(this).hasClass('on')){
                            num = 1
                            
                        }else{
                            num = 2
                            return false;
                        };
                    });

                    if(num!==2){
                         iTemFirst.addClass('on');

                    };
                    
                });
            }); 
        });
    },
    
    /*
    ===================================================================================
    name：图片类型的全选/反选功能
    make: xiaohe (qq)1563482488
    date：2014.12.19
    desc：只适用于图片类型checkbox，非表单checkbox元素
    ===================================================================================
    */ 
    selectAllIcon: function(opts) {
        var elem = $(this);
        var o = $.extend({}, {
            item: [] //待选的元素集合
        }, opts);
        
        var item = o.item.filter(function(){
            return $(this)[0] !== elem[0];
        });

        elem.bind('click', function(){
            var self = $(this);
            if (self.hasClass('on')){
                self.toggleClass('on');
                item.each(function(){
                    $(this).removeClass('on');
                });
            }else{
                self.toggleClass('on');
                item.each(function(){
                    $(this).addClass('on');
                });
            }
        });
        
        item.each(function(){
            $(this).bind('click', function(){
                $(this).toggleClass('on');
            });
        });
        
        return elem;
        
    }
});    
})(jQuery); 
/*E---JQuery插件---*/
/***************************************
* name: tipsType
* tips: 弹出-信息提示框-仅提示，无后续操作
****************************************/
function alertTips(tipsType,tips){  
/*提示信息种类，有三个可选参数，分别对应三种状态 success:成功 | warning:警告 | error:错误*/
/*设置时间戳*/
var alertTimesId='promt'+(new Date().getTime());
/*设置层深*/
if($('.promt').size()>0){
    $('.promt').css({'z-index':1000});
}
/*提示类型*/
var fiType='fi-success';
if(tipsType=='success'){
    fiType='fi-success';
}else if(tipsType=='warin'){
    fiType='fi-warin';
}else if(tipsType=='wrong'){
    fiType='fi-wrong';
}
/*弹出内容*/
var alertHtml='<div class="promt noMask" id="'+alertTimesId+'" style="z-index:1001;">'+
                '<div class="alertContainer">'+
                    '<div class="alertTips">'+
                        '<i class="fi '+fiType+'"></i>'+
                        '<span class="tips-txt">'+tips+'</span>'+
                    '</div>'+ 
                '</div>'+ 
            '</div>';   
/*加载内容*/
$('body').append(alertHtml);
function setAlert(){
    /*设置样式*/
    var curAlertObj=$('#'+alertTimesId+' .alertContainer');
    curAlertObj.css({'width':curAlertObj.innerWidth(),'margin-left':-curAlertObj.innerWidth()/2});
    /*如果弹出窗高于窗口高度-用绝对定位全部显示*/
    if(curAlertObj.innerHeight()>$(window).height()){
        curAlertObj.css({'margin-top':0});
    }else{
        curAlertObj.css({'margin-top':($(window).height()-curAlertObj.innerHeight())/2});
    }
}
setAlert();
$(window).resize(function(){
    setAlert();
});
/*显示内容*/
$('#'+alertTimesId).addClass('on');
function fadeOutAlertTips(){
    $('#'+alertTimesId).fadeIn(200,removeAlertTips);
    function removeAlertTips(){
        $('#'+alertTimesId).remove();
    }
}
setTimeout(fadeOutAlertTips,1500);
}



/***************************************
* name: labelGroup
* tips: 标签切换添加当前状态
****************************************/
function labelGroup(parent,titleItem,contentItem){
    $(document).on('click',titleItem,function(){
        var curIndex=$(this).index();
        $(this).parents(parent).find(titleItem).removeClass('on');
        $(this).addClass('on');
        if(contentItem){
            $(this).parents(parent).find(contentItem).removeClass('on');
            $(this).parents(parent).find(contentItem).eq(curIndex).addClass('on');
        }
    });
}
