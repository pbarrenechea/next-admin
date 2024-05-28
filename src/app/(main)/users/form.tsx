import { Simulate } from 'react-dom/test-utils';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import ErrorTooltip from '@/components/ui/error-tooltip';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

import error = Simulate.error;

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  photoUrl: z.union([z.literal(''), z.string().trim().url()]),
  jobTitle: z.string(),
  phone: z.string(),
  role: z.string().min(1, 'Role is required'),
  location: z.string(),
});

type FormData = z.infer<typeof FormSchema>;

const FormPage = ({ onFinish }: { onFinish: () => void }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      photoUrl: '',
      phone: '',
      role: 'User',
      jobTitle: '',
      location: '',
    },
  });
  const onSubmit = async (data: FormData) => {
    console.log('Submitting form', data);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data }),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse?.message || error);
      }
      toast({ title: 'User added successfully', variant: 'info' });
      onFinish();
    } catch (error: any) {
      toast({ title: 'Problem added user', description: error.message, variant: 'destructive' });
    }
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
                  <FormLabel>Name:</FormLabel>
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
            name="lastName"
            render={({ field }) => (
              <FormItem className="dialog-form-field">
                <div className="dialog-form-left">
                  <FormLabel>Last Name:</FormLabel>
                </div>
                <div className="dialog-form-right">
                  <FormControl>
                    <Input placeholder="Last Name" {...field} className="w-4/5 inline-flex" />
                  </FormControl>
                  {form.formState.errors.lastName && (
                    <ErrorTooltip message={form.formState.errors.lastName.message || ''} />
                  )}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="dialog-form-field">
                <div className="dialog-form-left">
                  <FormLabel>Email:</FormLabel>
                </div>
                <div className="dialog-form-right">
                  <FormControl>
                    <Input placeholder="Email" {...field} className="w-4/5 inline-flex" />
                  </FormControl>
                  {form.formState.errors.email && <ErrorTooltip message={form.formState.errors.email.message || ''} />}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="dialog-form-field">
                <div className="dialog-form-left">
                  <FormLabel>Role:</FormLabel>
                </div>
                <div className="dialog-form-right">
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-4/5 inline-flex">
                        <SelectValue placeholder="Select a Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {form.formState.errors.role && <ErrorTooltip message={form.formState.errors.role.message || ''} />}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem className="dialog-form-field">
                <div className="dialog-form-left">
                  <FormLabel>Job Title:</FormLabel>
                </div>
                <div className="dialog-form-right">
                  <FormControl>
                    <Input placeholder="Job title" {...field} className="w-4/5 inline-flex" />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photoUrl"
            render={({ field }) => (
              <FormItem className="dialog-form-field">
                <div className="dialog-form-left">
                  <FormLabel>Profile Picture</FormLabel>
                </div>
                <div className="dialog-form-right">
                  <FormControl>
                    <Input placeholder="Profile picture" {...field} className="w-4/5 inline-flex" />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="dialog-form-field">
                <div className="dialog-form-left">
                  <FormLabel>Phone Number</FormLabel>
                </div>
                <div className="dialog-form-right">
                  <FormControl>
                    <Input placeholder="Phone" {...field} className="w-4/5 inline-flex" />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="dialog-form-field">
                <div className="dialog-form-left">
                  <FormLabel>Password</FormLabel>
                </div>
                <div className="dialog-form-right">
                  <FormControl>
                    <Input placeholder="Location" {...field} className="w-4/5 inline-flex" />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="dialog-form-field">
                <div className="dialog-form-left">
                  <FormLabel>Password</FormLabel>
                </div>
                <div className="dialog-form-right">
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" className="w-4/5 inline-flex" />
                  </FormControl>
                  {form.formState.errors.password && (
                    <ErrorTooltip message={form.formState.errors.password.message || ''} />
                  )}
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
