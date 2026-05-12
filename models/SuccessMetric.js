import mongoose from 'mongoose'

const SuccessMetricSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    count: {
      type: Number,
      required: [true, 'Count is required'],
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const SuccessMetric = mongoose.models.SuccessMetric || mongoose.model('SuccessMetric', SuccessMetricSchema)
export default SuccessMetric
