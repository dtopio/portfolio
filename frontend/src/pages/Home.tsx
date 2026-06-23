import { useFetch } from '../hooks/useFetch';
import { getProfile } from '../services/api';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Contact from '../sections/Contact';

export default function Home() {
  const { data: profile, refetch } = useFetch(getProfile);

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
