const Mock = require('mockjs');
const sleep = s =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, s * 1000);
  });
module.exports = {
  'GET /api/today': Mock.mock({ world: 'hello' }),
  'POST /login/account': async (req, res) => {
    await sleep(2);
    const { password, username } = req.body;
    if (password === '888888' && username === 'admin') {
      return res.status(200).json({
        code: 0,
        msg: '登录成功',
        data: {
          id: 1,
          username: 'iris',
          age: 22
        }
      });
    } else {
      return res.status(200).json({
        code: -1,
        msg: '账号或密码错误',
        data: null
      });
    }
  }
};
