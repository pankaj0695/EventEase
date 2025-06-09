import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.centerContent}>
        <h1 className={styles.title}>
          <span className={styles.fadeIn}>EventEase</span>
        </h1>
        <p className={styles.description}>
          <span className={styles.slideIn}>
            Seamlessly discover and create events.
            <br />
            Join the community, explore what’s happening, or host your own event
            with ease!
          </span>
        </p>
        <div className={styles.buttonGroup}>
          <Link
            to="/events"
            className={`${styles.exploreBtn} ${styles.btnAnim}`}
          >
            Explore Events
          </Link>
          <Link to="/addevent" className={`${styles.addBtn} ${styles.btnAnim}`}>
            Add Event
          </Link>
        </div>
      </div>
      <div className={styles.bgOverlay}></div>
    </div>
  );
};

export default Home;
