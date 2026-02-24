import "./Loader.css";

interface LoaderProps {
  fullScreen?: boolean;
}

const Loader = ({ fullScreen = true }: LoaderProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: fullScreen ? "100vh" : "100%",
        width: "100%",
      }}
    >
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
