import { PropagateLoader } from "react-spinners";
import Overlay from "./UI/modal/Overlay";

const Loader = () => {
  return (
    <Overlay>
      <PropagateLoader color="#ffd698" />
    </Overlay>
  );
};

export default Loader;
