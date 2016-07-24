var model = require('./guid_eg');

if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('test.xls');

var infoArr = [];
var user = [];
var info = {
	userName:'',
	phone:'',
	psd:''
};
var flag=1;

var sheet_name_list = workbook.SheetNames;
var table = workbook.Sheets[sheet_name_list[0]];
for(key in table){
	var tag = key.split('');
	if((tag[0]=='H'||tag[0]=='I')&&tag[1]>3){
		infoArr.push(JSON.stringify(table[key].v));
	}
	
}
console.log(infoArr);
for(i=0;i<infoArr.length;i++){
	if(i%2==0){
		info.userName = infoArr[i];
	}
	else{
		info.phone = infoArr[i];
		info.psd = model.guid();
		user.push(JSON.stringify(info));
	}
}
console.log(user)


function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}