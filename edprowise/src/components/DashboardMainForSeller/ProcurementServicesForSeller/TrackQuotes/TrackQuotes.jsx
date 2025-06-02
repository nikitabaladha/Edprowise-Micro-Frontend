import React from "react";
import TrackQuoteTable from "./TrackQuoteTable";

import ViewRequestedQuote from "./ViewRequestedQuote/ViewRequestedQuote.jsx";
import SubmitQuote from "./SubmitQuote/SubmitQuote.jsx";
import { useLocation } from "react-router-dom";

const TrackQuotes = () => {
  const location = useLocation();

  const isViewRoute =
    location.pathname ===
    "/seller-dashboard/procurement-services/view-requested-quote";

  const isSubmitRoute =
    location.pathname === "/seller-dashboard/procurement-services/submit-quote";

  return (
    <>
      {isViewRoute ? (
        <ViewRequestedQuote />
      ) : isSubmitRoute ? (
        <SubmitQuote />
      ) : (
        <TrackQuoteTable />
      )}
    </>
  );
};
export default TrackQuotes;
