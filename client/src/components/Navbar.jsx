import { useState } from "react";
import { Link, useLocation } from "react-router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="px-3 py-2 text-sm font-medium text-white"
                  aria-current="page"
                >
                  Dow Postgraduate
                </Link>

                <Link
                  to="/home"
                  className={
                    location.pathname == `/home`
                      ? "bg-gray-700 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                >
                  Home
                </Link>

                <Link
                  to="/current-fcps"
                  className={
                    location.pathname == `/current-fcps`
                      ? "bg-gray-700 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                >
                  Current FCPS
                </Link>

                <Link
                  to="/add-depart"
                  className={
                    location.pathname == `/add-depart`
                      ? "bg-gray-700 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                >
                  Department
                </Link>

                <Link
                  to="/supervisor"
                  className={
                    location.pathname == `/supervisor`
                      ? "bg-gray-700 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                >
                  Supervisor
                </Link>

                {/* <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
            <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a> */}
                {/* start */}
                <div className="relative inline-block text-left">
                  {/* Green-colored text above the dropdown */}

                  <div>
                    <button
                      onClick={toggleDropdown}
                      className="inline-flex justify-center w-full rounded-md 
                     shadow-sm px-4 py-2 hover:cursor-pointer
                    text-sm font-medium text-gray-100 
                    focus:outline-none"
                    >
                      Reports
                      <svg
                        className="ml-2 -mr-1 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  {isOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-56 
                    rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
                    focus:outline-none"
                      role="menu"
                    >
                      <div className="py-1" role="none">
                        <Link
                          to="/current_supervisor"
                          className="block px-4 py-2 text-sm text-gray-700 
                            hover:bg-gray-100"
                          role="menuitem"
                        >
                          01 - Current Supervisor Report
                        </Link>
                        <Link
                          to={"/fcps_report"}
                          className="block px-4 py-2 text-sm text-gray-700
                            hover:bg-gray-100"
                          role="menuitem"
                        >
                          02 - Current FCPS Report
                        </Link>
                        <Link
                          to={"/yearly_report"}
                          className="block px-4 py-2 text-sm text-gray-700
                            hover:bg-gray-100"
                          role="menuitem"
                        >
                          03 - Year Wise Induction
                        </Link>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700
                            hover:bg-gray-100"
                          role="menuitem"
                        >
                          License
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                {/* end */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
