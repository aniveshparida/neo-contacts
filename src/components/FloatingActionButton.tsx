import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg hover:scale-110 transition-transform duration-200 z-50 animate-pulse-glow"
      aria-label="Add new contact"
    >
      <Plus className="w-8 h-8 mx-auto" />
    </button>
  );
};
