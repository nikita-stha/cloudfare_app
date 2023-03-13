import React, { useState, useEffect } from "react";

import "./Main.css";
import Table from "./Table.js";
import TimeSeriesChart from "./TimeSeriesChart";
import { GET_TRAFFIC_CHANGE_API, GET_TOP_DOMAIN_API, GET_DDOS_ATTACK_API } from "../constants/apiEndpoints";


export default function Main(){
    const [trafficChange, setTrafficChange] = useState([]);
    const [topDomain, setTopDomain] = useState([]);
    const [attackData, setAttackData] = useState([]);

    const columns = [
        {
          Header: "Rank",
          accessor: "rank",
        },
        {
          Header: "Domain",
          accessor: "domain",
        },
        {
          Header: "Category",
          accessor: "category",
        },
    ];

    useEffect(() => {
        const getTrafficChangeData = async() => {
            try{
                const resp = await fetch(GET_TRAFFIC_CHANGE_API);
                const respJson = await resp.json();
                
                const datas = [];
                respJson.data.total.values.forEach((v,ind) => {
                    datas.push({Date: respJson.data.total.timestamps[ind], http: respJson.data.http.values[ind], total: v});
                });
                setTrafficChange(datas);
                console.log(datas)
            }catch(err){
                console.log(err);
            }
        }

        const getTopDomain = async() => {
            try{
                const resp = await fetch(GET_TOP_DOMAIN_API);
                const respJson = await resp.json();
                setTopDomain(respJson.rankingEntries)
            }catch(err){
                console.log(err)
            }
        }
        
        const getAttackData = async() => {
            try{
                const resp = await fetch(GET_DDOS_ATTACK_API);
                const respJson = await resp.json();
                
                const datas = [];
                respJson.data.values.forEach((v,ind) => {
                    datas.push({Date: respJson.data.timestamps[ind], total: v})
                });

                setAttackData(datas)
            }catch(err){
                console.log(err)
            }
        }

        getTrafficChangeData()
        getTopDomain()
        getAttackData()
    }, []);
  
      
      return (
        <div className="main-wrapper">
            {trafficChange.length>0 && <TimeSeriesChart title="Change in the amount of Internet traffic (total vs http)" data={trafficChange} multi={true} ></TimeSeriesChart>}
            {topDomain.length>0 && <Table data={topDomain} column = {columns} title = "Top Domain List for past 30 days"></Table>}
            {attackData.length>0 && <TimeSeriesChart title=" Layer 3 DDoS Attack over the last 30 Days" data={attackData} multi={false} ></TimeSeriesChart>}
        </div>
    );
    
}
