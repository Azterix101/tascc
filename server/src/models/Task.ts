import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  taskName: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true, default: 'In Progress' },
  dueDate: { type: Date, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default model('Task', taskSchema);
