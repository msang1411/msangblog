import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import AdminService from "../../services/admin.service";

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [logging, setLogging] = useState(true);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleClickDropMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleLogout = async () => {
    await AdminService.logout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    if (!isOpenMenu) return;

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenMenu]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) setLogging(false);
  }, []);

  return (
    <>
      <nav className=" py-2 bg-black text-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex justify-start">
              <button ref={menuButtonRef} onClick={handleClickDropMenu}>
                <Menu size={24} className="md:hidden ml-4" />
              </button>
              <img src="/vite.svg" className="mx-4" />
              <a className="text-2xl ml-4 mr-10">MSANG BLOG</a>
              <ul className="hidden md:flex justify-start items-center gap-x-6 text-lg">
                <li>
                  <a href="/">Blog</a>
                </li>
                <li>
                  <a href="/">Category</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
              </ul>
            </div>
            {logging && (
              <button
                className="mr-4 text-red-500"
                title="Logout"
                onClick={handleLogout}
              >
                <LogOut size={24} />
              </button>
            )}
          </div>
        </div>
        {isOpenMenu && (
          <ul
            ref={menuRef}
            className="absolute left-0 top-12 w-auto px-16 py-2 bg-gray-800 text-white 
            flex flex-col justify-start items-center gap-x-6 gap-y-2 text-lg"
          >
            <li>
              <a href="/">Blog</a>
            </li>
            <li>
              <a href="/">Category</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;
