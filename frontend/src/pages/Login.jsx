import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center px-6">
            <div className="w-full max-w-md">

                {/* CARD */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
                    <p className="text-xs tracking-widest text-gray-400 mb-3">
                        SECURE ACCESS
                    </p>

                    <h2 className="text-3xl font-semibold text-slate-900 mb-2">
                        Sign in
                    </h2>

                    <p className="text-gray-500 mb-8">
                        Access the Chaos Command Center dashboard.
                    </p>

                    {/* INPUTS */}
                    <div className="space-y-5">
                        <input
                            className="w-full px-4 py-3 border placeholder:text-gray-500 text-gray-600 border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-slate-900 outline-none"
                            placeholder="Username"
                        />

                        <input
                            type="password"
                            className="w-full px-4 py-3 border placeholder:text-gray-500 text-gray-600 border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-slate-900 outline-none"
                            placeholder="Password"
                        />
                    </div>

                    {/* ACTION */}
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="mt-8 w-full py-3 rounded-lg
                       bg-slate-900 text-white
                       hover:bg-slate-800 transition"
                    >
                        Login
                    </button>

                    {/* FOOTER */}
                    <p className="mt-6 text-sm text-gray-500 text-center">
                        Don’t have access?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            className="text-slate-900 font-medium cursor-pointer hover:underline"
                        >
                            Request access
                        </span>
                    </p>
                </div>

                {/* SMALL FOOTNOTE */}
                <p className="mt-6 text-xs text-gray-400 text-center">
                    © Chaos Command Center · Secure System Access
                </p>
            </div>
        </div>
    );
}
