// lib/data/chart.ts
// Generates pseudo-random but deterministic daily chart data
function seeded(seed: number): number {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
}

export interface DayData {
    date: string;        // "MMM D" display label
    dateKey: string;     // "YYYY-MM-DD" for filtering
    youtube: number;
    instagram: number;
    tiktok: number;
}

// Generate `count` days of data ending today
export function generateChartData(count: number = 400): DayData[] {
    const today = new Date();
    const result: DayData[] = [];
    for (let i = count - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const key = d.toISOString().split("T")[0]; // YYYY-MM-DD
        const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        const base = seeded(i * 3);
        result.push({
            date: label,
            dateKey: key,
            youtube: Math.round(1000 + base * 9000),
            instagram: Math.round(500 + seeded(i * 3 + 1) * 5000),
            tiktok: Math.round(300 + seeded(i * 3 + 2) * 4000),
        });
    }
    return result;
}

// Legacy static export still usable
export const chartData = generateChartData(30);

