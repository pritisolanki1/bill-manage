const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;
const andOp = Op.and;
const { or, and, gt, lt } = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.cust_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    cust_name: req.body.cust_name,
    date: req.body.date,
    jangadNo: req.body.jangadNo,
    than: req.body.than,
    weight: req.body.weight,
    rate: req.body.rate,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then(data => {
      debugger
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

  console.log("database: "+req.query.cust_name+" "+req.query.datey+" "+req.query.datem)
  const cust_name = req.query.cust_name;
  const datey = req.query.datey;
  const datem = req.query.datem;
  var condition = cust_name ? { cust_name: { [Op.like]: `%${cust_name}%` } } : null;

  //  var condition = db.Sequelize.where(db.Sequelize.fn('YEAR', db.Sequelize.col('date')), 2021);
  //  var condition = {
  //   [and]: [cust_name ? { cust_name: { [Op.like]: `%${cust_name}%` } } : null,
  //   db.Sequelize.where(db.Sequelize.fn('YEAR', db.Sequelize.col('date')), datey),
  //   db.Sequelize.where(db.Sequelize.fn('month', db.Sequelize.col('date')), datem)]
  // };
  Tutorial.findAll({
    where: condition
    // ,group: 'cust_name'
    // ,group:(db.Sequelize.fn('YEAR', db.Sequelize.col('date')))

  },
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.findwithFilter = (req, res) => {

  console.log("database: "+req.query.cust_name+" "+req.query.datey+" "+req.query.datem)
  const cust_name = req.query.cust_name;
  const datey = req.query.datey;
  const datem = req.query.datem;
  // var condition = cust_name ? { cust_name: { [Op.like]: `%${cust_name}%` } } : null;

  //  var condition = db.Sequelize.where(db.Sequelize.fn('YEAR', db.Sequelize.col('date')), 2021);
   var condition = {
    [and]: [cust_name ? { cust_name: { [Op.like]: `%${cust_name}%` } } : null,
    db.Sequelize.where(db.Sequelize.fn('YEAR', db.Sequelize.col('date')), datey),
    db.Sequelize.where(db.Sequelize.fn('month', db.Sequelize.col('date')), datem)]
  };
  Tutorial.findAll({
    where: condition
    // ,group: 'cust_name'
    // ,group:(db.Sequelize.fn('YEAR', db.Sequelize.col('date')))

  },
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};


// Retrieve all Tutorials from the database.
exports.findAllYear = (req, res) => {
  const cust_name = req.query.cust_name;
  const datey = req.query.datey;
  const datem = req.query.datem;
  var condition = cust_name ? { cust_name: { [Op.like]: `%${cust_name}%` } } : null;

  Tutorial.findAll({
    where: condition
    , order: [
      [db.Sequelize.col('date'), 'DESC'],]
    , group: (db.Sequelize.fn('YEAR', db.Sequelize.col('date')))
    , attributes: [[db.sequelize.fn('YEAR', db.sequelize.col('date')), 'year']]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({

          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
