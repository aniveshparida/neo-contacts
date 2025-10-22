import { Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  type: 'no-contacts' | 'no-results';
  searchQuery?: string;
  onAddContact?: () => void;
}

export const EmptyState = ({ type, searchQuery, onAddContact }: EmptyStateProps) => {
  if (type === 'no-results') {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
          <Search className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">No results found</h3>
        <p className="text-muted-foreground text-center max-w-md">
          No contacts match "{searchQuery}". Try adjusting your search.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 animate-pulse-glow">
        <Users className="w-16 h-16 text-white" />
      </div>
      <h3 className="text-3xl font-bold mb-3">No contacts yet</h3>
      <p className="text-muted-foreground text-center max-w-md mb-8 text-lg">
        Start building your network by adding your first contact.
      </p>
      {onAddContact && (
        <Button 
          size="lg" 
          onClick={onAddContact}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Your First Contact
        </Button>
      )}
    </div>
  );
};

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);
