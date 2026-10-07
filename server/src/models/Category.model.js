import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

// Categories are a tree, so Glome can grow like a mall:
//   Men > Shoes > Sneakers
//   Women > Clothing > Dresses
//   Kids, Accessories, Bags, Home ...
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    slug: { type: String, unique: true, lowercase: true, index: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null, index: true },
    image: { url: String, publicId: String },
    description: { type: String, trim: true, maxlength: 500 },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

categorySchema.pre('validate', function setSlug() {
  if (this.isModified('name') || !this.slug) this.slug = slugify(this.name);
});

export const Category = mongoose.model('Category', categorySchema);
