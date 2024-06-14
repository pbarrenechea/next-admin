import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { submitRequest } from '@/app/(main)/requests/submit';
import TagSelect from '@/app/(main)/todos/Tags/tagSelect';
import { TodoStatusType, TodoTagType, TodoType } from '@/app/(main)/types';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import ErrorTooltip from '@/components/ui/error-tooltip';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

const labelSchema = z.object({
  _id: z.string(), // or z.number() if the id is a number
  name: z.string(),
  bgColor: z.string(),
  fontColor: z.string(),
});

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  starred: z.boolean(),
  status: z.nativeEnum(TodoStatusType),
  dueDate: z.date(),
  labels: z.array(labelSchema),
  _id: z.string(),
  userId: z.string(),
});

type FormData = z.infer<typeof FormSchema>;

type FormPageProps = {
  onFinish: (todo: TodoType) => void;
  tags: Array<TodoTagType>;
  todoData?: TodoType;
  userId: string;
};

const FormPage = ({ onFinish, todoData, userId, tags }: FormPageProps) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: todoData?.name || '',
      starred: todoData?.starred || false,
      status: todoData?.status || TodoStatusType.Todo,
      dueDate: todoData?.dueDate ? new Date(todoData?.dueDate) : new Date(),
      labels: todoData?.labels || [],
      _id: todoData?._id || '',
      userId,
    },
  });
  const onSubmit = async (data: FormData) => {
    await submitRequest<TodoType>(data, todoData ? 'PUT' : 'POST', '/api/tasks', onFinish, 'Todo', 'todo');
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
            name="status"
            render={({ field }) => (
              <FormItem className="dialog-form-field">
                <div className="dialog-form-left">
                  <FormLabel>Status:</FormLabel>
                </div>
                <div className="dialog-form-right">
                  <FormControl>
                    <Select onValueChange={field.onChange} name={field.name} value={field.value}>
                      <SelectTrigger className="w-4/5 inline-flex">
                        <SelectValue ref={field.ref} onBlur={field.onBlur} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(TodoStatusType).map((key: string) => (
                          <SelectItem value={key} key={key}>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {form.formState.errors.status && (
                    <ErrorTooltip message={form.formState.errors.status.message || ''} />
                  )}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="starred"
            render={({ field }) => (
              <FormItem className="dialog-form-field">
                <div className="dialog-form-left">
                  <FormLabel>Starred:</FormLabel>
                </div>
                <div className="dialog-form-right">
                  <FormControl>
                    <Switch name="active" checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="dialog-form-field">
                <div className="dialog-form-left">
                  <FormLabel>Due date:</FormLabel>
                </div>
                <div className="dialog-form-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="labels"
            render={({ field }) => (
              <FormItem className="dialog-form-field">
                <div className="dialog-form-left">
                  <FormLabel>Labels:</FormLabel>
                </div>
                <div className="dialog-form-right">
                  <FormControl>
                    <TagSelect
                      options={tags}
                      defaultOptions={field.value as TodoTagType[]}
                      name="labels"
                      onChange={(val) => {
                        field.onChange(val);
                      }}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          ></FormField>
          <div className="w-full justify-center flex mt-4">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormPage;
