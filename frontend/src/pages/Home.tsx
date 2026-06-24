import { useProfile } from '../context/ProfileContext';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Contact from '../sections/Contact';

export default function Home() {
  const { profile, refetch } = useProfile();

  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} onUpdated={refetch} />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
