import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  Home,
  DollarSign,
  Mail,
  Zap,
} from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!isLoaded) return null;

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const navLinks = [
    { name: "Features", path: "/features", icon: Zap },
    { name: "Pricing", path: "/pricing", icon: DollarSign },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-md"
          : "bg-white border-b"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg">
            <span className="text-blue-700">Synapse</span>
            <span className="text-amber-500">CRM</span>
          </span>
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((l) => (
            <Link
              key={l.name}
              to={l.path}
              className="px-3 py-2 rounded-lg text-sm hover:bg-blue-50 flex items-center gap-2"
            >
              <l.icon className="w-4 h-4" />
              {l.name}
            </Link>
          ))}

          {!isSignedIn ? (
            <Link
              to="/login"
              className="ml-2 px-5 py-2 bg-blue-600 text-white rounded-lg"
            >
              Login
            </Link>
          ) : (
            <div className="relative ml-2" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <img
                  src={user.imageUrl}
                  alt="avatar"
                  className="w-7 h-7 rounded-full"
                />
                <span className="max-w-[100px] truncate text-sm">
                  {user.fullName}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium truncate">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
