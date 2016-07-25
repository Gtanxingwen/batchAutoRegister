/*var env = require('../environment.js');
var mylogin = require('../testLoginCommon.js');*/
var myloop = require('./read.js');
//var all_user = myloop.loopReg();
var all_user = [{
  phone:'11111234567',
  psd:'123456'
},{
  phone:'11111234568',
  psd:'123456'
}];
for(i=0;i<2;i++){
  describe('user register a account',function(){
    var URL = 'http://localhost:8080';
    var reg = element(by.css('a[ng-click="register()"]'));
    var name = element(by.id('regist_phone'));
    var	validtxt = element(by.id('phone_validtxt'));
    var validbtn = element(by.id('phone_validbtn'));
    var psd1 = element(by.model('registData.pwd'));
    var psd2 = element(by.model('registData.repeatpwd'));
    var zhuCe = element(by.id('regist_sub'));
    beforeEach(function(){
      browser.driver.manage().window().maximize();
      browser.get(URL+'/#/index');
    });
    it('should register a user',function(){
      browser.sleep(5000);
      reg.click();
      browser.sleep(1000);
      name.sendKeys(all_user[i].phone);

      element(by.css('.handler')).click();
      browser.sleep(1000);
      validbtn.click();
      browser.sleep(1000);

      validtxt.sendKeys('$^_^');
      psd1.sendKeys(all_user[i].psd);
      psd2.sendKeys(all_user[i].psd);
      zhuCe.click();
      browser.sleep(1000);
      expect(element(by.css('.success_info')).isDisplayed()).toBe(true)
    });
  });
}



