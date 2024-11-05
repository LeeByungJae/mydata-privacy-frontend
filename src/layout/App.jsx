import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import _ from "lodash"; 
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

import ServicesPage from "../pages/ServicesPage/ServicesPage";
import Label from "../components/common/LabelComponent";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { login } from '../redux/user';
import queryString from 'query-string';

   
import {
  getAuthLogin,
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
  const [userId, setUserId] = useState(null);
  const [mbrMngId, setMbrMngId] = useState(null);
  const dispatch = useDispatch()   
  const userStore = useSelector((state) => state.user.value)
  const [location, setLocation] = useState({ ...window.location });
  // const [searchParams, setSearchParams] = useSearchParams();
  
  
  const  auth = async () => {   
     const auth = await getAuthLogin(userId)
     //  const auth = null
     console.log(">>>>>>>>>>>>>>>>>> auth", userId, auth)
     if(!auth){
        alert("사용자 정보가 존재하지 않습니다.")
        return false
     }
     dispatch(login(auth))  
     setMbrMngId(auth.mbrMngId)
     return true
  }
  
  useEffect(() => {   
    if(_.isEmpty(mbrMngId)){      
      const parsed = queryString.parse(location.search)
      const {id} = parsed
      setUserId(id)      
      auth()
    }
    const fetchData = async () => {      
      setLoading(true);
      try {        
        console.log(">>>>>>>>>>>>>>>>>> mbrMngId", mbrMngId)
        //const id = "AL202401010000000001"     
        const [active, revoked, recent, recentRevoked] = await Promise.all([
           getActiveServices(mbrMngId),
           getrevokedServices(mbrMngId),
           getRecentServices(mbrMngId),
           getRecentRevokedServices(mbrMngId),
        ]);
        active.map((item) => {
            const {data_providers} = item
            data_providers.map((item1) => {
                const {data_provided} = item1
                item1.providedData = _.isEmpty(data_provided)  ? [] : _.split(data_provided, ",")                
            })
         })
         
         revoked.map((item) => {
          const {data_providers} = item
          data_providers.map((item1) => {
              const {data_provided} = item1
              item1.providedData = _.isEmpty(data_provided)  ? [] : _.split(data_provided, ",")                
          })
        })       
        recent.map((item) => {
          const {data_providers} = item
          data_providers.map((item1) => {
              const {data_provided} = item1
              item1.providedData = _.isEmpty(data_provided)  ? [] : _.split(data_provided, ",")                
          })
        })       
        recentRevoked.map((item) => {
          const {data_providers} = item
          data_providers.map((item1) => {
              const {data_provided} = item1
              item1.providedData = _.isEmpty(data_provided)  ? [] : _.split(data_provided, ",")                
          })
        })
         //console.log(">>>>>>>>>>>>>>>> active", active);
        //  console.log(">>>>>>>>>>>>>>>> revoked", revoked);
        //  console.log(">>>>>>>>>>>>>>>> recent", recent);
        //  console.log(">>>>>>>>>>>>>>>> recentRevoked", recentRevoked);
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
    if(!_.isEmpty(mbrMngId)) fetchData();
  }, [userId, mbrMngId]);
  console.log("recentRevokedServices", recentRevokedServices);
  console.log("revokedServices", revokedServices);
  if(_.isEmpty(userStore.mbrMngId)) {
    return <div></div>;
  }   

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
