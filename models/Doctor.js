import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
      trim: true,
    },
    qualification: {
      type: String,
      required: [true, 'Qualification is required'],
      trim: true,
    },
    experience: {
      type: String,
      default: '',
      trim: true,
    },
    registration: {
      type: String,
      default: '',
      trim: true,
    },
    availability: {
      type: String,
      default: 'Unavailable',
      trim: true,
    },
    workingDays: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: '',
    },
    hospital: {
      type: String,
      default: '',
      trim: true,
    },
    consultationFee: {
      type: Number,
      required: [true, 'Consultation fee is required'],
    },
    bio: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
export default Doctor;
