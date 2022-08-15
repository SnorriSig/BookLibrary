import Book from "../models/bookModel.js";
import User from "../models/userModel.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      status: "success",
      results: books.length,
      data: {
        books,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: "fail",
      message: e,
    });
  }
};

export const checkoutBooks = async (req, res) => {
  const data = req.body.books;
  if (data.length > 0) {
    try {
      for (let i = 0; i < data.length; i++) {
        let currentStock = data[i].stock;
        let newStock = currentStock - 1;

        const book = await Book.findByIdAndUpdate(
          data[i]._id,
          { stock: `${newStock}` },
          {
            new: true,
            runValidators: true,
          }
        );
      }

      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (e) {
      res.status(404).json({
        status: "fail",
        message: e,
      });
    }
  } else {
    res.status(404).json({
      status: "fail",
      message: e,
    });
  }
};

export const returnBooks = async (req, res) => {
  const books = req.body.books;
  const book = req.body.book;

  try {
    const bookStock = await Book.findById(book._id);
    await Book.findByIdAndUpdate(
      book._id,
      { stock: bookStock.stock + 1 },
      {
        new: true,
        runValidators: true,
      }
    );

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        books: books,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      user: {
        book,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: "fail",
      message: e,
    });
  }
};

export default Book;
