import { PropagateLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed inset-0 w-full h-screen bg-[rgb(0,0,0,0.35)] z-[100] top-0 backdrop-blur">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100">
        <PropagateLoader color="#ffd698" />
      </div>
    </div>
  );
};

export default Loader;
