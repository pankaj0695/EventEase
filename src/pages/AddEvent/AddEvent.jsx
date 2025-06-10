import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import styles from "./AddEvent.module.css";

const CLOUDINARY_UPLOAD_PRESET = "EventEase-Storage"; // TODO: Replace with your Cloudinary upload preset
const CLOUDINARY_CLOUD_NAME = "dnihe4ihi"; // TODO: Replace with your Cloudinary cloud name
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const AddEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organizerName: "",
    contactEmail: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!imageFile) {
      newErrors.imageFile = "Image is required";
    }

    if (!formData.organizerName.trim()) {
      newErrors.organizerName = "Organizer name is required";
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Contact email is required";
    } else if (!isValidEmail(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setErrors((prev) => ({ ...prev, imageFile: "" }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload image to Cloudinary
      let imageUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        const response = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (!data.secure_url) throw new Error("Image upload failed");
        imageUrl = data.secure_url;
      }

      // 2. Save event data to Firestore
      await addDoc(collection(db, "events"), {
        ...formData,
        imageUrl,
        createdAt: Timestamp.now(),
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        navigate("/events");
      }, 2000);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error.message || "Failed to create event. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create New Event</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Event Details</h2>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="title">
              Event Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={styles.input}
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
            />
            {errors.title && <div className={styles.error}>{errors.title}</div>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className={styles.textarea}
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event description"
            />
            {errors.description && (
              <div className={styles.error}>{errors.description}</div>
            )}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className={styles.input}
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <div className={styles.error}>{errors.date}</div>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="location">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className={styles.input}
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter event location"
              />
              {errors.location && (
                <div className={styles.error}>{errors.location}</div>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                className={styles.input}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="Music & Entertainment">
                  Music & Entertainment
                </option>
                <option value="Technology">Technology</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Arts & Culture">Arts & Culture</option>
                <option value="Sports">Sports</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <div className={styles.error}>{errors.category}</div>
              )}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="imageFile">
                Event Image
              </label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                className={styles.input}
                accept="image/*"
                onChange={handleImageChange}
              />
              {errors.imageFile && (
                <div className={styles.error}>{errors.imageFile}</div>
              )}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Event preview"
                  className={`${styles.imagePreview} ${styles.show}`}
                />
              )}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Organizer Details</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="organizerName">
                Organizer Name
              </label>
              <input
                type="text"
                id="organizerName"
                name="organizerName"
                className={styles.input}
                value={formData.organizerName}
                onChange={handleChange}
                placeholder="Enter organizer name"
              />
              {errors.organizerName && (
                <div className={styles.error}>{errors.organizerName}</div>
              )}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="contactEmail">
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                className={styles.input}
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="Enter contact email"
              />
              {errors.contactEmail && (
                <div className={styles.error}>{errors.contactEmail}</div>
              )}
            </div>
          </div>
        </div>

        {errors.submit && <div className={styles.error}>{errors.submit}</div>}
        {submitSuccess && (
          <div className={styles.success}>
            Event created successfully! Redirecting to events page...
          </div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
