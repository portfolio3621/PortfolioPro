import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Fetch from "../Fetch.js";
import data from "../../../data.json";
import LoadingSpinner from "../pages/component/Loading.jsx"

// Load all templates at build time
const templates = import.meta.glob("./portfoilos/*.jsx");

function ExampleTemplateLoader() {
  const { id } = useParams();
  const [Comp, setComp] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        // 1️⃣ Fetch portfolio info
        const response = await Fetch.get(`portfolio/${id}`);
        const templateName = response.data.path; // e.g. "TemplateOne"

        // 2️⃣ Match template file
        const templatePath = `./portfoilos/${templateName}.jsx`;
        const importer = templates[templatePath];

        if (!importer) {
          throw new Error("Template not found");
        }

        // 3️⃣ Import template
        const module = await importer();
        setComp(() => module.default);
      } catch (err) {
        console.error(err);
        setError("Failed to load template");
      }
    };

    loadTemplate();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!Comp) return <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner 
        type="wave" 
        message="Loading portfolio template..." 
      />
    </div>;

  return <Comp portfolioData={data} />;
}

export default ExampleTemplateLoader;