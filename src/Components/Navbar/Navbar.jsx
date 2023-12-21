import {  NavLink } from "react-router-dom";


const Navbar = () => {
    const navLinks = <>
        <li><NavLink className="font-semibold text-lg" to="/">Home</NavLink></li>

        <li><NavLink className="font-semibold text-lg" to="/edu">Dashboard</NavLink></li>
        <li><NavLink className="font-semibold text-lg" to="/my">Blog</NavLink></li>
        <li><NavLink className=" font-semibold text-lg" to="/about">About Us</NavLink></li>

    </>
  
    return (
        <div>
            <div className="navbar bg-slate-300 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="md:flex justify-center items-center">
                        
                        <a className="  normal-case text-2xl md:text-2xl font-bold text-rose-500 ml-5 "><i>TaskFlow</i></a>

                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                   
                <NavLink className="btn btn-success font-semibold text-lg" to="/hire">Login</NavLink>


                </div>

            </div>
           
        </div>
    );
};

export default Navbar;