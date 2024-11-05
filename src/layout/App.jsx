import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

import ServicesPage from "../pages/ServicesPage/ServicesPage";
import Label from "../components/common/LabelComponent";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {
  getActiveServices,
  getrevokedServices,
  getRecentServices,
  getRecentRevokedServices,
} from "../service/externalDataServices"; // API 함수 불러오기

function App() {
  const [activeServices, setActiveServices] = useState([]);
  const [revokedServices, setrevokedServices] = useState([]);
  const [recentServices, setRecentServices] = useState([]);
  const [recentRevokedServices, setRecentRevokedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [active, revoked, recent, recentRevoked] = await Promise.all([
          getActiveServices(),
          getrevokedServices(),
          getRecentServices(),
          getRecentRevokedServices(),
        ]);
        setActiveServices(active);
        setrevokedServices(revoked);
        console.log("revokedServices", revokedServices);
        setRecentServices(recent);
        setRecentRevokedServices(recentRevoked);
      } catch (error) {
        console.error("데이터 불러오기 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log("recentRevokedServices", recentRevokedServices);
  console.log("revokedServices", revokedServices);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="app">
      {/* <Header /> */}
      <div className="homepage">
        {/* <Label /> */}
        <ServicesPage
          recentServices={recentServices}
          activeServices={activeServices}
          revokedServices={revokedServices}
          recentRevokedServices={recentRevokedServices}
        />
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
