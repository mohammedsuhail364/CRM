import { SignUp } from "@clerk/clerk-react";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <SignUp
          routing="path"
          path="/signup"
          signInUrl="/login"
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
};

export default Signup;
