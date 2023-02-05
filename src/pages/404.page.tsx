import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import Layout from '@/layouts/Layout';
import clsxm from '@/lib/clsxm';

export default function NotFound() {
  return (
    <Layout viewSidebar={false} viewNavbar={false}>
      <main className='bg-404'>
        <section
          className={clsxm(
            'min-h-screen flex flex-col items-center justify-center bg-[url(/images/assets/bg-star.png)]',
            'bg-no-repeat bg-cover relative'
          )}
        >
          <NextImage
            src='/images/assets/404.png'
            alt='404'
            width={404}
            height={154}
            className='md:w-[20%] w-1/2'
          />
          <div className='text-center flex flex-col items-center mt-4 space-y-4'>
            <Typography variant='h1' as='h1'>
              Oh no!!
            </Typography>
            <Typography variant='h3' as='h3' className='w-3/5'>
              The page you are looking for might have been removed had its name
              changed or is temporarily unavailable.
            </Typography>
          </div>
          <div
            className={clsxm(
              'absolute bottom-0 bg-[url(/images/assets/land.png)] w-full h-1/5',
              'bg-cover bg-no-repeat'
            )}
          >
            <NextImage
              src='/images/assets/spaceship.png'
              alt='spaceship'
              width={254}
              height={194}
              className='absolute bottom-0 right-[10%] w-1/2 md:w-1/6'
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
