/**
 * @desc: 不同环境的请求地址
 */
const BASE_SERVE = new Map()
  .set('test', 'https://www.baidu.com/test') // 测试环境
  .set('prod', 'https://www.baidu.com/prod'); // 生产环境

export default BASE_SERVE.get(import.meta.env.MODE);
