import React from "react";
import Clipboard from "../component/Clipboard";

export default function Card({ portfolios }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolios.map((portfolio) => (
        <div
          key={portfolio.id}
          className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="h-48 bg-gray-200">
            <img
              src={portfolio.thumbnail}
              alt={portfolio.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-thumbnail.jpg";
              }}
            />
          </div>
          <div className="p-4 flex flex-col justify-between gap-3">
            <h3 className="font-bold text-lg text-gray-800">
              {portfolio.name}
            </h3>
            <p className="text-sm text-gray-600">{portfolio.description}</p>
            <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
              <a
                href={portfolio.path}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                View Details
              </a>
              <Clipboard textToCopy={portfolio.url || portfolio.path} />
              <div className="flex gap-1 ">
                <button
                  onClick={() =>
                    window.open(portfolio.link || portfolio.path, "_blank")
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 w-1/2 rounded-md text-sm font-medium"
                >
                  Preview
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 w-1/2 rounded-md text-sm font-medium">
                  Unclaim
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
