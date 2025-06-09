import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import styles from "./EventCard.module.css";

const EventCard = ({ id, title, description, date, location, imageUrl }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} className={styles.image} />
        <div className={styles.overlay}>
          <div className={styles.details}>
            <p className={styles.info}>
              <FaCalendarAlt className={styles.icon} />
              {date}
            </p>
            <p className={styles.info}>
              <FaMapMarkerAlt className={styles.icon} />
              {location}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <Link to={`/events/${id}`} className={styles.detailsLink}>
          View Details <span className={styles.arrow}>&rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
