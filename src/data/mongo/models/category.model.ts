import { model, Schema } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    require: [true, 'Name is required'],
    unique: true,
  },
  available: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
});

export const CategoryModel = model('Category', categorySchema, 'categories');
