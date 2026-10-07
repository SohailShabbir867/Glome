import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ROLES, ROLE_LIST, USER_STATUS } from '../constants/roles.js';

const addressSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, default: 'Home' },
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    line1: { type: String, required: true, trim: true },
    line2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true, default: 'Pakistan' },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true },
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 8, select: false },
    phone: { type: String, trim: true },
    avatar: { url: String, publicId: String },

    role: { type: String, enum: ROLE_LIST, default: ROLES.CUSTOMER },
    status: { type: String, enum: Object.values(USER_STATUS), default: USER_STATUS.ACTIVE },

    isEmailVerified: { type: Boolean, default: false },
    addresses: [addressSchema],

    // Used to invalidate old tokens after a password change.
    passwordChangedAt: Date,
    lastLoginAt: Date,
  },
  { timestamps: true },
);

// Normal index for listing users by role (admin user management page).
userSchema.index({ role: 1, createdAt: -1 });

// Only ONE super admin can exist in the whole database.
// MongoDB enforces this with a partial unique index.
userSchema.index(
  { role: 1 },
  {
    name: 'only_one_super_admin',
    unique: true,
    partialFilterExpression: { role: ROLES.SUPER_ADMIN },
  },
);

// Async hook without the `next` callback (works in all current Mongoose versions).
userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
  if (!this.isNew) this.passwordChangedAt = new Date(Date.now() - 1000);
});

userSchema.methods.comparePassword = function comparePassword(plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.changedPasswordAfter = function changedPasswordAfter(tokenIssuedAtSeconds) {
  if (!this.passwordChangedAt) return false;
  return this.passwordChangedAt.getTime() / 1000 > tokenIssuedAtSeconds;
};

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export const User = mongoose.model('User', userSchema);
