import { Contact } from '@/types/contact';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, Phone, Briefcase, FileText, Calendar, Star } from 'lucide-react';
import { generateInitials, generateAvatarColor } from '@/utils/contactUtils';
import { Button } from '@/components/ui/button';

interface ViewContactModalProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onToggleFavorite: (id: string) => void;
}

export const ViewContactModal = ({ 
  contact, 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete,
  onToggleFavorite 
}: ViewContactModalProps) => {
  if (!contact) return null;

  const initials = generateInitials(contact.name);
  const gradientColor = generateAvatarColor(contact.name);
  const createdDate = new Date(contact.createdAt).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] glass-card border-0">
        <DialogHeader>
          <DialogTitle className="sr-only">Contact Details</DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <div className="flex items-center gap-6 mb-6">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white font-bold text-2xl`}>
              {initials}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-3xl font-bold">{contact.name}</h2>
                <button
                  onClick={() => onToggleFavorite(contact.id)}
                  className="transition-colors"
                >
                  <Star className={`w-6 h-6 ${contact.isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                </button>
              </div>
              {contact.jobTitle && (
                <p className="text-lg text-muted-foreground">{contact.jobTitle}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
              <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <a href={`mailto:${contact.email}`} className="text-foreground hover:text-primary transition-colors">
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
              <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                <a href={`tel:${contact.phone}`} className="text-foreground hover:text-primary transition-colors">
                  {contact.phone}
                </a>
              </div>
            </div>

            {contact.company && (
              <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                <Briefcase className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Company</p>
                  <p className="text-foreground">{contact.company}</p>
                </div>
              </div>
            )}

            {contact.notes && (
              <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                <FileText className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Notes</p>
                  <p className="text-foreground whitespace-pre-wrap">{contact.notes}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
              <Calendar className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Added</p>
                <p className="text-foreground">{createdDate}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              onClick={() => {
                onEdit(contact);
                onClose();
              }}
              className="flex-1"
            >
              Edit Contact
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(contact);
                onClose();
              }}
              className="flex-1"
            >
              Delete Contact
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
