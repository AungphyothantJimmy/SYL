import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SignatureItems from "./SignatureItems";
import { useContent } from "../context/ContentContext";

const SectionBackground = "oklch(0.869 0.005 56.366)";

const AllItemsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Go back to the previous page when there is in-app history
  // (e.g. a product detail page); otherwise return Home.
  const handleBack = () => {
    const historyState = window.history.state as { idx?: number } | null;
    if (
      historyState &&
      typeof historyState.idx === "number" &&
      historyState.idx > 0
    ) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: SectionBackground }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6 md:px-6">
        <button
          className="flex items-center gap-2 border border-gray-800 px-4 py-2 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
          onClick={handleBack}
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      <SignatureItems items={data.products} />
    </div>
  );
};

export default AllItemsPage;
