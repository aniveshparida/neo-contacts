import { useState, useEffect, useMemo } from 'react';
import { Contact, ViewMode, SortOption } from '@/types/contact';
import { seedContacts } from '@/data/seedContacts';
import { searchContacts, sortContacts } from '@/utils/contactUtils';
import { ContactCard } from '@/components/ContactCard';
import { SearchBar } from '@/components/SearchBar';
import { ContactModal } from '@/components/ContactModal';
import { ViewContactModal } from '@/components/ViewContactModal';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { EmptyState } from '@/components/EmptyState';
import { ViewModeToggle } from '@/components/ViewModeToggle';
import { SortDropdown } from '@/components/SortDropdown';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';

const STORAGE_KEY = 'contacts-app-data';

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('a-z');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  
  const { toast } = useToast();

  // Load contacts from localStorage or use seed data
  useEffect(() => {
    const loadContacts = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setContacts(JSON.parse(stored));
      } else {
        setContacts(seedContacts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedContacts));
      }
      setIsLoading(false);
    };

    setTimeout(loadContacts, 500); // Simulate loading
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts]);

  // Filter and sort contacts
  const filteredContacts = useMemo(() => {
    let result = searchContacts(contacts, searchQuery);
    if (showFavoritesOnly) {
      result = result.filter(c => c.isFavorite);
    }
    return sortContacts(result, sortBy);
  }, [contacts, searchQuery, sortBy, showFavoritesOnly]);

  const handleAddContact = (contactData: Omit<Contact, 'id' | 'createdAt'>) => {
    const newContact: Contact = {
      ...contactData,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setContacts(prev => [...prev, newContact]);
    toast({
      title: 'Contact added',
      description: `${newContact.name} has been added to your contacts.`,
    });
  };

  const handleEditContact = (contactData: Omit<Contact, 'id' | 'createdAt'>) => {
    if (!selectedContact) return;
    
    setContacts(prev => 
      prev.map(c => 
        c.id === selectedContact.id 
          ? { ...contactData, id: c.id, createdAt: c.createdAt }
          : c
      )
    );
    toast({
      title: 'Contact updated',
      description: `${contactData.name}'s information has been updated.`,
    });
  };

  const handleDeleteContact = () => {
    if (!contactToDelete) return;
    
    setContacts(prev => prev.filter(c => c.id !== contactToDelete.id));
    toast({
      title: 'Contact deleted',
      description: `${contactToDelete.name} has been removed from your contacts.`,
      variant: 'destructive',
    });
    setIsDeleteDialogOpen(false);
    setContactToDelete(null);
  };

  const handleToggleFavorite = (id: string) => {
    setContacts(prev =>
      prev.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c)
    );
  };

  const openAddModal = () => {
    setModalMode('add');
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  const openEditModal = (contact: Contact) => {
    setModalMode('edit');
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const openViewModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const openDeleteDialog = (contact: Contact) => {
    setContactToDelete(contact);
    setIsDeleteDialogOpen(true);
  };

  const contactCount = contacts.length;
  const favoriteCount = contacts.filter(c => c.isFavorite).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="h-32 mb-8 animate-pulse">
            <div className="h-12 bg-secondary rounded w-1/2 mx-auto mb-4" />
            <div className="h-8 bg-secondary rounded w-1/3 mx-auto" />
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-border bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
            Your Contacts, Beautifully Organized
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-8 animate-fade-in">
            {contactCount > 0 ? (
              <>
                {contactCount} contact{contactCount !== 1 ? 's' : ''} 
                {favoriteCount > 0 && ` · ${favoriteCount} favorite${favoriteCount !== 1 ? 's' : ''}`}
              </>
            ) : (
              'Start building your professional network'
            )}
          </p>
          
          <div className="animate-slide-up">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </div>

      {/* Controls */}
      {contacts.length > 0 && (
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  showFavoritesOnly 
                    ? 'bg-primary text-primary-foreground' 
                    : 'glass text-muted-foreground hover:text-foreground'
                }`}
              >
                <Star className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                Favorites
              </button>
            </div>
            <div className="flex items-center gap-3">
              <SortDropdown value={sortBy} onChange={setSortBy} />
              <ViewModeToggle viewMode={viewMode} onChange={setViewMode} />
            </div>
          </div>
        </div>
      )}

      {/* Contact Grid/List */}
      <div className="container mx-auto px-4 pb-24">
        {filteredContacts.length === 0 ? (
          <EmptyState
            type={searchQuery || showFavoritesOnly ? 'no-results' : 'no-contacts'}
            searchQuery={searchQuery}
            onAddContact={contacts.length === 0 ? openAddModal : undefined}
          />
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'flex flex-col gap-4 max-w-4xl mx-auto'
          }>
            {filteredContacts.map((contact, index) => (
              <div 
                key={contact.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-fade-in"
              >
                <ContactCard
                  contact={contact}
                  onEdit={openEditModal}
                  onDelete={openDeleteDialog}
                  onView={openViewModal}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <FloatingActionButton onClick={openAddModal} />

      {/* Modals */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={modalMode === 'add' ? handleAddContact : handleEditContact}
        editContact={selectedContact}
        mode={modalMode}
      />

      <ViewContactModal
        contact={selectedContact}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        onEdit={openEditModal}
        onDelete={openDeleteDialog}
        onToggleFavorite={handleToggleFavorite}
      />

      <DeleteConfirmDialog
        contact={contactToDelete}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteContact}
      />
    </div>
  );
};

export default Index;
