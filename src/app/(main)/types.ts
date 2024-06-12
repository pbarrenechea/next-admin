export type UserType = {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
  photoUrl: string;
  active: boolean;
  location: string;
  jobTitle: string;
  phone: string;
};

export type TodoTagType = {
  _id: string;
  name: string;
  bgColor: string;
  fontColor: string;
};

export enum TodoStatusType {
  Todo = 'todo',
  InProgress = 'in progress',
  Done = 'done',
}

export type TodoType = {
  _id: string;
  name: string;
  starred: boolean;
  status: TodoStatusType;
  dueDate: string;
  labels: Array<TodoTagType>;
  user: string;
};
