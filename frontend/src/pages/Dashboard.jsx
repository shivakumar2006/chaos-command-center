import { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

/* ---------------- INITIAL DATA ---------------- */

const normalLineData = [
    { time: "10:00", success: 160, failed: 20 },
    { time: "10:05", success: 170, failed: 25 },
    { time: "10:10", success: 165, failed: 30 },
    { time: "10:15", success: 175, failed: 28 },
    { time: "10:20", success: 180, failed: 22 },
];

const chaosLineData = [
    { time: "10:00", success: 140, failed: 50 },
    { time: "10:05", success: 90, failed: 110 },
    { time: "10:10", success: 60, failed: 160 },
    { time: "10:15", success: 80, failed: 140 },
    { time: "10:20", success: 100, failed: 120 },
];

const normalPie = [
    { name: "Successful", value: 78 },
    { name: "Failed", value: 17 },
    { name: "Crashed", value: 5 },
];

const chaosPie = [
    { name: "Successful", value: 42 },
    { name: "Failed", value: 38 },
    { name: "Crashed", value: 20 },
];

const PIE_COLORS = ["#16a34a", "#f59e0b", "#dc2626"];

/* ---------------- DASHBOARD ---------------- */

export default function Dashboard() {
    const [chaos, setChaos] = useState(false);
    const [time, setTime] = useState(new Date());
    const [lineData, setLineData] = useState(normalLineData);
    const [pieData, setPieData] = useState(normalPie);

    /* Live clock */
    useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    /* CHAOS DATA SWITCH */
    useEffect(() => {
        if (chaos) {
            setLineData(chaosLineData);
            setPieData(chaosPie);
        } else {
            setLineData(normalLineData);
            setPieData(normalPie);
        }
    }, [chaos]);

    return (
        <div
            className={`relative min-h-screen transition-all duration-700 ${chaos ? "bg-red-50 shake" : "bg-[#F7F7F8]"
                }`}
        >
            {/* CHAOS OVERLAY */}
            {chaos && (
                <div className="absolute inset-0 bg-red-600/10 pointer-events-none animate-pulse" />
            )}

            {/* TOP BAR */}
            <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-10 py-6 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-semibold text-slate-900">
                        Chaos Command Center
                    </h1>
                    <p className="text-xs text-gray-400 tracking-wide">
                        System Observability Dashboard
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <span className="text-xs text-gray-400">
                        {time.toLocaleTimeString()}
                    </span>

                    <button
                        onClick={() => setChaos(!chaos)}
                        className={`px-6 py-2 rounded-lg font-medium transition ${chaos
                            ? "bg-green-600 text-white hover:bg-green-500"
                            : "bg-red-600 text-white hover:bg-red-500"
                            }`}
                    >
                        {chaos ? "Stabilize System" : "Initiate Chaos"}
                    </button>
                </div>
            </div>

            {/* CONTENT */}
            <div className="px-10 py-10 space-y-10">

                {/* ALERT */}
                {chaos && (
                    <div className="bg-red-600 text-white px-6 py-4 rounded-xl shadow-lg shake">
                        ⚠ Multiple system failures detected · Immediate action required
                    </div>
                )}

                {/* METRICS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Metric title="Requests / Sec" value={chaos ? "920" : "1680"} />
                    <Metric title="Error Rate" value={chaos ? "46%" : "12%"} danger />
                    <Metric title="System State" value={chaos ? "CRITICAL" : "NOMINAL"} />
                </div>

                {/* CHARTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* LINE CHART */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <p className="text-xs tracking-widest text-gray-400 mb-4">
                            REQUESTS OVER TIME
                        </p>

                        <ResponsiveContainer width="100%" height={260}>
                            <LineChart data={lineData}>
                                <XAxis dataKey="time" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="success"
                                    stroke="#16a34a"
                                    strokeWidth={3}
                                    dot={false}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="failed"
                                    stroke="#dc2626"
                                    strokeWidth={3}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* PIE CHART */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <p className="text-xs tracking-widest text-gray-400 mb-4">
                            REQUEST DISTRIBUTION
                        </p>

                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={70}
                                    outerRadius={100}
                                >
                                    {pieData.map((_, index) => (
                                        <Cell key={index} fill={PIE_COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="mt-4 flex justify-around text-sm">
                            <span className="text-green-600">● Success</span>
                            <span className="text-yellow-500">● Failed</span>
                            <span className="text-red-600">● Crashed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------------- COMPONENTS ---------------- */

function Metric({ title, value, danger }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-xs text-gray-400 tracking-widest uppercase">
                {title}
            </p>
            <h2
                className={`text-4xl font-semibold mt-3 ${danger ? "text-red-600" : "text-slate-900"
                    }`}
            >
                {value}
            </h2>
        </div>
    );
}
