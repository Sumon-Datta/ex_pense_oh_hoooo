import { ClipLoader } from "react-spinners";

function LoadingScreen({
  text = "Loading your financial data...",
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">

      <div className="bg-white shadow-2xl rounded-3xl px-10 py-10 flex flex-col items-center">

        <ClipLoader
          color="#2563eb"
          size={65}
          speedMultiplier={1}
        />

        <h2 className="mt-8 text-2xl font-bold text-gray-800">
          {text}
        </h2>

        <p className="mt-2 text-gray-500">
          Please wait while we prepare everything...
        </p>

      </div>

    </div>
  );
}

export default LoadingScreen;