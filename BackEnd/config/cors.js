require("dotenv").config();

const configCors = (app) => {
  app.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, process.env.LOCAL_URL);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `X-Requested-With,Content-Type`);
    res.header(`Access-Control-Allow-Credentials`, true);
    next();
  });
};

export default configCors;
