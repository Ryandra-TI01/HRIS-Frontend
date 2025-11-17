import {Spinner} from "./ui/spinner";

export default function Loading({ message = "Loading...", height = "h-64" }) {
  return (
    <div className={`flex items-center justify-center ${height}`}>
      <Spinner />
      <span className="ml-2">{message}</span>
    </div>
  );
}
