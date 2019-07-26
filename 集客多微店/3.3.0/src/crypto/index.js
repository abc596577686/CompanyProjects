const CryptoJS = require('crypto-js');  //引用AES源码js
    // let keys = '323031372d6a6b642d236a6b6440757a656e67726f75702e636f6d21';
    const key = CryptoJS.enc.Utf8.parse('jikeduoshopweidi');  //十六位十六进制数作为密钥
    // console.log(key)
    const iv = CryptoJS.enc.Utf8.parse('jikeduoweidianxx');   //十六位十六进制数作为密钥偏移量
    
    //解密方法
    function Decrypt(word) {
      let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
      let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
      let decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
      return decryptedStr.toString();
    }
    
    //加密方法
    function Encrypt(word) {
      let srcs = CryptoJS.enc.Utf8.parse(word);
      let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.ciphertext.toString().toUpperCase();
    }
    
    export default {
        Decrypt ,
        Encrypt
    }
    
// var key = '3132333435363738393041424344454631323334353637383930414243444566';
// console.log('密钥：', key);
// key = CryptoJS.enc.Hex.parse(key)
// iv = CryptoJS.enc.Hex.parse("30313233343536373839414243444546")
// var src = "werty7890";
// console.log('原字符串：', src);
// var enc = CryptoJS.AES.encrypt(src ,key,{
//     iv:iv,
//     mode: CryptoJS.mode.CBC,  
//     padding: CryptoJS.pad.Pkcs7
// })

// //console.log('加密:',enc.toString());
// var enced = enc.ciphertext.toString()
// console.log("加密：", enced);

// var dec = CryptoJS.AES.decrypt(CryptoJS.format.Hex.parse(enced), key,{
//     iv:iv,
//     mode: CryptoJS.mode.CBC,  
//     padding: CryptoJS.pad.Pkcs7
// })
// console.log('解密:',CryptoJS.enc.Utf8.stringify(dec));
