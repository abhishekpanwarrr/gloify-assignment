import React, { useState } from "react";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ sideBar, setSideBar }) => {
  const [openUserTab, setOpenUserTab] = useState(true);

  const priorityData = [
    { id: "1", data: "High Proiority" },
    { id: "2", data: "Mid Proiority" },
    { id: "3", data: "Low Proiority" },
    { id: "4", data: "No Proiority" },
  ];
  return (
    <>
      <span
        className={` ${
          sideBar ? " left-[35%] md:left-[22%]" : "left-5"
        } fixed top-3  text-2xl flex justify-end z-50`}
      >
        {sideBar ? (
          <AiOutlineCloseCircle
            className="text-white"
            onClick={() => setSideBar((open) => !open)}
          />
        ) : (
          <GiHamburgerMenu
            className="text-black"
            onClick={() => setSideBar((open) => !open)}
          />
        )}
      </span>
      <nav
        className={`${
          sideBar ? "visible w-[42%] sm:w-[25%]" : "hidden w-0"
        }  bg-slate-600 fixed px-2 sm:px-5 min-h-screen top-0 z-20`}
      >
        <div className="w-full h-28 flex items-center border-b-2 border-gray-500">
          <p className="uppercase text-orange-600 text-sm sm:font-extrabold tracking-widest sm:text-xl">
            Task Manager
          </p>
        </div>
        <div
          className="sm:font-bold text-white text-sm sm:text-xl tracking-widest pt-5  flex items-center cursor-pointer justify-between mb-1  border-b-2 border-gray-500 pb-5"
          onClick={() => setOpenUserTab((open) => !open)}
        >
          <span className="mr-1">Priority Colors</span>
          {openUserTab ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
        </div>
        {openUserTab && (
          <ul className="mt-5">
            {priorityData &&
              priorityData.map((item) => (
                <li
                  className={`${
                    item.id === "1"
                      ? "bg-red-300"
                      : item.id === "2"
                      ? "bg-green-300"
                      : item.id === "3"
                      ? "bg-blue-200"
                      : "bg-yellow-300"
                  } text-black cursor-pointer sm:font-semibold h-10 text-center py-2 list-none`}
                  key={item.id}
                >
                  {item.data}
                </li>
              ))}
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;
