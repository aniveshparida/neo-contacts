import { useState, useEffect } from 'react';
import { Contact } from '@/types/contact';
import { seedContacts } from '@/data/seedContacts';

const STORAGE_KEY = 'contacts-app-data';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load contacts from localStorage or use seed data
  useEffect(() => {
    const loadContacts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API loading delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsedContacts = JSON.parse(stored);
          setContacts(parsedContacts);
        } else {
          setContacts(seedContacts);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(seedContacts));
        }
      } catch (err) {
        setError('Failed to load contacts');
        console.error('Error loading contacts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadContacts();
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContact = (contactData: Omit<Contact, 'id' | 'createdAt'>) => {
    const newContact: Contact = {
      ...contactData,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setContacts(prev => [...prev, newContact]);
    return newContact;
  };

  const updateContact = (id: string, contactData: Omit<Contact, 'id' | 'createdAt'>) => {
    setContacts(prev => 
      prev.map(c => 
        c.id === id 
          ? { ...contactData, id: c.id, createdAt: c.createdAt }
          : c
      )
    );
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setContacts(prev =>
      prev.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c)
    );
  };

  const getContactById = (id: string) => {
    return contacts.find(c => c.id === id);
  };

  return {
    contacts,
    isLoading,
    error,
    addContact,
    updateContact,
    deleteContact,
    toggleFavorite,
    getContactById,
  };
};
