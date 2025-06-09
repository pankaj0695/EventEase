# EventEase

EventEase is a modern, visually appealing event management web app built with React and Vite. Effortlessly discover, create, and manage events with a beautiful UI, smooth navigation, and secure authentication.

![Home Page](./src/assets/homepage.png)

## Features

- **Home Page:** Eye-catching background, animated title/description, and quick access to explore or add events.
- **Event Listing:** Browse all events in a responsive, card-based layout.
- **Event Details:** View detailed information and images for each event.
- **Add Event:** Create new events with a modern, two-section form (Event & Organizer details) and image upload.
- **Authentication:** Secure sign up, login, and Google sign-in via Firebase Auth.
- **User Experience:** Animated buttons, overlays, and consistent color scheme for a delightful experience.
- **Responsive Design:** Fully responsive for desktop and mobile devices.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/pankaj0695/eventease.git
   cd eventease
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Set up Firebase:**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Email/Password and Google authentication.
   - Add your Firebase config to `src/firebase/firebase.js`.

4. **Start the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
  assets/           # Images and logos
  components/       # Reusable UI components (Navbar, Auth, EventCard, ...)
  contexts/         # React context for user state
  firebase/         # Firebase config and auth logic
  pages/            # Main pages (Home, Events, AddEvent, ...)
  App.jsx           # Main app with routing
  index.css         # Global styles
```

Made with ❤️ for event organizers and attendees.
