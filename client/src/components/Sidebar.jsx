import clsx from "clsx";
import React, { useState } from "react";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import AddUser from "./AddUser";
import ChangePassword from "./ChangePassword";

const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Status",
    link: "status",
    icon: <IoCheckmarkDoneOutline />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const [openProfile, setOpenProfile] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        onClick={closeSidebar}
        to={el.link}
        className={clsx(
          "w-fult lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 dark:text-gray-400 text-base hover:bg-amber-500/20",
          path === el.link.split("/")[0] ? "bg-black text-white" : ""
        )}
      >
        {el.icon}
        <span className='hover:text-amber-500'>{el.label}</span>
      </Link>
    );
  };

  return (
    <>
      <div className='w-full h-full flex flex-col gap-6 p-5'>
        <h1 className='flex gap-2 items-center'>
          <img 
            src="https://customer-assets.emergentagent.com/job_gts-ask/artifacts/vkqzttw5_BRP_inc_logo.svg.png" 
            alt="GTS Ask Logo" 
            className="w-10 h-10 object-contain"
          />
          <span className='text-2xl font-bold text-black dark:text-white'>
            GTS <span className="text-amber-500">Ask</span>
          </span>
        </h1>

        <div className='flex-1 flex flex-col gap-y-5 py-8'>
          {sidebarLinks.map((link) => (
            <NavLink el={link} key={link.label} />
          ))}
        </div>

        <div className='relative'>
          <button 
            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
            className='w-full flex gap-2 p-2 items-center text-lg text-gray-800 dark:text-white hover:text-amber-500 transition-colors'
          >
            <MdSettings className={showSettingsMenu ? "animate-spin" : ""} />
            <span>Settings</span>
          </button>
          
          {showSettingsMenu && (
            <div className='absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-[#1f1f1f] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden'>
              <button
                onClick={() => {
                  setOpenProfile(true);
                  setShowSettingsMenu(false);
                }}
                className='w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-amber-500/20 transition-colors flex items-center gap-2'
              >
                <span>Edit Profile</span>
              </button>
              <button
                onClick={() => {
                  setOpenPassword(true);
                  setShowSettingsMenu(false);
                }}
                className='w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-amber-500/20 transition-colors flex items-center gap-2 border-t border-gray-100 dark:border-gray-700'
              >
                <span>Change Password</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <AddUser open={openProfile} setOpen={setOpenProfile} userData={user} />
      <ChangePassword open={openPassword} setOpen={setOpenPassword} />
    </>
  );
};

export default Sidebar;
