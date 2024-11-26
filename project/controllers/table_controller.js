const { v4: uuidv4 } = require("uuid");
const TableModel = require("../models/table_models");

// UNPROTECTED
exports.get_table = async (req, res) => {
  try {
    await TableModel.find({})
      .populate("table_zone")
      .populate("table_employee")
      .populate("table_order.menu")
      .then((data) => {
        res.status(200).json({
          response: data,
          error: "",
        });
      });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.getone_table = async (req, res) => {
  try {
    const { id } = req.params;
    await TableModel.findOne({ table_id: id })
      .populate("table_zone")
      .populate("table_employee")
      .populate("table_order.menu")
      .then((data) => {
        res.status(200).json({
          response: data,
          error: "",
        });
      });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};

// PROTECTED
exports.create_table = async (req, res) => {
  try {
    const { table_number, table_seat, table_zone } = req.body;
    if (!(table_number && table_seat && table_zone)) {
      return res.status(400).json({
        response: [],
        error: `Input required`,
      });
    }
    var _table = await TableModel.findOne({ table_number: table_number });
    if (_table) {
      return res.status(400).json({
        response: [],
        error: `This table number is already taken`,
      });
    }
    await TableModel.create({
      table_id: uuidv4(),
      table_number: table_number,
      table_seat: table_seat,
      table_zone: table_zone,
      table_status: "close",
      table_employee: [],
      table_customer_amount: "",
      table_order: [],
    }).then(() => {
      res.status(201).json({
        response: [
          {
            message: "create table success",
          },
        ],
        error: ``,
      });
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.delete_table = async (req, res) => {
  try {
    const { id } = req.params;
    await TableModel.findOneAndDelete({ _id: id }).then(() => {
      res.status(200).json({
        response: [
          {
            message: "delete table success",
          },
        ],
        error: ``,
      });
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.open_table = async (req, res) => {
  try {
    const { _id } = req.params;
    const { table_employee, table_customer_amount } = req.body;
    if (!(table_employee && table_customer_amount)) {
      return res.status(400).json({
        response: [],
        error: `Input required`,
      });
    }
    var _table = await TableModel.findOne({ _id: _id });
    if (_table === null) {
      return res.status(400).json({
        response: [],
        error: `Invalid table number`,
      });
    }
    await TableModel.findOneAndUpdate(
      { _id: _id },
      {
        table_id: uuidv4(),
        table_status: "open",
        table_employee: table_employee,
        table_customer_amount: table_customer_amount,
      }
    ).then(() => {
      res.status(200).json({
        response: [{ message: "open table success" }],
        error: "",
      });
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.close_table = async (req, res) => {
  try {
    const { _id } = req.params;
    var _table = await TableModel.findOne({ _id: _id });
    if (_table === null) {
      return res.status(400).json({
        response: [],
        error: `Invalid table number`,
      });
    }
    if (_table.table_order.length !== 0) {
      return res.status(400).json({
        response: [],
        error: `Table order must be empty`,
      });
    }
    await TableModel.findOneAndUpdate(
      { _id: _id },
      {
        table_id: "",
        table_status: "close",
        table_employee: [],
        table_customer_amount: "",
        table_order: [],
      }
    ).then(() => {
      res.status(200).json({
        response: [{ message: "close table success" }],
        error: "",
      });
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.add_order_table = async (req, res) => {
  try {
    const { _id } = req.params;
    const { table_order } = req.body;
    if (!(table_order.length !== 0)) {
      return res.status(400).json({
        response: [],
        error: `Input required`,
      });
    }
    var _table = await TableModel.findOne({ table_id: _id });
    if (_table === null) {
      return res.status(400).json({
        response: [],
        error: `Invalid table number`,
      });
    }
    await TableModel.findOneAndUpdate(
      { table_id: _id },
      {
        $push: { table_order: table_order },
      }
    ).then(() => {
      res.status(200).json({
        response: [{ message: "add order success" }],
        error: "",
      });
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.remove_order_table = async (req, res) => {
  try {
    const { _id } = req.params;
    const { order_ids } = req.body;
    var _table = await TableModel.findOne({ _id: _id });
    if (_table === null) {
      return res.status(400).json({
        response: [],
        error: `Invalid table number`,
      });
    }
    await TableModel.findOneAndUpdate(
      { _id: _id },
      {
        $pull: { table_order: { _id: { $in: order_ids } } },
      }
    );

    res.status(200).json({
      response: [{ message: "remove orders success" }],
      error: "",
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.change_status_order_table = async (req, res) => {
  try {
    const { _id } = req.params;
    const { order_ids, new_status } = req.body;
    var _table = await TableModel.findOne({ _id: _id });
    if (_table === null) {
      return res.status(400).json({
        response: [],
        error: `Invalid table number`,
      });
    }
    await Promise.all(
      order_ids.map((order_id) =>
        TableModel.findOneAndUpdate(
          { _id: _id, "table_order._id": order_id },
          { $set: { "table_order.$.status": new_status } },
          { new: true }
        )
      )
    );

    res.status(200).json({
      response: [{ message: "update order status success" }],
      error: "",
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.check_bill = async (req, res) => {
  try {
    const { _id } = req.params;
    var _table = await TableModel.findOne({ _id: _id });
    if (_table === null) {
      return res.status(400).json({
        response: [],
        error: "Invalid table number",
      });
    }
    if (_table.table_order.length === 0) {
      return res.status(400).json({
        response: [],
        error: `Table order must be not empty`,
      });
    }
    await TableModel.findOneAndUpdate(
      { _id: _id },
      {
        table_id: "",
        table_status: "close",
        table_employee: [],
        table_customer_amount: "",
        table_order: [],
      }
    );
    res.status(200).json({
      response: [{ message: "Close table success" }],
      error: "",
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
