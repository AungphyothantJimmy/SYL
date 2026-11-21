import React, { useEffect } from "react";
import SignatureItems from "./SignatureItems";
import BackButton from "./BackButton";
import { useContent } from "../context/ContentContext";

const SectionBackground = "oklch(0.94 0.02 150)";

const AllItemsPage: React.FC = () => {
  const { data } = useContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: SectionBackground }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6 md:px-6">
        <BackButton />
      </div>

      <SignatureItems items={data.products} maxItems={0} />
    </div>
  );
};

export default AllItemsPage;
