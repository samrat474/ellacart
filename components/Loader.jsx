import Container from "./Container";

const Loader = ({ type, ...rest }) => {
  const Card = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
        {[1, 2, 3].map((item, index) => (
          <div
            className="bg-zinc-100 rounded-3xl aspect-square animate-pulse"
            style={{
              opacity: 1 - 0.4 * item,
            }}
            key={index}
          ></div>
        ))}
      </div>
    );
  };

  const Stack = () => {
    return (
      <div className="grid grid-cols-1 gap-4 items-center">
        {[1, 2, 3].map((item, index) => (
          <div
            className="bg-zinc-100 rounded-3xl py-12 animate-pulse"
            style={{
              opacity: 1 - 0.4 * item,
            }}
            key={index}
          ></div>
        ))}
      </div>
    );
  };

  switch (type) {
    case "stack":
      return <Stack />;
    case "card":
    default:
      return <Card />;
  }
};

export default Loader;
