/****************************************
* name:zcity
* tips:城市联动
****************************************/
function zcity(id){
	var alertMain='.alert .alert-main'; //用于弹窗窗口滚动时隐藏下拉框，如还有其他特殊滚动窗口，可再添加;
	var cityIniValue=$(id).attr('city-ini'); //初始值
	var cityRangeLabel='city-range'; //属性label
	var cityRangeValue=$(id).attr(cityRangeLabel); //range值
	var zcityItem=' .zcityItem';
	var zcityItemLabel='zcityItem';
	var zcityItemHead=' .zcityItem-head';
	var zcityItemHeadLabel='zcityItem-head';
	var zcityItemMain=' .zcityItem-main';
	var zcityItemMainLabel='zcityItem-main';
	var zcityItemGroup='zcity-item-group' //属性值只能全部小写
	var currentValue=' .currentValue';
	var currentValueLabel='currentValue';
	var cityContainer='cityContainer';
	var citylist=' .citylist';
	var citylistLabel='citylist';
	var cityitem=' .cityitem';
	var cityitemLabel="cityitem";
	var cityTips=' .cityTips';
	var cityTipsLabel='cityTips';
	var cityDefaultTips='请选择'; //默认提示
	var itemLevelLabel='item-level'; //数据层级
	var drapDiffHeight=50; //与window窗口相差高度
	var drapMinWidth=70; //下拉内容的最小宽度
	var onClass='on';
	var trueValue='true-value';
	var zcityGroupIndex='zcity-group-index';

	/****************************************
	* name:cityIniValue
	* tips:初始化
	****************************************/
	if(cityRangeValue != null && cityRangeValue != undefined && cityRangeValue != ''){
		cityRange=strToJson(cityRangeValue);
		var leavelStart=parseInt(cityRange.level_start,10);
		var leavelEnd=parseInt(cityRange.level_end,10);
		if(leavelEnd<leavelStart){
			alert('城市区间配置最大值不能小于最小值！');
			return;
		}else{
			$(id).html('');
			if(cityIniValue != null && cityIniValue != undefined && cityIniValue!=''){
				//有初始值
				cityIniValue=cityIniValue;
				cityIniValue=cityIniValue.replace(/{/g,'');
				cityIniValue=cityIniValue.replace(/}/g,'');
				cityIniValue=cityIniValue.replace(/'/g,'');
				cityIniValue=cityIniValue.replace(/"/g,'');
				cityIniValue=cityIniValue.split(",");
				for(var i=0;i<=leavelEnd-leavelStart;i++){
					var curVal=cityIniValue[i];
					var curValArr=curVal.split("_");
					if(curVal==undefined){
						curVal='';
					}
					$(id).append(addItemHtml(i+leavelStart,curValArr[0],curValArr[1]));	
					if(i==0){
						iniLevel(i+leavelStart);//插入层级数据	
					}else{
						iniNameIndexVal(i+leavelStart,curVal);
					}													
				}
			}else{
				//没有初始值
				for(var i=0;i<=leavelEnd-leavelStart;i++){
					$(id).append(addItemHtml(i+leavelStart,'',''));
					if(i==0){
						iniLevel(i+leavelStart);//插入层级数据		
					}
				}
			}
		}
	}
 	/***************************************
	* name: clickTargetOut
	* tips: 点击DIV之外隐藏Target
	****************************************/
	/*$(document).on('click',function(e){
		var curClass=$(e.target).attr('class');
		if(curClass != currentValueLabel && curClass != zcityItemHeadLabel && curClass != cityitemLabel && curClass != cityTipsLabel){
			$(id+' '+zcityItem).removeClass(onClass);
			$(zcityItemMain).removeClass(onClass);
        }
	});	*/
	/****************************************
	* name:zcityItemHead
	* tips:点击头部
	****************************************/
	$(document).on('click',id+' '+zcityItemHead,function(){
		var curZcityItemGroup=$(this).parent().attr(zcityItemGroup);
		$(zcityItem).removeClass(onClass);
		$(this).parents(zcityItem).addClass(onClass);
		$(zcityItemMain).removeClass('on');
		$(zcityItemMain+'['+zcityItemGroup+'="'+curZcityItemGroup+'"]').addClass('on');
		setPosition(this,curZcityItemGroup,);
	});
	/****************************************
	* name:setPosition
	* tips:设置下拉位置
	****************************************/
	function setPosition(target,fixedMainId){
		var windowH=$(window).height();
		var windowT=$(window).scrollTop();
		var headH=$(target).outerHeight();
		var headW=$(target).outerWidth();
		var mainH=$(zcityItemMain+'['+zcityItemGroup+'="'+fixedMainId+'"]').outerHeight();
		var mainW=0;
		//监听主区域滚动
		$(window).on('scroll',function(){
			$(id+zcityItem).removeClass(onClass);
			$(zcityItemMain).removeClass(onClass);
		});
		$(window).resize(function(){
			$(id+zcityItem).removeClass(onClass);
			$(zcityItemMain).removeClass(onClass);
		});	
		$(alertMain).on('scroll',function(){
			$(id+zcityItem).removeClass(onClass);
			$(zcityItemMain).removeClass(onClass);
		});
		if(headW<drapMinWidth){
			$(target).siblings(zcityItemMain).css({'width':drapMinWidth});
			mainW=drapMinWidth;
		}else{
			$(target).siblings(zcityItemMain).css({'width':headW});
			mainW=headW;
		}
		var showTop=$(target).offset().top;
		var showLeft=$(target).offset().left;
		var bodyScrollTop=$('body').scrollTop();
		if(windowH+windowT>showTop+mainH+drapDiffHeight){//判断向上还是向下
			//$(zcityItemMain+'['+zcityItemGroup+'="'+fixedMainId+'"]').css({'left':showLeft-(mainW-headW),'top':showTop+headH-bodyScrollTop,'width':mainW});
		}else{
			//$(zcityItemMain+'['+zcityItemGroup+'="'+fixedMainId+'"]').css({'left':showLeft-(mainW-headW),'top':showTop-mainH-bodyScrollTop,'width':mainW});
		}
	}
	/****************************************
	* name:iniLevel
	* tips:初始化层级数据
	****************************************/
	function iniLevel(level){
		$(id).find(zcityItem+'['+itemLevelLabel+'="'+level+'"]'+' '+citylist).html('');//清空
		/****************************************
		* name:each
		* tips:遍历数据 - 获得对应层级数据
		****************************************/
		var curLength=0;
		var curItemLi='';
		var curVal='';
		$.each(zcityData,function(name,value){
			if(strAppearNumber('_',name)==level-1){
				curLength=value.length;
				for(var u=0;u<curLength;u++){
					curVal=value[u].split("_");
					curItemLi=curItemLi+'<li class="'+cityitemLabel+'" values="'+curVal[1]+'">'+curVal[0]+'</li>';
				}
			}
		});
		$(id).find(zcityItem+'['+itemLevelLabel+'="'+level+'"]'+' '+citylist).html(curItemLi);//重新赋值
	}
	/****************************************
	* name:iniNameIndexVal
	* tips:初始化名称索引对应数组值
	****************************************/
	function iniNameIndexVal(level,cityVal){
		var nameIndex=0;
		$(id).find(zcityItem+'['+itemLevelLabel+'="'+level+'"]'+' '+citylist).html('');//清空
		/****************************************
		* name:each
		* tips:遍历数据 - 获得对应层级数据
		****************************************/
		$.each(zcityData,function(name,value){
			if(strAppearNumber('_',name)==level-1){
				curLength=value.length;
				for(var u=0;u<curLength;u++){
					if(value[u]==cityVal){
						nameIndex=name;
						return;
					}
				}
			}
		});
		var curItemLi='';
		var curLength=zcityData[nameIndex].length;
		var curVal='';
		for(var k=0;k<curLength;k++){
			curVal=zcityData[nameIndex][k].split("_");
			curItemLi=curItemLi+'<li class="'+cityitemLabel+'" values="'+curVal[1]+'">'+curVal[0]+'</li>';
		}
		$(id).find(zcityItem+'['+itemLevelLabel+'="'+level+'"]'+' '+citylist).html(curItemLi);//重新赋值
	}
	/****************************************
	* name:iniSonLeavel
	* tips:初始化子级数组值
	****************************************/
	function iniSonLeavel(groupIndex,level,cityVal){
		var sonLevel=parseInt(level,10)+1;
		var nameIndex=0;
		$(zcityItemMain+'['+zcityItemGroup+'="'+zcityItemGroup+'-'+groupIndex+'-'+(level+1)+'"]'+citylist).html('');//清空下拉数据
		/****************************************
		* name:each
		* tips:遍历数据 - 获得对应层级数据
		****************************************/
		$.each(zcityData,function(name,value){	
			if(strAppearNumber('_',name)==level-1){
				curLength=value.length;
				for(var u=0;u<curLength;u++){
					var curTrueVal=value[u].split("_")[1];
					if(curTrueVal==cityVal){
						nameIndex=name+'_'+u;
						return;
					}
				}
			}
		});
		var curItemLi='';
		var curLength=zcityData[nameIndex].length;
		var curVal='';
		for(var k=0;k<curLength;k++){
			curVal=zcityData[nameIndex][k].split("_");
			curItemLi=curItemLi+'<li class="'+cityitemLabel+'" values="'+curVal[1]+'">'+curVal[0]+'</li>';
		}
		$(zcityItemMain+'['+zcityItemGroup+'="'+zcityItemGroup+'-'+groupIndex+'-'+(level+1)+'"]'+citylist).html(curItemLi); //重新赋值
	}
	/****************************************
	* name:addItemHtml
	* tips:动态添加ITEMHTML
	****************************************/
	function addItemHtml(itemLevel,iniVal,iniTrueVal){
		var curHtml='<div class="'+zcityItemLabel+'" '+itemLevelLabel+'="'+itemLevel+'">'+
						'<div class="'+zcityItemHeadLabel+'">'+
						     '<input type="text" class="'+currentValueLabel+'" readonly placeholder="请选择" value="'+iniVal+'" '+trueValue+'="'+iniTrueVal+'">'+
						'</div>'+
						'<div class="'+zcityItemMainLabel+'">'+
						     '<div class="'+cityContainer+'">'+
								  '<div class="'+cityTipsLabel+'">'+cityDefaultTips+'</div>'+
								  '<ul class="'+citylistLabel+'"></ul>'+
						     '</div>'+
						'</div>'+
				    '</div>';
		return curHtml;
	}
	/****************************************
	* name:cityitem
	* tips:点击值
	****************************************/
	$(document).on('click',cityitem,function(){
		var curZcityGroupIndex=$(this).parents(zcityItemMain).attr(zcityGroupIndex);
		var curCityItemValue=$(this).attr('values');
		var curCityItemText=$(this).text();
		var curZcityItemGroup=$(this).parents(zcityItemMain).attr(zcityItemGroup);
		var curZcityGroupRange=$(zcityItem+'['+zcityItemGroup+'="'+curZcityItemGroup+'"]').parents(id).attr(cityRangeLabel);
		$(this).parents(zcityItemMain).find(cityitem).removeClass(onClass);
		$(this).parents(zcityItem).addClass(onClass);
		$(this).addClass(onClass);
		//$(zcityItem+'['+zcityItemGroup+'="'+curZcityItemGroup+'"]').addClass(onClass);
		$(zcityItem+'['+zcityItemGroup+'="'+curZcityItemGroup+'"]'+zcityItemHead).find(currentValue).val(curCityItemText).attr(trueValue,curCityItemValue);
		if(curZcityGroupRange == undefined|| curZcityGroupRange == null || curZcityGroupRange == ''){
			return;
		}
		var curCityRange=strToJson(curZcityGroupRange);
		var curLeavelStart=parseInt(curCityRange.level_start,10);
		var curLeavelEnd=parseInt(curCityRange.level_end,10);
		var curItemLeavel=parseInt($(zcityItem+'['+zcityItemGroup+'="'+curZcityItemGroup+'"]').attr(itemLevelLabel),10);
		if(curItemLeavel<curLeavelEnd){
			//清空所有子级赋值
			for(var p=curItemLeavel;p<curLeavelEnd;p++){
				$(id).find(zcityItem+'['+itemLevelLabel+'="'+(p+1)+'"]').find(currentValue).val('').attr(trueValue,'');//清空头部当前数据
				$(zcityItemMain+'['+zcityItemGroup+'="'+zcityItemGroup+'-'+curZcityGroupIndex+'-'+(p+1)+'"]'+citylist).html('');//清空下拉数据
			}
			//重新赋值相邻子级
			iniSonLeavel(curZcityGroupIndex,curItemLeavel,curCityItemValue);
			$(this).parents(id).find(zcityItem).eq($(this).parents(zcityItem).index()+1).find(zcityItemHead).trigger('click');//选择值后自动跳到下一个
		}
	});
	/****************************************
	* name:cityTips
	* tips:点击默认提示
	****************************************/
	$(document).on('click',cityTips,function(){
		var curZcityItemGroup=$(this).parents(zcityItemMain).attr(zcityItemGroup);
		var curZcityGroupRange=$(zcityItem+'['+zcityItemGroup+'="'+curZcityItemGroup+'"]').parents(id).attr(cityRangeLabel);
		if(curZcityGroupRange == undefined|| curZcityGroupRange == null || curZcityGroupRange == ''){
			return;
		}
		var curZcityGroupIndex=$(this).parents(zcityItemMain).attr(zcityGroupIndex);
		var curCityRange=strToJson(curZcityGroupRange);
		var curLeavelStart=parseInt(curCityRange.level_start,10);
		var curLeavelEnd=parseInt(curCityRange.level_end,10);
		var curItemLeavel=parseInt($(zcityItem+'['+zcityItemGroup+'="'+curZcityItemGroup+'"]').attr(itemLevelLabel),10);
		$(zcityItem+'['+zcityItemGroup+'="'+curZcityItemGroup+'"]'+zcityItemHead).find(currentValue).val('').attr(trueValue,'');
		$(zcityItemMain+'['+zcityItemGroup+'="'+curZcityItemGroup+'"]').removeClass(onClass);
		if(curItemLeavel<curLeavelEnd){
			//清空所有子级赋值
			for(var p=curItemLeavel;p<curLeavelEnd;p++){
				$(id).find(zcityItem+'['+itemLevelLabel+'="'+(p+1)+'"]').find(currentValue).val('').attr(trueValue,'');//清空头部当前数据
				$(zcityItemMain+'['+zcityItemGroup+'="'+zcityItemGroup+'-'+curZcityGroupIndex+'-'+(p+1)+'"]'+citylist).html('');//清空下拉数据
			}
		}
	});
	/****************************************
	* name:strAppearNumber
	* tips:字符串出现次数
	****************************************/
	function strAppearNumber(findStr,sourceStr){
		findStr=eval("/"+findStr+"/ig");
		if(sourceStr.match(findStr)==null||sourceStr.match(findStr)==undefined){
			return 0;
		}else{
			return sourceStr.match(findStr).length;
		}
	}
	/***************************************
	* name: strToJson
	* tips: 字符串转Json
	****************************************/
	function strToJson(str){ 
		var json = eval('(' + str + ')'); 
		return json; 
	} 
}
/****************************************
* name:zcityrun
* tips:城市联动运行
****************************************/
function zcityrun(id){
	var size=$(id).size();
	var itemLevel='item-level';
	var zcityFixedContainer='zcityFixedContainer';
	var zcityFixedHtml='<div id="'+zcityFixedContainer+'"></div>';
	var zcityItem=' .zcityItem';
	var zcityItemMain=' .zcityItem-main';
	var zcityItemGroup='zcity-item-group'    //属性值只能全部小写
	var zcityGroupIndex='zcity-group-index'; //索引
	var time='-'+(new Date().getTime()); //动态载入时重新渲染，避免ID重复绑定事件；
	if(!$('#'+zcityFixedContainer).size()>0){
		$('body').append(zcityFixedHtml);
	}
	for(var i=0;i<size;i++){
		var curAttrId=$(id).eq(i).attr('zcity-id');
		if(curAttrId == null || curAttrId == undefined || curAttrId == ''){
			$(id).eq(i).attr('zcity-id','zcity'+i+time);
			zcity(id+'[zcity-id="zcity'+i+time+'"]');
			for(var k=0;k<$(id+'[zcity-id="zcity'+i+time+'"]'+zcityItem).size();k++){
				var curZcityItem=$(id+'[zcity-id="zcity'+i+time+'"]'+zcityItem).eq(k);
				var curLeaveId=curZcityItem.attr(itemLevel);
				curZcityItem.attr(zcityItemGroup,zcityItemGroup+'-'+i+time+'-'+curLeaveId);
				curZcityItem.find(zcityItemMain).attr(zcityItemGroup,zcityItemGroup+'-'+i+time+'-'+curLeaveId);
				curZcityItem.find(zcityItemMain).attr(zcityGroupIndex,i+time);//多个键值无法时，key无法引用变量？
				//$('#'+zcityFixedContainer).append($(zcityItemMain+'['+zcityItemGroup+'='+zcityItemGroup+'-'+i+time+'-'+curLeaveId+']'));
			}
		}
	}
}
/***************************************
* name: zcityOpen
* tips: 打开城市选择插件
****************************************/
function zcityOpen(id,current){
    var cityIni=$(current).attr('city-ini');
    if(!$(id).find('.zcityGroup').size()>0){
        if(cityIni == null || cityIni == undefined || cityIni == ''){
             $(id).append('<div class="zcityGroup" city-range="'+$(current).attr('city-range')+'"></div>');  
        }else{
             $(id).append('<div class="zcityGroup" city-range="'+$(current).attr('city-range')+'" city-ini="'+$(current).attr('city-ini')+'"></div>');  
        }
    }
    zcityrun('.zcityGroup');
    $(id).find('.zcityItem').eq(0).find('.zcityItem-head').trigger('click');
};
/***************************************
* name: zcityClose
* tips: 关闭城市选择插件
****************************************/
function zcityClose(id,target){
    var zcityItem=' .zcityItem';
    var currentValue=' .currentValue';
    var trueValueLabel='true-value';
    var cityIni='city-ini';
    var value='';
    var fullvalue=''
    var truevalue='';
    var allValue='';
    for(var i=0;i<$(id+zcityItem).size();i++){
        value=$(id+zcityItem).eq(i).find(currentValue).val();
        truevalue=$(id+zcityItem).eq(i).find(currentValue).attr(trueValueLabel);
        fullvalue=fullvalue+value;
        if(i==0){
            allValue="'"+value+'_'+truevalue+"'";
        }else{
            allValue=allValue+','+"'"+value+'_'+truevalue+"'";
        }
    }
    console.log(allValue);
    $(target).val(fullvalue).attr(cityIni,'{'+allValue+'}');
};
