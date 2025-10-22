import { Contact } from '@/types/contact';

export const generateInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const generateAvatarColor = (name: string): string => {
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-yellow-500 to-orange-500',
  ];
  
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const searchContacts = (contacts: Contact[], query: string): Contact[] => {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return contacts;
  
  return contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm) ||
    contact.email.toLowerCase().includes(searchTerm) ||
    contact.phone.toLowerCase().includes(searchTerm) ||
    contact.company.toLowerCase().includes(searchTerm)
  );
};

export const sortContacts = (contacts: Contact[], sortBy: 'a-z' | 'z-a' | 'recent'): Contact[] => {
  const sorted = [...contacts];
  
  switch (sortBy) {
    case 'a-z':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'z-a':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'recent':
      return sorted.sort((a, b) => b.createdAt - a.createdAt);
    default:
      return sorted;
  }
};
