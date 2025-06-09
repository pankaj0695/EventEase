import React from "react";
import EventCard from "../../components/EventCard/EventCard";
import styles from "./Events.module.css";

const dummyEvents = [
  {
    id: 1,
    title: "Summer Music Festival",
    description:
      "Join us for a weekend of amazing live performances featuring top artists from around the world.",
    date: "Aug 15-16, 2024",
    location: "Central Park, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    organizerName: "NYC Events & Entertainment",
    contactEmail: "info@summermusicfest.com",
    category: "Music & Entertainment",
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    description:
      "Explore the latest innovations in technology with industry leaders and experts.",
    date: "Sept 5-7, 2024",
    location: "Convention Center, SF",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    organizerName: "TechConnect Events",
    contactEmail: "contact@techconf2024.com",
    category: "Technology",
  },
  {
    id: 3,
    title: "Food & Wine Festival",
    description:
      "Experience culinary delights from renowned chefs and wine experts from around the globe.",
    date: "Oct 12-13, 2024",
    location: "Waterfront Park, Seattle",
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800",
    organizerName: "Taste of the Pacific",
    contactEmail: "events@foodwinefest.com",
    category: "Food & Beverage",
  },
  {
    id: 4,
    title: "Art Exhibition",
    description:
      "Discover contemporary artworks from emerging and established artists in this unique exhibition.",
    date: "Nov 1-30, 2024",
    location: "Modern Art Gallery, LA",
    imageUrl:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800",
    organizerName: "LA Art Foundation",
    contactEmail: "gallery@laart.org",
    category: "Arts & Culture",
  },
  {
    id: 5,
    title: "Sports Championship",
    description:
      "Watch the ultimate showdown between top teams competing for the championship title.",
    date: "Dec 15, 2024",
    location: "Sports Arena, Chicago",
    imageUrl:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
    organizerName: "National Sports League",
    contactEmail: "info@sportschampionship.com",
    category: "Sports",
  },
  {
    id: 6,
    title: "New Year's Eve Gala",
    description:
      "Welcome 2025 in style with an elegant evening of dining, dancing, and entertainment.",
    date: "Dec 31, 2024",
    location: "Grand Hotel, Miami",
    imageUrl:
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800",
    organizerName: "Miami Celebrations",
    contactEmail: "gala@miamicelebrations.com",
    category: "Entertainment",
  },
];

const Events = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upcoming Events</h1>
      <div className={styles.grid}>
        {dummyEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
