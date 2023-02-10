import getAPImessage from "../../../utils/getAPImessage";
import styles from "./toastMessage.module.scss";

export default function ToastMessage({ error }) {
  return (
    <div className={styles.ToastMessage}>
      <p>Server error message:</p>
      <p>{getAPImessage(error)}</p>
    </div>
  );
}
