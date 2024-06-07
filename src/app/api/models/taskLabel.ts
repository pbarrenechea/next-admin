import mongoose, { InferSchemaType, Schema } from 'mongoose';

const taskLabelsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    required: true,
  },
  fontColor: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
});

export type TaskLabelsType = InferSchemaType<typeof taskLabelsSchema>;

export default mongoose.models.TaskLabels || mongoose.model('TaskLabels', taskLabelsSchema);
