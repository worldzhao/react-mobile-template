const sleep = s =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, s * 1000);
  });

module.exports = { sleep };
