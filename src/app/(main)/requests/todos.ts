import { DEFAULT_PAGE } from '@/app/(main)/config/settings';
import { DEFAULT_PAGE_SIZE } from '@/app/(main)/config/settings';

type TodosDataParams = {
  userId: string;
  page?: number;
  pageSize?: number;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
};

export const getTodosData = async ({ userId, page, pageSize, onSuccess, onError }: TodosDataParams) => {
  try {
    const response = await fetch(
      `/api/tasks?userId=${userId}&page=${page ? page : DEFAULT_PAGE}&pageSize=${pageSize ? pageSize : DEFAULT_PAGE_SIZE}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse?.message);
    }
    const currentData = await response.json();
    onSuccess(currentData.tasks);
    return currentData.tasks;
  } catch (error: any) {
    onError(error.message);
  }
};
