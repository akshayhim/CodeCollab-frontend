import { Link } from "react-router-dom";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import { Navigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const content = (
    <div className="md:hidden absolute top-16 w-full left-0 right-0 bg-white transition z-50">
      <ul className="text-center text-[17px] font-sans font-medium" onClick={handleClick}>
        <Link to="/about" unstable_viewTransition>
          <li className="my-2 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
            About
          </li>
        </Link>
        {user ? (
          <Link
            onClick={() => {
              dispatch(logout());
              <Navigate to="/" />;
              logoutToast();
            }}
            className="unstable-viewTransition"
          >
            <li className="my-2 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
              Log Out
            </li>
          </Link>
        ) : (
          <Link to="/login" unstable_viewTransition>
            <li className="my-2 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
              Login/Register
            </li>
          </Link>
        )}
      </ul>
    </div>
  );

  const logoutToast = () => {
    toast.success("Successfully Logged Out");
  };

  return (
    <nav>
      <div className="border-solid border-stone-900 border-b-2 h-10vh flex justify-between z-50 text-black lg:py-5 px-5 py-4 relative">
        <div className="flex items-center flex-1 mb-2">
          <Link to="/" unstable_viewTransition>
            <img src="/logo-no-background.svg" alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="lg:flex md:flex lg: flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 mr-16 text-[20px] font-sans font-medium">
              <Link to="/about" className="unstable-viewTransition">
                <li className="hover:text-[#e8504e] transition hover:border-b-2 border-red rounded-sm border-slate-900 hover:border-[#e8504e] cursor-pointer">
                  ABOUT
                </li>
              </Link>
              {user ? (
                <Link
                  onClick={() => {
                    dispatch(logout());
                    <Navigate to="/" />;
                    logoutToast();
                  }}
                  className="unstable-viewTransition"
                >
                  <li className="hover:text-[#e8504e] transition hover:border-b-2 border-red rounded-sm border-slate-900 hover:border-[#e8504e] cursor-pointer">
                    LOG OUT
                  </li>
                </Link>
              ) : (
                <Link to="/login" className="unstable-viewTransition">
                  <li className="hover:text-[#e8504e] transition hover:border-b-2 border-red rounded-sm border-slate-900 hover:border-[#e8504e] cursor-pointer">
                    LOGIN/REGISTER
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </div>
        <div>{click && content}</div>
        <button className="block md:hidden translation" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
        <Toaster />
      </div>
    </nav>
  );
};

export default Navbar;
