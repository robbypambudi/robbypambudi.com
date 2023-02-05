import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { serialize } from 'object-to-formdata';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiArrowRight } from 'react-icons/fi';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import TextArea from '@/components/forms/TextArea';
import ButtonLink from '@/components/links/ButtonLink';
import SEO from '@/components/SEO';
import Typography from '@/components/Typography';
import Project from '@/constant/project';
import EMAIL_REGEX from '@/constant/regex';
import Skills from '@/constant/skills';
import ProjectCard from '@/container/card/ProjectCard';
import SkillCard from '@/container/card/SkillCard';
import SkillModal from '@/container/modal/SkillModal';
import useMutationToast from '@/hooks/toast/useMuatationToast';
import Layout from '@/layouts/Layout';
import { ApiReturn } from '@/types/api';

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

export default function Home() {
  const methods = useForm<ContactForm>();

  const { handleSubmit } = methods;

  const { mutateAsync: sendEmail, isLoading } = useMutationToast<
    ApiReturn<unknown>,
    FormData
  >(
    useMutation((data) =>
      axios
        .post(
          'https://getform.io/f/b6d34c9a-635f-461f-8e49-c029ca140cff',
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => res.data)
    ),
    {
      success: 'Message sent successfully',
      error: 'Failed to send message',
      loading: 'Sending message...',
    }
  );

  const onSubmit = (data: ContactForm) => {
    const formdata = serialize(data);
    sendEmail(formdata);
  };

  return (
    <Layout>
      <SEO
        title='Home'
        description='is a portfolio website to showcase projects and as a medium for sharing a knowledge'
      />
      <main className='bg-primary-900'>
        <section id='hero'>
          <div className='layout h-screen flex flex-col justify-center'>
            <div className='md:grid md:grid-cols-3'>
              <div className='md:col-span-2 '>
                <div className='space-y-2'>
                  <Typography variant='h1' as='h1' color='primary'>
                    Robby Pambudi
                  </Typography>
                  <Typography variant='h2' as='h2' color='gray'>
                    I&apos;m a Full Stack Developer.
                  </Typography>
                </div>
                <div className='mt-4'>
                  <Typography color='gray'>
                    If you want some extra customization for your page, or you
                    want someone to set it up the first time, I&apos;m your guy!
                  </Typography>
                </div>
                <div className='mt-6'>
                  <Button
                    rightIcon={FiArrowRight}
                    rightIconClassName='group-hover:rotate-90 duration-300'
                    className='group'
                  >
                    View Work
                  </Button>
                </div>
              </div>
              <div className='overflow-hidden'>
                <div id='gitgraph' className=' absolute'></div>
              </div>
            </div>
          </div>
        </section>
        <section id='about'>
          <div className='layout h-screen flex flex-col justify-center'>
            <div className='grid md:grid-cols-2 gap-x-8 grid-cols-1'>
              <div className='flex flex-col justify-center md:items-end'>
                <Typography
                  variant='h2'
                  as='h2'
                  color='primary'
                  className='underline decoration-danger-500'
                >
                  About
                </Typography>
                <Typography
                  variant='h3'
                  as='h3'
                  color='primary'
                  className='md:text-end mt-4'
                >
                  Hi, I&apos;m Robby, nice to meet you. Please take a look
                  around.
                </Typography>
              </div>
              <div className='flex items-end'>
                <Typography
                  color='primary'
                  variant='p'
                  className='text-justify md:mt-0 mt-4'
                >
                  I&apos;m a passionate about building excellent software that
                  improves the lives of around me. I specialize in creating
                  software for the web, mobile, and desktop.
                </Typography>
              </div>
            </div>
          </div>
        </section>
        <section id='skills'>
          <div className='layout min-h-screen'>
            <div className=''>
              <Typography
                variant='h2'
                as='h2'
                color='primary'
                className='underline decoration-danger-500'
              >
                Skills
              </Typography>
            </div>
            <Typography
              variant='p'
              color='primary'
              className='mt-4 font-secondary'
            >
              # These are the technologies I&apos;ve been working with recently.
            </Typography>
            <div className='flex flex-wrap justify-center mt-8 gap-4'>
              <SkillModal>
                {({ openModal }) => (
                  <>
                    {Skills.map((skill, index) => (
                      <SkillCard
                        card={skill}
                        key={index}
                        onClick={() => openModal(skill)}
                      />
                    ))}
                  </>
                )}
              </SkillModal>
            </div>
          </div>
        </section>
        <section id='projects'>
          <div className='layout min-h-screen flex justify-center flex-col md:mt-2 sm:mt-4 mt-6'>
            <div className=''>
              <Typography
                variant='h2'
                as='h2'
                color='primary'
                className='underline decoration-danger-500'
              >
                Projects
              </Typography>
            </div>
            <Typography
              variant='p'
              color='primary'
              className='mt-4 font-secondary'
            >
              # These are the projects I&apos;ve been working on recently.
            </Typography>
            <div className='mt-12 px-2 mb-4'>
              <Swiper
                modules={[Navigation]}
                slidesPerView='auto'
                breakpoints={{
                  420: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1280: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}
                navigation={true}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                className='z-0'
              >
                {Project.map((project, index) => (
                  <SwiperSlide key={index}>
                    <ProjectCard card={project} key={index} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className='flex items-center justify-center'>
              <ButtonLink href='/projects'>View More</ButtonLink>
            </div>
          </div>
        </section>
        <section id='contact'>
          <div className='layout h-screen flex justify-center flex-col md:mt-2 sm:mt-4 mt-6'>
            <div className=''>
              <Typography
                variant='h2'
                as='h2'
                color='primary'
                className='underline decoration-danger-500'
              >
                Contact
              </Typography>
            </div>
            <Typography
              variant='p'
              color='primary'
              className='mt-4 font-secondary'
            >
              # If you want to get in touch, feel free to say hello through any
            </Typography>
            <div className='mt-8'>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='md:w-1/2 w-11/12 sm:w-3/4'>
                    <Input
                      id='email'
                      label='Email'
                      validation={{
                        required: 'Email is required',
                        pattern: {
                          value: EMAIL_REGEX,
                          message: "I'm expecting an email address",
                        },
                      }}
                      placeholder='robby.pambudi10@gmail.com'
                    />
                    <Input id='name' label='Name' placeholder='Robby Pambudi' />
                    <TextArea id='message' label='Message' placeholder='Hai' />
                    <Button
                      type='submit'
                      className='mt-4'
                      isLoading={isLoading}
                    >
                      Let&apos;s Collaborate
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
