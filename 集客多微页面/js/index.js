var inputProvince,inputcity,inputarea,inputProvinceId,inputcityId,inputareaId;
$('#select').click(function(){
	document.getElementById("showPayKey").style.display="none";
	var callback=function(data){
		if(data.code == 1){
			if(data.list != ''){
				var strHtml =''
				for(var i=0;i<data.list.length;i++){
					strHtml += '<li data-code1="'+ data.list[i].areaId +'" onclick="changeTab1(this)">'+ data.list[i].areaName +'<li>';
				}
				$('.tab-province .tab-town').html(strHtml)
			}
		}
	}
	ajaxGet('/wap/getRegionList.msp',{type: 1},callback)
	show1item()
	showModal()
})
$('.tab-shadow').click(function(){
	hideModal();
	document.getElementById("showPayKey").style.display="block";  //中途退出选择也要恢复底部button按钮
})
$('.title-province').click(function(){
	show1item()
})
$('.title-city').click(function(){
	show2item()
})
$('.title-area').click(function(){
	show3item()
})
function changeTab1(that){
	inputProvince = $(that).html();
	inputProvinceId = $(that).data('code1');
	var callback=function(data){
		if(data.code == 1){
			if(data.list != ''){
				var strHtml =''
				for(var i=0;i<data.list.length;i++){
					strHtml += '<li data-code2="'+ data.list[i].areaId +'" onclick="changeTab2(this)">'+ data.list[i].areaName +'<li>';
				}
				$('.tab-city .tab-town').html(strHtml)
				$('.tab-area .tab-placeholder').show()
				$('.tab-area .tab-town').html('')
			}
		}
	}
	ajaxGet('/wap/getRegionList.msp',{type: 2, id: inputProvinceId},callback)
	$('.tab-city .tab-placeholder').hide()
	show2item();
}
function changeTab2(that){
	inputcity = $(that).html();
	inputcityId = $(that).data('code2');
	var callback=function(data){
		if(data.code == 1){
			if(data.list != ''){
				var strHtml =''
				for(var i=0;i<data.list.length;i++){
					strHtml += '<li data-code3="'+ data.list[i].areaId +'" onclick="changeTab3(this)">'+ data.list[i].areaName +'<li>';
				}
				$('.tab-area .tab-town').html(strHtml)
			}
		}
	}
	ajaxGet('/wap/getRegionList.msp',{type: 3, id: inputcityId},callback)
	$('.tab-area .tab-placeholder').hide()
	show3item();
}
function changeTab3(that){
	inputarea = $(that).html();
	inputareaId = $(that).data('code3');
	hideModal();
	$('#select').html(inputProvince+'-'+inputcity+'-'+inputarea);
	$('#selectId1').html(inputProvinceId);
	$('#selectId2').html(inputcityId);
	$('#selectId3').html(inputareaId);
	document.getElementById("showPayKey").style.display="block";
}
function showModal(){
	$('.tab-modal').addClass('active')
	$('.tab-shadow').fadeIn('fast')
}
function hideModal(){
	$('.tab-modal').removeClass('active')
	$('.tab-shadow').fadeOut('fast');
}
function show1item(){
	$('.tab-title').removeClass('active')
	$('.tab-item').removeClass('active')
	$('.title-province').addClass('active')
	$('.tab-province').addClass('active')
}
function show2item(){
	$('.tab-title').removeClass('active')
	$('.tab-item').removeClass('active')
	$('.tab-city').addClass('active')
	$('.title-city').addClass('active')
}
function show3item(){
	$('.tab-title').removeClass('active')
	$('.tab-item').removeClass('active')
	$('.tab-area').addClass('active')
	$('.title-area').addClass('active')
}
function ajaxGet(url, params, callback){
	$.post(url, params, function(data) {
		if(data.code == '1'){
			callback(data);
       }else{
           alert("ajax error");
       }
	}, "json");
}