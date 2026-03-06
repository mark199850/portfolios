import { DesktopEnvironment } from "./components/system/DesktopEnvironment/DesktopEnvironment.tsx";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <DesktopEnvironment />
    </div>
  );
}

export default App;
