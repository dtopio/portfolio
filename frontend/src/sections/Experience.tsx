import { useFetch } from '../hooks/useFetch';
import { getExperience } from '../services/api';
import Section from '../components/Section';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import TimelineItem from '../components/TimelineItem';
import AddExperienceDialog from '../components/AddExperienceDialog';

export default function Experience() {
  const { data: experience, loading, error, refetch } = useFetch(getExperience);

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
        <div className="space-y-8">
          {(experience ?? []).map((item) => (
            <TimelineItem key={item.id} experience={item} />
          ))}
        </div>
      )}
    </Section>
  );
}
