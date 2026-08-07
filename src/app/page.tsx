import Contact from '@/components/sections/contact';
import Education from '@/components/sections/education';
import Experience from '@/components/sections/experience';
import FAQ from '@/components/sections/faq';
import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import PublicationsTeaser from '@/components/sections/publications-teaser';
import TechSkills from '@/components/sections/tech-skills';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Hero />
      <TechSkills />
      <Experience />
      <Education />
      <Projects />
      <FAQ />
      <PublicationsTeaser />
      <Contact />
    </main>
  );
}
