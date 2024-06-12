import mongoose, { InferSchemaType, Schema } from 'mongoose';

import Tasks from '@/app/api/models/task';

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
/**
 * Label middleware.
 * When a label gets updated, automatically updates the
 * tasks that have that label.
 */
taskLabelsSchema.post('findOneAndUpdate', async function (doc) {
  if (doc) {
    const { _id, name, bgColor, fontColor } = doc;
    await Tasks.updateMany(
      { 'labels._id': _id },
      {
        $set: {
          'labels.$[elem].name': name,
          'labels.$[elem].bgColor': bgColor,
          'labels.$[elem].fontColor': fontColor,
        },
      },
      { arrayFilters: [{ 'elem._id': _id }] },
    );
  }
});

/**
 * Labels middleware pre.
 * Before deleting, check if the label is not use
 * on the todos.
 */
taskLabelsSchema.pre('findOneAndDelete', async function (next) {
  const labelId = this.getQuery()._id;
  const Tasks = mongoose.model('Tasks');
  const tasksUsingLabel = await Tasks.countDocuments({ 'labels._id': labelId });

  if (tasksUsingLabel > 0) {
    const err = new Error('Cannot delete label, it is still referenced by some todos');
    next(err);
  } else {
    next();
  }
});

export type TaskLabelsType = InferSchemaType<typeof taskLabelsSchema>;

export default mongoose.models.TaskLabels || mongoose.model('TaskLabels', taskLabelsSchema);
