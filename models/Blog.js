import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Blog content is required'],
    },
  },
  {
    timestamps: true,
  }
)

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema)
export default Blog
