import { Grid3x3, List } from 'lucide-react';
import { ViewMode } from '@/types/contact';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export const ViewModeToggle = ({ viewMode, onChange }: ViewModeToggleProps) => {
  return (
    <div className="flex gap-1 p-1 rounded-lg bg-secondary/50">
      <button
        onClick={() => onChange('grid')}
        className={`p-2 rounded-md transition-all ${
          viewMode === 'grid' 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Grid view"
      >
        <Grid3x3 className="w-5 h-5" />
      </button>
      <button
        onClick={() => onChange('list')}
        className={`p-2 rounded-md transition-all ${
          viewMode === 'list' 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="List view"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
};
