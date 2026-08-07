'use client';

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconMapPin,
  IconPhone,
} from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'motion/react';
import { serialize } from 'object-to-formdata';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EMAIL_REGEX from '@/constant/regex';
import useMutationToast from '@/hooks/toast/useMuatationToast';
import data from '@/lib/data.json';
import { ApiReturn } from '@/types/api';

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: IconBrandGithub,
  linkedin: IconBrandLinkedin,
  mail: IconMail,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const fieldClassName =
  'w-full min-h-12 rounded-base border-2 border-border bg-background px-3 sm:px-4 py-3 text-base text-foreground shadow-shadow placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

export default function Contact() {
  const { socialLinks, contact } = data;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ContactForm>();

  const { mutateAsync: sendEmail, isPending } = useMutationToast<
    ApiReturn<unknown>,
    FormData
  >(
    useMutation({
      mutationFn: (formData: FormData) =>
        axios
          .post(contact.getformUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => res.data),
      onSuccess: () => reset(),
    }),
    {
      success: 'Message sent successfully',
      error: 'Failed to send message',
      loading: 'Sending message...',
    },
  );

  const onSubmit = (formValues: ContactForm) => {
    sendEmail(serialize(formValues));
  };

  return (
    <section
      id='contact'
      className='section-shell bg-chart-3 border-y-4 border-border'
    >
      <motion.div
        className='max-w-5xl mx-auto w-full'
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Card className='bg-secondary-background'>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl sm:text-2xl md:text-3xl leading-tight'>
              {contact.title}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6 sm:space-y-8'>
            <p className='text-center text-sm sm:text-base md:text-lg text-foreground leading-relaxed max-w-2xl mx-auto'>
              {contact.description}
            </p>

            <div className='flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm text-foreground/80'>
              <span className='inline-flex items-center gap-2'>
                <IconMapPin className='size-4 shrink-0' aria-hidden='true' />
                <span>{contact.location}</span>
              </span>
              <a
                href={`tel:${contact.phone}`}
                className='inline-flex items-center gap-2 underline-offset-2 hover:underline touch-target px-1'
              >
                <IconPhone className='size-4 shrink-0' aria-hidden='true' />
                <span>{contact.phone}</span>
              </a>
            </div>

            <motion.div
              className='grid grid-cols-1 sm:grid-cols-3 gap-3'
              variants={containerVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-50px' }}
            >
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon.toLowerCase()] || IconMail;
                return (
                  <motion.div key={link.platform} variants={itemVariants}>
                    <Button
                      variant='default'
                      size='xl'
                      asChild
                      className='w-full h-12 sm:h-14'
                    >
                      <Link
                        href={link.url}
                        target={
                          link.url.startsWith('mailto:') ? undefined : '_blank'
                        }
                        rel={
                          link.url.startsWith('mailto:')
                            ? undefined
                            : 'noopener noreferrer'
                        }
                        aria-label={`Contact via ${link.platform}`}
                      >
                        <Icon className='size-5' aria-hidden='true' />
                        <span className='text-base md:text-sm'>
                          {link.platform}
                        </span>
                      </Link>
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className='mx-auto max-w-xl w-full space-y-4'
            >
              <div className='space-y-1'>
                <label htmlFor='email' className='text-sm font-medium'>
                  Email <span className='text-chart-4'>*</span>
                </label>
                <input
                  id='email'
                  type='email'
                  placeholder='you@company.com'
                  className={fieldClassName}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: EMAIL_REGEX,
                      message: "I'm expecting an email address",
                    },
                  })}
                />
                {errors.email ? (
                  <p className='text-sm text-chart-4'>{errors.email.message}</p>
                ) : null}
              </div>
              <div className='space-y-1'>
                <label htmlFor='name' className='text-sm font-medium'>
                  Name <span className='text-chart-4'>*</span>
                </label>
                <input
                  id='name'
                  type='text'
                  placeholder='Your name'
                  className={fieldClassName}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name ? (
                  <p className='text-sm text-chart-4'>{errors.name.message}</p>
                ) : null}
              </div>
              <div className='space-y-1'>
                <label htmlFor='message' className='text-sm font-medium'>
                  Message <span className='text-chart-4'>*</span>
                </label>
                <textarea
                  id='message'
                  rows={4}
                  placeholder='Role, timeline, or hello'
                  className={fieldClassName}
                  {...register('message', {
                    required: 'Message is required',
                  })}
                />
                {errors.message ? (
                  <p className='text-sm text-chart-4'>
                    {errors.message.message}
                  </p>
                ) : null}
              </div>
              <Button
                type='submit'
                size='xl'
                disabled={isPending}
                className='w-full'
              >
                {isPending ? 'Sending…' : "Let's collaborate"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
