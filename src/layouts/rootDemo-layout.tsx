import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";

export default function RootDemoLayout() {
  // const candidateId = localStorage.getItem("candidateId");

  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
