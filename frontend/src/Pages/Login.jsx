import { SignIn, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

const Login = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      const role = user?.publicMetadata?.role || "user";
      navigate(role === "admin" ? "/admin" : "/dashboard", { replace: true });
    }
  }, [isLoaded, isSignedIn, user, navigate]);

  if (!isLoaded) return <PageLoader label="Authentication Loading..." />;

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-blue-50 via-white to-amber-50">
      
      {/* LEFT – BRAND / VALUE PROP */}
      <div className="hidden lg:flex flex-col justify-center px-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <LogIn className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Synapse<span className="text-amber-400">CRM</span>
            </h1>
          </div>

          <h2 className="text-4xl font-bold leading-tight mb-4">
            One CRM.<br />Total control.
          </h2>

          <p className="text-blue-100 text-lg mb-10">
            Secure, scalable, and built for real business workflows — not demos.
          </p>

          <ul className="space-y-4 text-blue-50">
            {[
              "Role-based access control",
              "Audit-ready authentication",
              "Zero password management",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT – AUTH */}
      <div className="flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md">
          
          {/* MOBILE BRAND */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <LogIn className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-blue-700">Synapse</span>
                <span className="text-amber-500">CRM</span>
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Sign in to continue
            </p>
          </div>

          {/* CLERK CARD */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
            <SignIn
              routing="path"
              path="/login"
              signUpUrl="/signup"
              appearance={{
                elements: {
                  card: "shadow-none p-0",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  formButtonPrimary:
                    "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
                  formFieldInput:
                    "rounded-lg border-gray-300 focus:ring-blue-500",
                  footerActionLink:
                    "text-blue-600 hover:text-blue-700",
                },
              }}
            />
          </div>

          {/* FOOTER */}
          <p className="mt-6 text-center text-xs text-gray-500">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-blue-600 hover:underline">
              Terms
            </a>{" "}
            &{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
