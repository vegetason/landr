//ts-ignore
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  jobInfoFormSchema,
  jobExperienceLevels,
  type JobInfoFormValues,
} from '../schema';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { JobInfoTable } from '@/drizzle/schemas/jobInfo';
import { createJobInfo, updateJobInfo } from '../action';
import { toast } from 'sonner';

export type JobInfoFormProps = {
  defaultValues?: Partial<JobInfoFormValues>;
};

const JobInfoForm = ({
  jobInfo,
}: {
  jobInfo?: Pick<
    typeof JobInfoTable.$inferSelect,
    'id' | 'name' | 'title' | 'description' | 'experience'
  >;
}) => {
  const form = useForm<JobInfoFormValues>({
    resolver: zodResolver(jobInfoFormSchema),
    defaultValues: jobInfo ?? {
      name: '',
      title: null,
      description: '',
      experience: 'junior',
    },
  });

  const handleSubmit = async (values: JobInfoFormValues) => {
    const action = jobInfo
      ? updateJobInfo.bind(null, jobInfo.id)
      : createJobInfo;
    const res = await action(values);

    if (res.error) {
      toast.error(res.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Constantine" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Frontend Engineer"
                    value={field.value ?? ''}
                    onChange={e => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={field.disabled}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {jobExperienceLevels.map((lvl: string) => (
                        <SelectItem key={lvl} value={lvl}>
                          {lvl.replace('-', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A full stack job that uses Postgresql for database management..."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Be as specific as possible. The more information you provide,
                the better the interviews will be.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="cursor-pointer w-full"
          >
            <LoadingSwap isLoading={form.formState.isSubmitting}>
              Save Job Info
            </LoadingSwap>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobInfoForm;
