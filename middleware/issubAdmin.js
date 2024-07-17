const db = require('../config/connection');
const User = db.user;

module.exports = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "subAdmin") {
            next();
            return;
          }
        }
        res.status(403).send({
          message: "Require subAdmin authorization!"
        });
        return;
      });
    });
  };