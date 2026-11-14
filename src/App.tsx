import React, { useRef } from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";
import Featured from "./components/Featured";
import About from "./components/About";
import SignatureItems from "./components/SignatureItems";
import AllItemsPage from "./components/AllItems";
import ItemDetailPage from "./components/ItemDetail";
import Footer from "./components/Footer";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProductsManager from "./components/admin/ProductsManager";
import FeaturedManager from "./components/admin/FeaturedManager";
import SiteContentManager from "./components/admin/SiteContentManager";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ContentProvider, useContent } from "./context/ContentContext";

const HomePage: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const { data } = useContent();

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const signatureProducts = data.products.filter(
    (product) => product.is_signature,
  );
  const items = (
    signatureProducts.length > 0 ? signatureProducts : data.products
  ).slice(0, 3);

  return (
    <>
      <Home scrollToFooter={scrollToFooter} />
      <Featured />
      <SignatureItems items={items} showAllButton />
      <About />
      <Footer ref={footerRef} />
    </>
  );
};

const ContentWarning: React.FC = () => {
  const { error } = useContent();
  if (!error) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md bg-gray-900 px-4 py-2 text-center text-xs text-white shadow-lg">
      Live content could not be loaded. Showing saved content.
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ContentProvider>
          <ContentWarning />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/all-items" element={<AllItemsPage />} />
            <Route path="/item/:id" element={<ItemDetailPage />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<ProductsManager />} />
              <Route path="featured" element={<FeaturedManager />} />
              <Route path="content" element={<SiteContentManager />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ContentProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
