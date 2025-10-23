# Tria Contact List Assignment

A responsive React contact management application built for Tria's technical assessment. This application demonstrates modern React development practices, clean architecture, and professional UI/UX design.

## 🚀 Live Demo

[Deploy your own version](#deployment) or view the live application.

## ✨ Features

### Core Features
- **Contact Management**: View, add, edit, and delete contacts
- **Search Functionality**: Real-time search across contact names, emails, phones, and companies
- **Favorites System**: Mark contacts as favorites and filter by favorites
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Additional Features
- **Dark Mode Theme**: Modern dark theme with smooth transitions
- **Grid/List View Toggle**: Switch between card grid and list layouts
- **Sorting Options**: Sort contacts alphabetically (A-Z, Z-A) or by creation date
- **Loading States**: Professional loading skeletons and transitions
- **Toast Notifications**: User feedback for all actions
- **Local Storage**: Persistent data storage across browser sessions

## 🛠 Tech Stack and Rationale

### Core Technologies
- **React 18**: Modern React with hooks for component state management and lifecycle
- **TypeScript**: Type safety and improved developer experience
- **Vite**: Fast build tool and development server for optimal performance

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework chosen for rapid, consistent styling and robust mobile responsiveness
- **shadcn/ui**: High-quality, accessible component library built on Radix UI primitives
- **Lucide React**: Beautiful, customizable icons for consistent visual language

### State Management
- **Custom Hooks**: Clean separation of concerns with `useContacts` hook for data management
- **React Query**: Efficient data fetching and caching (configured but using localStorage for demo)

### Development Tools
- **ESLint**: Code quality and consistency
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Cross-browser CSS compatibility

## 🎨 Design Choices and Assumptions

### Dark Mode Theme
The application uses a sophisticated dark theme as the primary design choice. This decision was made because:
- **Modern Appeal**: Dark themes are increasingly popular in professional applications
- **Reduced Eye Strain**: Better for extended use, especially in low-light environments
- **Professional Aesthetic**: Aligns with modern SaaS and developer tool interfaces

### Card-Based Grid Layout
The default grid layout uses cards for several reasons:
- **Visual Hierarchy**: Cards create clear boundaries and improve content organization
- **Mobile Responsiveness**: Cards adapt naturally to different screen sizes
- **Information Density**: Allows users to see more contacts at once while maintaining readability
- **Interactive Elements**: Cards provide clear touch targets for mobile users

### Case-Insensitive Search Implementation
The search functionality converts both search terms and contact data to lowercase before comparison. This approach:
- **User-Friendly**: Matches user expectations for search behavior
- **Comprehensive**: Ensures no contacts are missed due to case differences
- **Performance**: Simple string operations with minimal overhead
- **Accessibility**: Reduces cognitive load for users

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tria-contact-list
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Usage

### Adding Contacts
1. Click the floating action button (+) in the bottom right
2. Fill in the contact form with required information
3. Click "Save Contact" to add to your list

### Searching Contacts
- Use the search bar at the top to find contacts by name, email, phone, or company
- Search is case-insensitive and updates in real-time

### Managing Contacts
- **View**: Click on any contact card to view full details
- **Edit**: Click the edit button (pencil icon) on any contact
- **Delete**: Click the delete button (trash icon) and confirm deletion
- **Favorite**: Click the star icon to toggle favorite status

### View Options
- **Grid View**: Default card-based layout (desktop optimized)
- **List View**: Compact list layout (mobile optimized)
- **Favorites Filter**: Toggle to show only favorite contacts
- **Sort Options**: Sort alphabetically or by creation date

## 🏗 Architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   └── ...             # Feature-specific components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── data/               # Mock data and constants
```

### Key Components
- **useContacts**: Custom hook managing contact data and operations
- **ContactCard**: Individual contact display component
- **ContactModal**: Form for adding/editing contacts
- **SearchBar**: Real-time search functionality
- **ViewModeToggle**: Switch between grid and list views

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

### GitHub Pages
1. Build the project: `npm run build`
2. Push the `dist` folder to a `gh-pages` branch
3. Enable GitHub Pages in repository settings

## 🔧 Configuration

### Environment Variables
No environment variables are required for the basic setup. The application uses localStorage for data persistence.

### Customization
- **Theme**: Modify colors in `tailwind.config.ts`
- **Components**: Customize UI components in `src/components/ui/`
- **Data**: Update seed data in `src/data/seedContacts.ts`

## 📝 Assumptions and Design Decisions

### Data Persistence
- Uses localStorage for demo purposes (simulates API calls with 1.5s delay)
- In production, this would connect to a real API endpoint
- Contact IDs are generated using `crypto.randomUUID()`

### Form Validation
- Email validation using regex pattern
- Phone validation accepts various formats (US-focused)
- Required fields: name, email, phone, company

### Responsive Breakpoints
- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (3-4 columns)

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators

## 🤝 Contributing

This is a technical assessment project. For questions or feedback, please reach out through the appropriate channels.

## 📄 License

This project is created for Tria's technical assessment purposes.