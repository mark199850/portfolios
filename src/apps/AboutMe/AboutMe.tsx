import { useState, type ElementType } from "react";
import styles from "./AboutMe.module.scss";
import { Profile } from "./Profile";
import { Experience } from "./Experience";
import { Education } from "./Education";
import { Projects } from "./Projects";

const tabs: Record<string, ElementType> = {
  Profile: Profile,
  Experience: Experience,
  Education: Education,
  Projects: Projects,
};

function AboutMe() {
  const [activeTab, setActiveTab] = useState("Profile");
  const ActiveContentComponent = tabs[activeTab];

  return (
    <div className={styles.container}>
      <div className={styles.sidePanel}>
        {Object.keys(tabs).map((tabName) => {
          return (
            <button
              key={tabName}
              className={`${styles.menuButton} ${activeTab === tabName ? styles.active : ""}`}
              onClick={() => setActiveTab(tabName)}
            >
              {tabName}
            </button>
          );
        })}
      </div>

      <div className={styles.contentArea}>
        {ActiveContentComponent ? <ActiveContentComponent /> : null}
      </div>
    </div>
  );
}

export { AboutMe };
