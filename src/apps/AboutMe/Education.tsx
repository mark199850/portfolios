import styles from "./Education.module.scss";
import CodeLogo from "./assets/code.png";
import CADLogo from "./assets/cad.png";

type Education = {
  logo: string;
  type: string;
  school: string;
  graduationYear: string;
  description: string;
  tags: string[];
};

const educations: Education[] = [
  {
    logo: CADLogo,
    type: "CAD-CAM programmer",
    school: "Miskolci SZC Andrássy Gyula Gépipari Technikum",
    graduationYear: "2019",
    description: "",
    tags: ["CAD", "CAM", "CNC", "G-Code", "Autodesk Inventor"],
  },
  {
    logo: CodeLogo,
    type: "Software developer and tester",
    school: "Miskolci SZC Kandó Kálmán Informatikai Technikum",
    graduationYear: "2022",
    description: "",
    tags: ["JavaScript", "C#", "SQL", "HTML"],
  },
];

export function Education() {
  return (
    <div className={styles.educationList}>
      {educations.map((education, index) => {
        return (
          <div key={index} className={styles.item}>
            <div className={styles.logo}>
              <img src={education.logo} alt="" />
            </div>
            <div className={styles.text}>
              <h3>{education.type}</h3>
              <p>
                {education.school} | {education.graduationYear}
              </p>
              <p>{education.description}</p>
              <div className={styles.tagList}>
                {education.tags.map((tag) => {
                  return (
                    <span key={tag} className={styles.tag}>
                      &lt;{tag}&gt;
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
