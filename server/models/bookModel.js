import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, "Enter author name."],
  },
  title: {
    type: String,
    required: [true, "Enter title."],
  },
  image: {
    type: String,
    required: [true, "Enter image URL."],
  },
  stock: {
    type: Number,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
