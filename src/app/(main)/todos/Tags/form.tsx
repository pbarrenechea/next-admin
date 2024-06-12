import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { submitRequest } from '@/app/(main)/requests/submit';
import { TodoTagType } from '@/app/(main)/types';
import { Button } from '@/components/ui/button';
import { Picker } from '@/components/ui/color-picker';
import ErrorTooltip from '@/components/ui/error-tooltip';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bgColor: z.string(),
  fontColor: z.string(),
  _id: z.string(),
  userId: z.string(),
});

type FormData = z.infer<typeof FormSchema>;

type FormPageProps = {
  onFinish: (tag: TodoTagType) => void;
  tagData?: TodoTagType;
  userId: string;
};

const FormPage = ({ onFinish, tagData, userId }: FormPageProps) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: tagData?.name || '',
      bgColor: tagData?.bgColor || '#000000',
      fontColor: tagData?.fontColor || '#FFFFFF',
      _id: tagData?._id || '',
      userId,
    },
  });
  const onSubmit = async (data: FormData) => {
    await submitRequest<TodoTagType>(data, tagData ? 'PUT' : 'POST', '/api/taskLabels', onFinish, 'Tag', 'label');
  };
  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="dialog-form-field">
                <div className="dialog-form-left">
                  <FormLabel>*Name:</FormLabel>
                </div>
                <div className="dialog-form-right">
                  <FormControl>
                    <Input placeholder="Name" {...field} className="w-4/5 inline-flex" />
                  </FormControl>
                  {form.formState.errors.name && <ErrorTooltip message={form.formState.errors.name.message || ''} />}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bgColor"
            render={({ field }) => (
              <FormItem className="dialog-form-field">
                <div className="dialog-form-left">
                  <FormLabel>*Background color:</FormLabel>
                </div>
                <div className="dialog-form-right">
                  <Picker initialValue={field.value} onBackgroundChange={field.onChange} />
                  <FormControl>
                    <Input type="hidden" placeholder="Background" {...field} className="w-4/5 inline-flex" />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fontColor"
            render={({ field }) => (
              <FormItem className="dialog-form-field">
                <div className="dialog-form-left">
                  <FormLabel>*Font Color:</FormLabel>
                </div>
                <div className="dialog-form-right">
                  <Picker initialValue={field.value} onBackgroundChange={field.onChange} />
                  <FormControl>
                    <Input type="hidden" placeholder="Font color" {...field} className="w-4/5 inline-flex" />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <div className="w-full justify-center flex mt-4">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormPage;
