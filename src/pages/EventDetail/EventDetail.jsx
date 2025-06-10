import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaTag,
} from "react-icons/fa";
import styles from "./EventDetail.module.css";
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "events", eventId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEvent({ id: docSnap.id, ...docSnap.data() });
        } else {
          setEvent(null);
        }
      } catch (err) {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (loading) return <div className={styles.container}>Loading event...</div>;
  if (!event) return <div className={styles.container}>Event not found</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={event.imageUrl}
          alt={event.title}
          className={styles.headerImage}
        />
        <div className={styles.overlay}>
          <h1 className={styles.title}>{event.title}</h1>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <h2>About This Event</h2>
          <p className={styles.description}>{event.description}</p>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.infoItem}>
            <FaCalendarAlt className={styles.icon} />
            <div>
              <div className={styles.label}>Date</div>
              <div className={styles.value}>{event.date}</div>
            </div>
          </div>

          <div className={styles.infoItem}>
            <FaMapMarkerAlt className={styles.icon} />
            <div>
              <div className={styles.label}>Location</div>
              <div className={styles.value}>{event.location}</div>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.infoItem}>
            <FaUser className={styles.icon} />
            <div>
              <div className={styles.label}>Organizer</div>
              <div className={styles.value}>{event.organizerName}</div>
            </div>
          </div>

          <div className={styles.infoItem}>
            <FaEnvelope className={styles.icon} />
            <div>
              <div className={styles.label}>Contact</div>
              <div className={styles.value}>{event.contactEmail}</div>
            </div>
          </div>

          <div className={styles.infoItem}>
            <FaTag className={styles.icon} />
            <div>
              <div className={styles.label}>Category</div>
              <div className={styles.value}>{event.category}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
