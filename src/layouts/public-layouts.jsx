import { Outlet } from "react-router";
import Navbar from "../components/public/Navbar";

export default function PublicLayouts() {
  return (
    <>
      <Navbar />
      <main className="mx-auto">
        <Outlet />
      </main>
    </>
  );
}
