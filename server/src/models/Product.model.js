import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

// One product, many variants. Works for shoes (size 42), clothes (size M),
// and one-size items (size "One Size") with the same structure.
const variantSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, trim: true, uppercase: true },
    size: { type: String, required: true, trim: true }, // "42", "M", "One Size"
    color: {
      name: { type: String, required: true, trim: true }, // "Black"
      hex: { type: String, trim: true }, // "#000000"
    },
    stock: { type: Number, required: true, min: 0, default: 0 },
    priceOverride: { type: Number, min: 0 }, // optional, if a variant costs different
  },
  { _id: true },
);

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String },
    alt: { type: String, trim: true },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, required: true, trim: true },
    brand: { type: String, trim: true, index: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },
    audience: {
      type: String,
      enum: ['men', 'women', 'kids', 'unisex'],
      default: 'unisex',
      index: true,
    },

    price: { type: Number, required: true, min: 0 }, // base price
    discountPercent: { type: Number, min: 0, max: 90, default: 0 },

    images: {
      type: [imageSchema],
      validate: [(v) => v.length > 0, 'At least one image is required'],
    },
    variants: {
      type: [variantSchema],
      validate: [(v) => v.length > 0, 'At least one variant is required'],
    },
    specifications: { type: Map, of: String }, // { Material: "Cotton", Fit: "Slim" }
    tags: [{ type: String, trim: true, lowercase: true }],

    ratingAverage: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0, min: 0 },
    soldCount: { type: Number, default: 0, min: 0 },

    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lowStockThreshold: { type: Number, default: 5 },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

productSchema.virtual('finalPrice').get(function finalPrice() {
  return Math.round(this.price * (1 - this.discountPercent / 100));
});

productSchema.virtual('totalStock').get(function totalStock() {
  return this.variants.reduce((sum, v) => sum + v.stock, 0);
});

productSchema.pre('validate', function setSlug() {
  if (this.isModified('name') || !this.slug) {
    // Short random suffix keeps slugs unique when two products share a name.
    this.slug = `${slugify(this.name)}-${Math.random().toString(36).slice(2, 7)}`;
  }
});

// Text search for the search bar, plus indexes for the listing page filters/sorting.
productSchema.index({ name: 'text', brand: 'text', tags: 'text', description: 'text' });
productSchema.index({ isActive: 1, category: 1, price: 1 });
productSchema.index({ isActive: 1, createdAt: -1 });
productSchema.index({ isActive: 1, soldCount: -1 });
productSchema.index({ isActive: 1, ratingAverage: -1 });

export const Product = mongoose.model('Product', productSchema);
