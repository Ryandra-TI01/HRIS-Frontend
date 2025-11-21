import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(value);
};

const formatMonth = (period) => {
    const [year, month] = period.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
};

export default function MySalaryCard({ slip }) {
    return (
        <Card className="border rounded-xl shadow-sm p-4">

            {/* Judul Bulan */}
            <CardHeader className="p-0 mb-3">
                <CardTitle className="text-lg font-semibold">
                    {formatMonth(slip.period_month)}
                </CardTitle>
            </CardHeader>

            {/* Box isi */}
            <CardContent className="p-0">
                <div className="border rounded-lg p-4 space-y-3">

                    <div className="flex justify-between text-sm">
                        <span>Bulan</span>
                        <span>{formatMonth(slip.period_month)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span>Gaji Pokok</span>
                        <span>{formatRupiah(slip.basic_salary)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span>Tunjangan</span>
                        <span>{formatRupiah(slip.allowance)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span>Potongan</span>
                        <span>{formatRupiah(slip.deduction)}</span>
                    </div>

                </div>

                {/* Download */}
                <div className="mt-3">
                    <button
                        className="text-green-600 text-sm font-medium hover:underline"
                    >
                        Download / Print
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
