import { toast } from "react-toastify";
import ToastMessage from "../components/errors/toastMessage/toastMessage.component";

const errorResponseHandler = (error) => {
  console.log("errorResponseHandler error: ", error);
  toast.error(<ToastMessage error={error} />);

  return Promise.reject(error);
};

export default errorResponseHandler;
