const db = require('../dbcon');
const CustomError = require('../errors/customError');

const controller = {};

// manager upload product
controller.managerUploadProduct = (req, res, next) => {
  const { phone } = req.params;
  const { product_name, category, price, short_desc, additional_desc } =
    req.body;

  const filteredQ = `INSERT INTO products (uploader_phone, product_name, category, price, short_desc, additional_desc) VALUES ('${phone}', '${product_name}', '${category}', '${price}', '${short_desc}','${JSON.stringify(
    additional_desc
  )}')`;

  db.query(filteredQ, (err) => {
    if (err) {
      next(new CustomError(err.message, 500, err.code));
    } else {
      res
        .status(200)
        .json({ success: true, message: 'Pruduct successfully uploaded' });
    }
  });
};

// manager get all products
controller.managerGetAllProduct = (req, res, next) => {
  const { phone } = req.params;

  const q = `SELECT * FROM products WHERE uploader_phone='${/01248963241/i}'`;
  db.query(q, (err, result) => {
    if (err) {
      next(new CustomError(err.message, 500, err.code));
    } else {
      res.status(200).json({ success: true, data: result });
    }
  });
};

// manager update product
controller.managerUpdateProduct = (req, res, next) => {
  const { id } = req.params;
  const { product_name, category, price, short_desc, additional_desc } =
    req.body;

  const filteredQ = `UPDATE products SET product_name = '${product_name}', category = '${category}', price = '${price}', short_desc = '${short_desc}',  additional_desc = '${JSON.stringify(
    additional_desc
  )}' WHERE id = ${id}`;

  db.query(filteredQ, (err) => {
    if (err) {
      next(new CustomError(err.message, 500, err.code));
    } else {
      res
        .status(200)
        .json({ success: true, message: 'Pruduct successfully updated' });
    }
  });
};

// manager delete product
controller.managerdeleteProduct = (req, res, next) => {
  const { id } = req.params;
  const { phone } = req.body;

  db.query(
    `SELECT uploader_phone FROM products WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        next(new CustomError(err.message, 500, err.code));
      } else {
        if (result[0].uploader_phone === phone) {
          db.query(
            `UPDATE products SET status = 'Disabled' WHERE id = ${id}`,
            (err) => {
              if (err) {
                next(new CustomError(err.message, 500, err.code));
              } else {
                res.status(200).json({
                  success: true,
                  message: 'Product successfully deleted',
                });
              }
            }
          );
        } else {
          next(
            new CustomError("You cannot delete other's product"),
            401,
            'Unauthorized'
          );
        }
      }
    }
  );
};

module.exports = controller;
