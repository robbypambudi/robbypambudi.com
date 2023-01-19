import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import * as React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button from '@/components/buttons/Button';
import SEO from '@/components/SEO';
import Typography from '@/components/Typography';
import Project from '@/constant/project';
import Skills from '@/constant/skills';
import ProjectCard from '@/container/card/ProjectCard';
import SkillCard from '@/container/card/SkillCard';
import SkillModal from '@/container/modal/SkillModal';
import Layout from '@/layouts/Layout';

export default function Home() {
  return (
    <Layout>
      <SEO title='Home' description='This is the home page' />
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
              <div></div>
            </div>
          </div>
        </section>
        <section id='about'>
          <div className='layout h-screen flex flex-col justify-center'>
            <div className='grid grid-cols-2 gap-x-8'>
              <div className='flex flex-col justify-center items-end'>
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
                  className='text-end mt-4'
                >
                  Hi, I&apos;m Robby, nice to meet you. Please take a look
                  around.
                </Typography>
              </div>
              <div className='flex items-end'>
                <Typography
                  color='primary'
                  variant='p'
                  className='text-justify'
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
            <div className='flex flex-wrap gap-2 justify-center'>
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
          <div className='layout h-screen flex justify-center flex-col'>
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
                spaceBetween={50}
                slidesPerView={2}
                modules={[Navigation]}
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
          </div>
        </section>
      </main>
    </Layout>
  );
}
