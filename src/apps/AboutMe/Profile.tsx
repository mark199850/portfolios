import ProfileIcon from "./assets/profile.png";
import styles from "./Profile.module.scss";

export function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.profileImageWrapper}>
          <img
            className={styles.profileImage}
            src={ProfileIcon}
            alt={`${ProfileIcon} icon`}
          />
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.detailRow}>
            <dt className={styles.label}>Name:</dt>
            <dd>Pócs Márk</dd>
          </div>
          <div className={styles.detailRow}>
            <dt className={styles.label}>Role:</dt>
            <dd>Software Developer</dd>
          </div>
          <div className={styles.detailRow}>
            <dt className={styles.label}>Experience:</dt>
            <dd>2.5 years</dd>
          </div>
        </div>
      </div>
      <p className={styles.description}>
        I am a software developer passionate about Linux, modern web
        technologies, and fluid user interfaces. I enjoy crafting seamless
        digital experiences that feel fast, intuitive, and alive. This Web OS is
        a personal project built to showcase my frontend architecture skills,
        attention to detail, and love for creating immersive UI systems.
      </p>
    </div>
  );
}
