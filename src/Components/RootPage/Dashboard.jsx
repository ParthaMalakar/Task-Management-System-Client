import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaMarkdown, FaSearch, FaShoppingCart, FaStreetView, FaUsers, FaUtensils } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";

import { MdOutlineClearAll } from "react-icons/md";
import { TbPlaystationSquare } from "react-icons/tb";
import { useContext } from "react";
import { AuthContext } from "../../provider/Authprovider";

const Dashboard = () => {

    const { user } = useContext(AuthContext);

    return (
        <div>
            {/* <Navbar></Navbar> */}
            <div className="flex">
                {/* dashboard side bar */}
                <div className="md:w-64 md:min-h-screen bg-amber-300">
                    <ul className="menu p-4">
                    {
                        user ? <div className=" md:flex items-center w-[250px] ">
                            <div className="dropdown">
                                <label tabIndex={0} className="btn btn-ghost btn-circle w-[200px]">
                                <img  className="ml-40 md:ml-0 h-[120px]   " src={user.photoURL} alt="" />
                                </label>
                               
                            </div>

                        </div>

                            :
                            <Link to="/login" className="py-2 px-6 rounded-lg  bg-slate-600 text-white text-lg font-semibold mr-10">Login</Link>
                    }
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