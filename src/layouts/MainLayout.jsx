import { Outlet } from "react-router-dom";

import AnnouncementBar from "../components/layout/AnnouncementBar/AnnouncementBar";
import Navbar from "../components/layout/Navbar/Navbar";

import Footer from "../components/common/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <Outlet />

      <Footer />
      
    </>
  );
};

export default MainLayout;