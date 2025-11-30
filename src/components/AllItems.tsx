import React, { useEffect } from "react";
import SignatureItems from "./SignatureItems";
import { allSignatureItems } from "../App";
import { useNavigate } from "react-router-dom";

const AllItemsPage: React.FC = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="text-center my-6">
        <button
          className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
      <SignatureItems items={allSignatureItems} />
    </div>
  );
};

export default AllItemsPage;
