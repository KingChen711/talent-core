import { Link, createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TCreateJobSchema, createJobSchema } from '@/lib/validation/job'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { HexColorPicker } from 'react-colorful'
import { getContrastYIQ, getRandomHexColor } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_employee-layout/jobs/create')({
  component: CreateJobPage
})

function CreateJobPage() {
  const [searchTest, setSearchTest] = useState('')

  const form = useForm<TCreateJobSchema>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      code: '',
      name: '',
      description: '',
      color: getRandomHexColor(),
      icon: '/icons/jobs/suitcase.png',
      testExamIds: [],
      openInCurrentRecruitment: false,
      quantityInCurrentRecruitment: undefined
    }
  })

  function onSubmit(values: TCreateJobSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <div className='mb-5 text-3xl font-semibold'>Create Job</div>
        <Button>
          <Link
            to='/jobs'
            search={() => ({
              pageNumber: 1,
              pageSize: 5,
              search: '',
              status: 'all'
            })}
            className='flex items-center gap-x-1'
          >
            <>
              <img className='size-5' src='/icons/actions/back.svg' />
              Back to list
            </>
          </Link>
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center'>
                  Code<span className='text-gradient text-3xl'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='Code...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center'>
                  Job Name<span className='text-gradient text-3xl'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='Job Name...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder='Description...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='openInCurrentRecruitment'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <Accordion value={String(field.value)} type='single' collapsible>
                      <AccordionItem value='true' className='cursor-default'>
                        <AccordionTrigger className='cursor-default'>
                          <div className='flex items-center gap-x-4'>
                            <Checkbox
                              id='openInCurrentRecruitment'
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className='size-6'
                            />
                            <FormLabel
                              htmlFor='openInCurrentRecruitment'
                              className='flex items-center gap-x-4 no-underline'
                            >
                              Add this job to opening recruitment round
                            </FormLabel>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <FormField
                            control={form.control}
                            name='quantityInCurrentRecruitment'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className='text-base'>Number of candidates needed</FormLabel>
                                <FormControl>
                                  <div className='flex flex-col gap-y-4'>
                                    <Input placeholder='Number of candidates needed...' {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </>
                </FormControl>
              </FormItem>
            )}
          />

          <div className='flex gap-x-20'>
            <FormField
              control={form.control}
              name='color'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color (HEX)</FormLabel>
                  <FormControl>
                    <div className='flex flex-col gap-y-4'>
                      <Input
                        style={{
                          backgroundColor: field.value || 'transparent',
                          color: field.value ? getContrastYIQ(field.value) : 'white'
                        }}
                        placeholder='Color...'
                        {...field}
                        className='w-[200px] font-semibold'
                      />
                      <HexColorPicker color={field.value} onChange={(value) => field.onChange(value)} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='icon'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <div className='flex flex-col gap-y-4'>
                      <Input placeholder='Icon...' {...field} className='w-[200px]' />
                      <img alt='job-icon' src={field.value} className='h-[200px] object-center' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Exams</FormLabel>
                <FormControl>{/* <Input placeholder='Job Name...' {...field} /> */}</FormControl>
                <FormDescription>Let&lsquo;s search some test exam to add to this job</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='float-right'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateJobPage
