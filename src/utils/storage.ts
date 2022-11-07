/*
 * @Author: liuhua
 * @Date: 2022-11-07 10:57:53
 * @LastEditors: liuhua
 * @LastEditTime: 2022-11-07 11:13:23
 * @Description: storage 方法封装，支持加密，过期时间，添加前缀
 */
import CryptoJS from 'crypto-js';

//#region 加/解密
//十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse('3333e6e143439161');
//十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse('e3bbe7e3ba84431a');

// 加密
const encrypt = (data: object | string): string => {
  if (typeof data === 'object') {
    try {
      data = JSON.stringify(data);
    } catch (e) {
      throw new Error('encrypt error' + e);
    }
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
};

// 解密
const decrypt = (data: string) => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};
//#endregion

//#region config配置，添加/删除前缀函数
const config: {
  type: 'localStorage' | 'sessionStorage';
  prefix: string;
  expire: number;
  isEncrypt: boolean;
} = {
  type: 'localStorage',
  prefix: 'vue3_framework', // 前缀
  expire: 0, // 单位s, 0 默认不过期
  isEncrypt: false
};

//添加前缀，保持唯一性
const autoAddPreFix = (key: string) => {
  const prefix = config.prefix || '';
  return `${prefix}_${key}`;
};
//删除前缀，进行增删改查
const autoRemovePreFix = (key: string) => {
  const lineIndex = config.prefix.length + 1;
  return key.slice(lineIndex);
};
//#endregion

//#region
//setStorage设定值
const setStorage = (key: string, value: any, expire = 0) => {
  //空值重置
  if (value === '' || value === null || value === undefined) {
    value = null;
  }
  //过期时间值合理性判断
  if (isNaN(expire) || expire < 0) throw new Error('Expire must be a number');

  const data = {
    value, //存储值
    time: Date.now(), //存储日期
    expire: (expire ? expire : config.expire) * 1000 //过期时间
  };
  const encryptString = config.isEncrypt
    ? encrypt(JSON.stringify(data))
    : JSON.stringify(data);
  window[config.type].setItem(autoAddPreFix(key), encryptString);
};

//getStorage获取值
const getStorage = (key: string) => {
  // 添加前缀
  if (config.prefix) key = autoAddPreFix(key);
  //不存在判断
  if (
    !window[config.type].getItem(key) ||
    JSON.stringify(window[config.type].getItem(key)) === 'null'
  ) {
    return null;
  }

  const storageVal = config.isEncrypt
    ? JSON.parse(decrypt(window[config.type].getItem(key) as string))
    : JSON.parse(window[config.type].getItem(key) as string);
  const nowTime = Date.now();
  if (storageVal.expire && storageVal.expire < nowTime - storageVal.time) {
    //过期销毁
    removeStorage(autoRemovePreFix(key));
    return null;
  } else {
    return storageVal.value;
  }
};

// getAllStorage 获取所有值
const getAllStorage = () => {
  const storageList: any = {};
  const keys = Object.keys(window[config.type]);
  keys.forEach(key => {
    const value = getStorage(autoRemovePreFix(key));
    if (value !== null) {
      //如果值没有过期，加入到列表中
      storageList[autoRemovePreFix(key)] = value;
    }
  });
  return storageList;
};

// getStorageLength 获取值列表长度
const getStorageLength = () => {
  return window[config.type].length;
};

//removeStorage 删除值
const removeStorage = (key: string) => {
  if (config.prefix) {
    key = autoAddPreFix(key);
  }
  window[config.type].removeItem(key);
};

//清除全部clearStorage
const clearStorage = () => {
  window[config.type].clear();
};
//#endregion

export {
  setStorage,
  getStorage,
  getAllStorage,
  getStorageLength,
  removeStorage,
  clearStorage
};
