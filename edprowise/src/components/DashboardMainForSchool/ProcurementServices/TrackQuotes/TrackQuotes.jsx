import React from "react";
import TrackQuoteTable from "./TrackQuoteTable.jsx";
import RequestQuote from "./RequestQuote/RequestQuote.jsx";
import ViewRequestedQuote from "./ViewRequestedQuote/ViewRequestedQuote.jsx";
import { useLocation } from "react-router-dom";
import ViewQuote from "./ViewQuote/ViewQuote.jsx";
import ViewAllQuoteTable from "./ViewAllQuoteTable/ViewAllQuoteTable.jsx";

const TrackQuotes = () => {
  const location = useLocation();

  const isCreateRoute =
    location.pathname ===
    "/school-dashboard/procurement-services/request-quote";

  const isViewRoute =
    location.pathname ===
    "/school-dashboard/procurement-services/view-requested-quote";

  const isViewQuoteRoute =
    location.pathname === "/school-dashboard/procurement-services/view-quote";

  const isViewAllQuoteTableRoute =
    location.pathname ===
    "/school-dashboard/procurement-services/view-quote-table";

  return (
    <>
      {isCreateRoute ? (
        <RequestQuote />
      ) : isViewRoute ? (
        <ViewRequestedQuote />
      ) : isViewQuoteRoute ? (
        <ViewQuote />
      ) : isViewAllQuoteTableRoute ? (
        <ViewAllQuoteTable />
      ) : (
        <TrackQuoteTable />
      )}
    </>
  );
};
export default TrackQuotes;
