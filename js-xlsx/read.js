if(typeof require !== 'undefined') XLSX = require('xlsx');

exports.loopReg = function(){
	var workbook = XLSX.readFile('test.xls');
	var infoArr = [];
	var user = [];
	var info = {
		userName:'',
		phone:'',
		psd:''
	};
	var sheet_name_list = workbook.SheetNames;
	var table = workbook.Sheets[sheet_name_list[0]];
	for(key in table){
		var tag = key.split('');
		if((tag[0]=='H'||tag[0]=='I')&&tag[1]>3){
			infoArr.push(JSON.stringify(table[key].v));
		}
		
	}

	for(i=0;i<infoArr.length;i++){
		if(i%2==0){
			info.userName = infoArr[i];
		}
		else{
			info.phone = infoArr[i];
			info.psd = guid().substr(0,8);
			user.push(JSON.stringify(info));
		}
	}
	for(i=0;i<user.length;i++){ //处理电话
		user[i] = JSON.parse(user[i]);
		user[i].phone = user[i].phone.substr(1,4)+user[i].phone.substr(6,6)+'';
	}
//导出为output.xlsx
	var _headers = ['userName', 'phone', 'psd'];
	var _data = user;
	var headers = _headers
                	.map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65+i) + 1 }))
                	.reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});

	var data = _data
				.map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65+j) + (i+2) })))
				.reduce((prev, next) => prev.concat(next))
				.reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
	// 合并 headers 和 data

	var output = Object.assign({},headers,data);
	// 获取所有单元格的位置
	var outputPos = Object.keys(output);

	// 计算出范围
	var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];

	// 构建 workbook 对象
	var wb = {
    	SheetNames: ['mySheet'],
    	Sheets: {
        	'mySheet': Object.assign({}, output, { '!ref': 'A1:C35' })
    	}
	};

	// 导出 Excel
	XLSX.writeFile(wb, 'output.xlsx');
	return user;

	function guid() {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	        return v.toString(16);
	    });
	}
}; 
