import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Fetch from "../Fetch.js";
import LoadingSpinner from "../pages/component/Loading.jsx"
// Load all template files at build time
const templates = import.meta.glob("./portfoilos/*.jsx");

function TemplateLoader() {
  const { id } = useParams();
  const [Comp, setComp] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1️⃣ FIRST API CALL – get bill data
        const billResponse = await Fetch.get(`bill/${id}`);
        const billData = billResponse.data;

        // 2️⃣ SECOND API CALL – get user data if userId exists
        if (billData.userId) {
          try {
            const userRes = await Fetch.get(`get-user-id/${billData.userId}`);
            setUserData(userRes.data);
          } catch (userError) {
            console.warn("Failed to fetch user data:", userError);
            // Continue even if user data fails
          }
        }

        // 3️⃣ THIRD API CALL – get portfolio data if portfolioId exists
        let templateName = "";
        if (billData.portfolioId) {
          try {
            const portfolioResponse = await Fetch.get(`portfolio/${billData.portfolioId}`);
            const portfolioData = portfolioResponse.data;
            templateName = portfolioData.path;
            
            // Store additional portfolio data if needed
            setTemplateData({
              ...portfolioData,
              billData, // Include bill data in template data
            });
          } catch (portfolioError) {
            console.error("Failed to fetch portfolio:", portfolioError);
            throw new Error("Unable to load portfolio template");
          }
        } else {
          throw new Error("No portfolio ID found in bill data");
        }

        // 4️⃣ DYNAMIC IMPORT OF TEMPLATE
        const templatePath = `./portfoilos/${templateName}.jsx`;
        const importer = templates[templatePath];

        if (!importer) {
          throw new Error(`Template "${templateName}" not found`);
        }

        const module = await importer();
        setComp(() => module.default);

      } catch (err) {
        console.error("Template loading error:", err);
        setError(err.message || "Failed to load template");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  // Handle loading state
  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner 
        type="cube" 
        message="Loading portfolio template..." 
      />
    </div>
  );
}


  // Handle error state
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600 font-medium">Error Loading Template</p>
        <p className="text-red-500 text-sm mt-1">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  // Handle no component state
  if (!Comp) {
    return <p className="text-yellow-600">Template component not available</p>;
  }

  // Render the loaded template with all available data
  return <Comp 
    portfolioData={userData}
  />;
}

export default TemplateLoader;