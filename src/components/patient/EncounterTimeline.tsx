import type { Encounter } from '@/types/patient';
import { EncounterCard } from './EncounterCard';

interface EncounterTimelineProps {
  encounters: Encounter[];
}

export function EncounterTimeline({ encounters }: EncounterTimelineProps) {
  return (
    <div className="space-y-3">
      {encounters.map((encounter) => (
        <EncounterCard key={encounter.id} encounter={encounter} />
      ))}
    </div>
  );
}
