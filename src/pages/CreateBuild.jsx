import { CreateBuildForm } from "../components/CreateBuildForm";
import styles from './CreateBuild.module.css';

export function CreateBuild() {
  return (
    <main className={styles.createBuildPage}>
      <h2>Publish a New Build</h2>
      <p>Share your build with other adventurers. Detail your stats, recommended equipment and strategy.</p>
      <CreateBuildForm />
    </main>
  );
}