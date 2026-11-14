import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { ExternalLink, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "./ui";

const navItems = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/featured", label: "Featured" },
  { to: "/admin/content", label: "Site Content" },
];

export default function AdminLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={20} className="text-gray-900" />
            <span className="font-semibold">SYL Admin</span>
          </div>

          <nav className="flex flex-wrap items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="secondary">
                <ExternalLink size={16} />
                View site
              </Button>
            </Link>
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut size={16} />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
        <Outlet />
      </main>
    </div>
  );
}
