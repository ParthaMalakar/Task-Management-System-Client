import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaMarkdown, FaSearch, FaShoppingCart, FaStreetView, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

import { MdOutlineClearAll } from "react-icons/md";
import { TbPlaystationSquare } from "react-icons/tb";

const Dashboard = () => {


    return (
        <div>
            {/* <Navbar></Navbar> */}
            <div className="flex">
                {/* dashboard side bar */}
                <div className="md:w-64 md:min-h-screen bg-amber-300">
                    <ul className="menu p-4">
                        {
                           
                            <>
                                <li>
                                    <NavLink className=" text-lg" to="/dashboard/adminHome">
                                        <FaHome></FaHome>
                                        Admin Home</NavLink>
                                </li>
                                <li>
                                    <NavLink className=" text-lg" to="/dashboard/allparcel">
                                       <MdOutlineClearAll></MdOutlineClearAll>
                                        All Parcels</NavLink>
                                </li>
                                <li>
                                    <NavLink className=" text-lg" to="/dashboard/alluser">
                                    <FaUsers></FaUsers>
                                        All Users</NavLink>
                                </li>
                                <li>
                                    <NavLink className="text-lg" to="/dashboard/alldelavery">
                                    <FaUsers></FaUsers>
                                        All Delivery Men</NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                     className=" text-lg" to="/dashboard/statistics">
                                        <TbPlaystationSquare></TbPlaystationSquare>
                                        Statistics</NavLink>
                                </li>
                            </>

                        }
                       
                        
                        {/* shared nav links */}
                        <div className="divider"></div>
                        <li>
                            <NavLink to="/">
                                <FaHome></FaHome>
                                Home</NavLink>
                        </li>
                       
                    </ul>
                </div>
                {/* dashboard content */}
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </div>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Dashboard;