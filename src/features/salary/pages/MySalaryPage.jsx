import React, { useEffect, useState } from "react";
import { getMySalarySlip } from "../api/getMySalarySlip";
import MySalaryCard from "../components/MySalaryCard";
import MySalaryFilter from "../components/MySalaryFilter";

export default function MySalaryPage() {
    const [salaryList, setSalaryList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    // FILTER STATE
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const fetchSalary = async () => {
        try {
            const data = await getMySalarySlip();
            setSalaryList(data);
            setFilteredList(data);
        } catch (err) {
            console.log("Error Fetching Salary Slip:", err);
        }
    };

    useEffect(() => {
        fetchSalary();
    }, []);

    // FUNCTION UNTUK FILTER
    const handleFilterChange = (m, y) => {
        setMonth(m);
        setYear(y);

        const filtered = salaryList.filter((item) => {
            const [itemYear, itemMonth] = item.period_month.split("-");
            const matchMonth = m ? itemMonth === m : true;
            const matchYear = y ? itemYear === y : true;
            return matchMonth && matchYear;
        });

        setFilteredList(filtered);
    };

    return (
        <div className="p-6 md:p-8">

            {/* ROUTE INDICATOR */}
            <div className="text-xs text-muted-foreground mb-2">
                employee / salary
            </div>

            {/* TITLE */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">My Salary</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    View and download your salary slips
                </p>
            </div>

            {/* FILTER */}
            <MySalaryFilter
                selectedMonth={month}
                selectedYear={year}
                onFilterChange={handleFilterChange}
            />

            {/* LIST CARD */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {filteredList.length > 0 ? (
                    filteredList.map((slip) => (
                        <MySalaryCard key={slip.id} slip={slip} />
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground col-span-full">
                        No salary slip found.
                    </p>
                )}
            </div>
        </div>
    );
}
