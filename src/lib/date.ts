export const formatTodoDate = (todoDate: string) => {
  const date = new Date(todoDate);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};
