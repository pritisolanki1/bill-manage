module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    cust_name:{
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATEONLY
    },
    jangadNo: {
      type: Sequelize.INTEGER
    },
    than: {
      type: Sequelize.INTEGER
    },
    weight: {
      type: Sequelize.DOUBLE
    },
    rate:
    {
      type: Sequelize.DOUBLE
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Tutorial;
};
