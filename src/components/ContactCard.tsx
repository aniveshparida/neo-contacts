import { Contact } from '@/types/contact';
import { Mail, Phone, Briefcase, Edit, Trash2, Star } from 'lucide-react';
import { generateInitials, generateAvatarColor } from '@/utils/contactUtils';
import { Button } from '@/components/ui/button';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onView: (contact: Contact) => void;
  onToggleFavorite: (id: string) => void;
}

export const ContactCard = ({ contact, onEdit, onDelete, onView, onToggleFavorite }: ContactCardProps) => {
  const initials = generateInitials(contact.name);
  const gradientColor = generateAvatarColor(contact.name);

  return (
    <div className="glass-card rounded-lg p-6 hover:scale-[1.02] transition-all duration-300 group animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div 
          className="flex items-center gap-4 cursor-pointer flex-1"
          onClick={() => onView(contact)}
        >
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white font-semibold text-lg`}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1 truncate">{contact.name}</h3>
            {contact.jobTitle && (
              <p className="text-sm text-muted-foreground truncate">{contact.jobTitle}</p>
            )}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(contact.id);
          }}
          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Star className={`w-5 h-5 ${contact.isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
        </button>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-muted-foreground truncate">{contact.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone className="w-4 h-4 text-accent flex-shrink-0" />
          <span className="text-muted-foreground">{contact.phone}</span>
        </div>
        {contact.company && (
          <div className="flex items-center gap-3 text-sm">
            <Briefcase className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground truncate">{contact.company}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(contact)}
          className="flex-1"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(contact)}
          className="flex-1"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};
