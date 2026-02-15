import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">
        FairFix
      </h1>

      <p className="text-gray-600 mb-8 text-center max-w-md">
        Resolve minor vehicle accidents fairly with transparent
        damage estimation and nearby mechanic support.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
