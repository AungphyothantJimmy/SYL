import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import { Alert, Button } from "./ui";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (session) navigate("/admin", { replace: true });
  }, [session, navigate]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;

    setError(null);
    setSubmitting(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to sign in. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Sign In</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage Shwe Yadanar Lin website.
          </p>
        </div>

        {!isSupabaseConfigured ? (
          <div className="mt-6 space-y-3">
            <Alert type="info">
              Supabase is not configured yet. Create a project, run the schema
              in <code>supabase/schema.sql</code>, then add your URL and anon
              key to <code>.env</code>.
            </Alert>
            <Link
              to="/"
              className="block text-center text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Back to website
            </Link>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {error && <Alert>{error}</Alert>}

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </span>
              <div className="flex items-center gap-2 rounded-md border border-gray-300 px-3">
                <Mail size={16} className="text-gray-400" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-transparent py-2 text-sm text-gray-900 focus:outline-none"
                  placeholder="admin@example.com"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </span>
              <div className="flex items-center gap-2 rounded-md border border-gray-300 px-3">
                <Lock size={16} className="text-gray-400" />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-transparent py-2 text-sm text-gray-900 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </label>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"}
            </Button>

            <Link
              to="/"
              className="block text-center text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Back to website
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
