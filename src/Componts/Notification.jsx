import { fetchNotifications } from "@/Redux/Notification/fetchNotifications";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Notification = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.notifications);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.email) {
      dispatch(fetchNotifications(storedUser.email));
    }
  }, [dispatch]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="absolute right-0 mt-8 w-[360px] bg-[#ffffff] rounded-t-xl overflow-hidden z-50">
      <div className="p-4 space-y-6">
        {data.map((note, index) => (
          <div key={index} className="flex justify-between items-start ">
            <div className="flex items-start gap-2">
              <span className="text-[#673570] text-lg mt-1">•</span>
              <div>
                <p className="text-[#673570] font-semibold"> {note.subject} </p>
                <p className="text-sm text-[#6B7280]">{note.email_content}</p>
              </div>
            </div>
            <p className="text-xs text-[#6B7280]">{note.creation}</p>
          </div>
        ))}
      </div>

      {/* Curved Purple Bottom Edge */}
      <div className="w-full h-6 bg-gradient-to-r from-[#FCEEFF] to-[#EBCDFE] rounded-b-[50%]"></div>
    </div>
  );
};

export default Notification;
