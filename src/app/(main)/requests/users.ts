type UserDataParams = {
  userId: string;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
};

export const getUserData = async ({ userId, onSuccess, onError }: UserDataParams) => {
  try {
    const response = await fetch(`/api/users?id=${userId}`, {
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
    onSuccess(currentData);
    return currentData;
  } catch (error: any) {
    onError(error.message);
  }
};
