import { DesktopEnvironment } from "./shell/DesktopEnvironment/DesktopEnvironment.tsx";
import styles from "./App.module.scss";
import { InitSystem } from "./system/InitSystem/InitSystem.tsx";

function App() {
  return (
    <div className={styles.container}>
      <InitSystem />
      <DesktopEnvironment />
    </div>
  );
}

export default App;
