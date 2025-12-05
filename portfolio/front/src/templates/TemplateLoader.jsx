import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Fetch from "../Fetch.js";

function TemplateLoader() {
  const [Comp, setComp] = useState(null);
  const [data, setData] = useState(null);
  const [url, setUrl] = useState("");
  const { id } = useParams();

  // FIRST API CALL – get bill data
  useEffect(() => {
    const loadBill = async () => {
      const response = await Fetch.get(`bill/${id}`);
      const billData = response.data;


      // SECOND API CALL – only if userId exists
      if (billData.userId) {
        const userRes = await Fetch.get(`get-user-id/${billData.userId}`);
        setData(userRes.data);
      }
      if (billData.portfolioId){
          const portfolioResponse = await Fetch.get(`portfolio/${billData.portfolioId}`)
          const portfolioData = portfolioResponse.data;
          setUrl(portfolioData.path)
      }
    };

    loadBill();
  }, [id]);

  // DYNAMIC IMPORT OF TEMPLATE
  useEffect(() => {
    if (!url) return;

    import(url)
      .then((module) => setComp(() => module.default))
      .catch((err) => console.error("Error loading template:", err));
  }, [url]);

  if (!Comp) return <p>Loading template...</p>;

  return <Comp data={data} />;
}

export default TemplateLoader;

