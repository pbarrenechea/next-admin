import { toast } from '@/components/ui/use-toast';

export const submitRequest = async <T>(
  data: any,
  method: 'PUT' | 'POST',
  endpoint: string,
  onFinish: (data: T) => void,
  messageType: string,
  responsePropName: string,
) => {
  try {
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse?.message);
    }
    toast({ title: `${messageType} updated successfully`, variant: 'info' });
    const currentResponse = await response.json();
    onFinish(responsePropName ? currentResponse[responsePropName] : currentResponse);
  } catch (error: any) {
    toast({ title: `Problem trying to update ${messageType}`, description: error.message, variant: 'destructive' });
  }
};
