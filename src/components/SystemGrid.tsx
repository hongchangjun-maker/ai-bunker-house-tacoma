import { BrainCircuit, Droplets, HeartPulse, Home, Recycle, Sprout, Wind, Zap } from 'lucide-react';
import { systems } from '../data/project';

const icons = { Home, Sprout, Droplets, Wind, Zap, HeartPulse, Recycle, BrainCircuit };

export function SystemGrid() {
  return (
    <div className="system-grid">
      {systems.map((system, index) => {
        const Icon = icons[system.icon as keyof typeof icons];
        return <article key={system.key} style={{ '--i': index } as React.CSSProperties}><span><Icon /></span><small>0{index + 1}</small><h3>{system.title}</h3><strong>{system.value}</strong><p>{system.note}</p></article>;
      })}
    </div>
  );
}
