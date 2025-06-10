import React, { useEffect, useState } from "react";
import EventCard from "../../components/EventCard/EventCard";
import styles from "./Events.module.css";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        let eventsArr = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sort by date (ascending)
        eventsArr = eventsArr.sort((a, b) => {
          // Try to parse as ISO date, fallback to string compare
          const dateA =
            Date.parse(a.date) || Date.parse(a.date.replace(/\D/g, "-")) || 0;
          const dateB =
            Date.parse(b.date) || Date.parse(b.date.replace(/\D/g, "-")) || 0;
          return dateA - dateB;
        });
        setEvents(eventsArr);
      } catch (err) {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upcoming Events</h1>
      <div className={styles.grid}>
        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => <EventCard key={event.id} {...event} />)
        )}
      </div>
    </div>
  );
};

export default Events;
