import {
  Blocks,
  ChevronLeft,
  ChevronRight,
  Container,
  Folder,
  FolderGit2,
  HatGlasses,
  LayoutDashboard,
  Menu,
  NotepadTextDashed,
  Shield,
  Workflow,
} from "lucide-react";
import { useEffect, useState } from "react";

import logo from "../../assets/logo.png";
import {useLocation, useNavigate} from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = [
    { id: 1, name: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
    { id: 2, name: "Projects", icon: <Folder />, path: "/projects" },
    {
      id: 3,
      name: "Pipelines",
      icon: <NotepadTextDashed />,
      path: "/pipelines",
    },
    { id: 4, name: "Repos", icon: <FolderGit2 />, path: "/repos" },
    { id: 5, name: "Environments", icon: <Container />, path: "/environments" },
    { id: 6, name: "Agents", icon: <HatGlasses />, path: "/agents" },
    { id: 7, name: "Automations", icon: <Workflow />, path: "/automations" },
    { id: 8, name: "Security", icon: <Shield />, path: "/security" },
    { id: 9, name: "Extensions", icon: <Blocks />, path: "/extensions" },
  ];

  const location = useLocation()
  const [activeItem, setActiveItem] = useState(() => {
    const currentItem = items.find(item => item.path === location.pathname)
      return currentItem?.id || items[0].id;
  });

  const navigate = useNavigate()
  const handleItemClick = (id: number) => {
    setActiveItem(id);
    if (isMobile) setIsOpen(false);
    navigate(items[id - 1].path)
  };
  /*branch test*/
  return (
    <div>
      <button
        aria-label="Toggle Sidebar"
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <Menu size={18} /> : <Menu size={18} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full bg-black shadow-xl transition-all duration-300 ease-in-out z-40 ${
          isOpen
            ? "w-64 translate-x-0"
            : "w-64 -translate-x-full md:w-20 md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header + Icon */}
          <div className={`p-3 ${isOpen ? "pl-0" : "pl-2"}`}>
            <div className={`flex items-center justify-center`}>
              <img
                src={logo}
                alt="Logo"
                className={`${isOpen ? "h-14" : "h-12"} w-auto`}
              />
              {isOpen ? (
                <h1 className="text-white font-bold text-2xl">
                  DevHub <span className="font-semibold italic">Core</span>
                </h1>
              ) : null}
            </div>
          </div>

          {/* Open/Close Sidebar Button */}
          <button
            aria-label="Toggle Sidebar"
            className="hidden md:flex absolute -right-3 top-20 bg-black rounded-full p-1.5 border border-white  cursor-pointer shadow-lg z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <ChevronLeft size={18} color="white" />
            ) : (
              <ChevronRight size={18} color="white" />
            )}
          </button>

          {/* Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-3">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`${
                      isOpen ? "w-full" : "w-12"
                    } flex items-center px-3 py-2 rounded-lg transition-all duration-200 hover:cursor-pointer hover:scale-103 ${
                      activeItem === item.id
                        ? `text-[#739dbe] bg-[#12151c]`
                        : "text-white hover:bg-[#12151c] hover:text-[#739dbe]"
                    }`}
                    aria-current={activeItem === item.id ? "page" : undefined}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className={`ml-3 ${!isOpen && "md:hidden"}`}>
                      {item.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
