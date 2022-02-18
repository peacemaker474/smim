const { sequelize } = require("./models/index");



// 실제 작업 시 force -> false 로 바꾸기 현재 아무런 데이터 없어서 강제로 업데이트(true)
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
