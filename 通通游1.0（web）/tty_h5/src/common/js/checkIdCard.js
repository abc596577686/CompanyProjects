export function IdCard(UUserCard, num){
	if(num==1){
		//获取出生日期
		birth=UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
		return birth;
	}
	if(num==2){
		//获取性别
		if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
			//男
			return "男";
		} else {
			//女
			return "女";
		}
	}
	if(num==3){
		//获取年龄
		var myDate = new Date();
		var month = myDate.getMonth() + 1;
		var day = myDate.getDate();
		var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
		if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
			age++;
		}
		return age;
	}
}