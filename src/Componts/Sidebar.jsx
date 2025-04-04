import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Import menu icons
import React from "react";
import { ArrowLeft, ArrowRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

const reports = [
  { id: 1, title: "Annual Report 2024", date: "14 March, 2024" },
  { id: 2, title: "Half Yearly Report 2024", date: "14 March, 2024" },
  { id: 3, title: "Annual Report 2023", date: "14 March, 2023" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Menu Button */}
      <Button
        className="fixed top-5 left-5 z-50 p-2 bg-gray-800 text-white rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-5 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="text-center">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-20 h-20 mx-auto rounded-full"
          />
          <h2 className="mt-2 text-lg font-semibold">Username</h2>
        </div>

        <Button
          variant="ghost"
          className="w-full mt-4 py-2 bg-gray-200 rounded-md text-[#6750A4]  "
        >
          Back to reports
        </Button>

        <div className="w-full flex flex-col gap-3 mb-6 mt-5">
          {reports.map((report) => (
            <Card
              key={report.id}
              className="p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <Calendar className="text-purple-500 w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">{report.title}</p>
                  <p className="text-xs text-gray-500">{report.date}</p>
                </div>
              </div>
              <ArrowRight className="text-gray-500 w-4 h-4" />
            </Card>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full flex items-center mt-5 text-[#6750A4]"
        >
          Logout <LogOut className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
