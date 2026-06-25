import { motion } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import { getExperience } from '../services/api';
import Section from '../components/Section';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import TimelineItem from '../components/TimelineItem';
import AddExperienceDialog from '../components/AddExperienceDialog';
import { staggerContainer } from '../lib/motion';

export default function Experience() {
  const { data: experience, loading, error, refetch } = useFetch(['experience'], getExperience);

  return (
    <Section
      id="experience"
      index={4}
      title="Experience"
      action={<AddExperienceDialog onCreated={refetch} />}
    >
      {loading && <LoadingState label="Loading experience…" />}
      {error && <ErrorState message={error} />}

      {!loading && !error && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-8"
        >
          {(experience ?? []).map((item) => (
            <TimelineItem key={item.id} experience={item} onUpdated={refetch} />
          ))}
        </motion.div>
      )}
    </Section>
  );
}
