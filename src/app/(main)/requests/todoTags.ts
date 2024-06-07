type TodoTagsDataParams = {
  userId: string;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
};

export const getTodoTagsData = async ({ userId, onSuccess, onError }: TodoTagsDataParams) => {
  try {
    const response = await fetch(`/api/taskLabels?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse?.message);
    }
    const currentData = await response.json();
    onSuccess(currentData.labels);
    return currentData;
  } catch (error: any) {
    onError(error.message);
  }
};
