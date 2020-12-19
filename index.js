const uuid = require('uuid')
const {arr} = require('./data.js')
/**
 * @description: 根据唯一id进行用户分组
 * @param uniqueId 唯一id,端上(设备id)/h5和小程序（uuid） 小程序最好的为openid，但为了对线上的不影响不错
 * @param level 取第几位分组 1~6 ,getHashCode 生成的为6位数
 * @param groupArr 分组比例，例如 [5,5] [1,3,2] 等累计小于10,因为每次只取1位数做分组
 * @return 0 ~ (groupArr.length -1)
 */
function groupByUniqueId(uniqueId, level = 1, groupArr = [1, 1]) {
  let _uniqueId = String(getHashCode(uniqueId))
  let struNum = _uniqueId[_uniqueId.length - level]
  if (!struNum) {
    throw new Error(`groupByUniqueId:参数 groupArr ${level}取值范围为1~6`)
    return
  }
  let total = groupArr.reduce((a, b) => a + b, 0)
  if (total > 10) {
    throw new Error(`groupByUniqueId:参数 groupArr ${groupArr}累计之和需小于10`)
    return
  }

  let uNum = parseInt(struNum, 16)
  let remain = uNum % total
  let tmp = 0
  for (let i = 0; i < groupArr.length; i++) {
    tmp += groupArr[i]
    if (remain < tmp) {
      return i
    }
  }
}

/**
 * @description:  JS Hash Function,传入一个字符串，返回一个数字,http://www.cnblogs.com/uvsjoh/archive/2012/03/27/2420120.html
 * @param {*}  str: 字符串，例如openid
 * @return {*} caseSensitive 是否区分大小写,true/false
 */
function getHashCode(str, caseSensitive) {
  if (!caseSensitive) {
    str = str.toLowerCase()
  }
  // 1315423911=b'1001110011001111100011010100111'
  let hash = 1315423911; let i; let ch
  for (i = str.length - 1; i >= 0; i--) {
    ch = str.charCodeAt(i)
    hash ^= ((hash << 5) + ch + (hash >> 2))
  }

  return (hash & 0x7FFFFFFF)
}
let a = groupByUniqueId('0000000000000000')
console.log('a: ', a);
let b = groupByUniqueId('0000000023d7de6effffffffefe16260')
console.log('b: ', b);
let len = 100;
// let group = [1,1]
// let level = 1
let test_map = {
  
}
console.log('uuid',len);
new Array(len).fill(0).forEach(v=>{
  let _uuid = uuid.v4()
  let key =  groupByUniqueId(_uuid);
  if(!test_map[key]){
    test_map[key] =[];
  }
  test_map[key].push(_uuid)
})
// console.log('test_map: ', test_map);
for(let x in test_map){
  console.log(x,test_map[x]);
}
console.log('test_map2');
let test_map2 = {}
test_map[0].forEach(v=>{
  let key =  groupByUniqueId(v);
  if(!test_map2[key]){
    test_map2[key] =[];
  }
  test_map2[key].push(v)
})
for(let x in test_map2){
  console.log(test_map2[x].length);
}

let test_map1 = {
  
}

let data = arr.slice(0,len)
console.log('data: ', data.length);
data.forEach(v=>{
  let key =  groupByUniqueId(v);
  if(!test_map1[key]){
    test_map1[key] = [];
  }
  test_map1[key].push(v)
})
// console.log('test_map1: ', test_map1);

for(let x in test_map1){
  console.log(x,test_map1[x].length);
}


