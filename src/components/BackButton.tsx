import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  label?: string;
  className?: string;
};

/**
 * History-aware back button: returns to the previous in-app page when there
 * is one (e.g. a product or collection page), otherwise goes Home so direct
 * link visitors never get stuck.
 */
export default function BackButton({ label = "Back", className = "" }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const historyState = window.history.state as { idx?: number } | null;
    if (historyState && typeof historyState.idx === "number") {
      if (historyState.idx > 0) {
        navigate(-1);
      } else {
        // First entry of the session — nothing in-app to go back to.
        navigate("/", { replace: true });
      }
    } else if (location.key !== "default") {
      // History entry created outside the router (e.g. a hash-anchor click).
      // That entry was pushed onto this document's own history stack, so the
      // previous entry is still an in-app page — going back is safe.
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <button
      className={`flex items-center gap-2 rounded-full border border-amber-500/40 bg-white/60 backdrop-blur-md px-4 py-2 text-gray-900 hover:bg-amber-50 hover:scale-105 transition-all duration-300 ${className}`}
      onClick={handleBack}
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}
