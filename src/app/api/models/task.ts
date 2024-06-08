import mongoose, { InferSchemaType, Schema } from 'mongoose';

const tasksSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  starred: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
    default: 'todo',
  },
  labels: [
    {
      _id: { type: Schema.Types.ObjectId, ref: 'TaskLabels' },
      title: String,
      bgColor: String,
      fontColor: String,
    },
  ],

  user: { type: Schema.Types.ObjectId, ref: 'Users' },
});

export type TasksType = InferSchemaType<typeof tasksSchema>;

export default mongoose.models.Tasks || mongoose.model('Tasks', tasksSchema);
