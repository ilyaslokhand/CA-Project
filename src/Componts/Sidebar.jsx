import { useEffect, useState } from "react";

import { FaBars, FaTimes } from "react-icons/fa"; // Import menu icons
import React from "react";
import { ArrowRight, Ghost, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "@/Redux/getReports/reportSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const user =
    useSelector((state) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user"));

  const {
    reports: apiData,
    loading,
    error,
  } = useSelector((state) => state.report);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchReports(user.email));
    }
  }, [dispatch, user?.email]);

  const formattedReports =
    apiData?.data?.map((item) => ({
      id: item.id,
      title: item.name,
    })) || [];

  return (
    <div className="relative ">
      {/* Menu Button */}
      <Button
        variant={Ghost}
        className="fixed top-5 left-5 z-50 p-2 bg-[#A855F7] text-white rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg p-5 transition-transform duration-300 w-[297px] z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="text-center">
          <img
            src={user?.user_image}
            alt="Profile"
            className="w-20 h-20 mx-auto rounded-full"
          />
          <h2 className="mt-2 text-lg font-semibold">{user?.email}</h2>
        </div>

        <Button
          variant={Ghost}
          className="w-full flex items-center justify-center bg-gray-200 mt-5 z-[1] font-roboto text-[15px] cursor-pointer font-bold  text-[#6750A4]"
          style={{ padding: "20px" }}
        >
          <span>Back To Reports</span>
        </Button>

        <div className="w-full flex flex-col gap-3 mb-6 mt-5">
          {loading ? (
            <p className="text-sm text-gray-500 text-center">
              Loading reports...
            </p>
          ) : error ? (
            <p className="text-sm text-red-500 text-center">Error: {error}</p>
          ) : formattedReports.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">
              No reports found.
            </p>
          ) : (
            formattedReports.map((report) => (
              <Card
                key={report.id}
                className="p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="text-purple-500 w-5 h-5" />
                  <div>
                    <p className="text-sm font-semibold text-[#141924]">
                      {report.title}
                    </p>
                  </div>
                </div>
                <ArrowRight className="text-[#000000] w-4 h-4" />
              </Card>
            ))
          )}
        </div>

        <Button
          variant={Ghost}
          className="w-full flex items-center justify-center bg-gray-200 mt-5 z-[1] font-roboto text-[15px] font-bold cursor-pointer  text-[#6750A4]"
          style={{ padding: "20px" }}
        >
          <span>Logout</span>
          <LogOut className="ml-2 w-4 h-4 text-[#6750A4]" />
        </Button>
      </div>
      {/* <h3>Annual Report 2024</h3> */}
    </div>
  );
};

export default Sidebar;
