import { DEFAULT_PAGE } from '@/app/(main)/config/settings';
import { DEFAULT_PAGE_SIZE } from '@/app/(main)/config/settings';

type TodosDataParams = {
  userId: string;
  page?: number;
  pageSize?: number;
  tag?: string;
  starred?: boolean;
  status?: string;
  onSuccess: (data: any, totalItems: number) => void;
  onError: (error: any) => void;
};

export const getTodosData = async ({
  userId,
  page,
  pageSize,
  tag,
  status,
  starred,
  onSuccess,
  onError,
}: TodosDataParams) => {
  try {
    const tagFilter = tag ? `&tag=${tag}` : '';
    const statusFilter = status ? `&status=${status}` : '';
    const starredFitler = starred ? `&starred=${starred}` : '';
    const response = await fetch(
      `/api/tasks?userId=${userId}&page=${page ? page : DEFAULT_PAGE}&pageSize=${pageSize ? pageSize : DEFAULT_PAGE_SIZE}${tagFilter}${statusFilter}${starredFitler}`,
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
    onSuccess(currentData.tasks, currentData.items);
    return currentData.tasks;
  } catch (error: any) {
    onError(error.message);
  }
};
