import Link from "next/link";
import DropdownUser from "./DropdownUser";
import { useTitle } from "@/context/TitleContext";
import { getFrenchSlug } from "@/lib/slugUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

/**
 * Header component
 *
 * @param {{}} props
 * @returns {JSX.Element}
 */
const Header = (props) => {
  const { title, parentPage } = useTitle();

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 top-backoffice">
      <div className="flex w-full items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle Button */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out ${!props.sidebarOpen && "!w-full delay-300"}`}></span>
                <span className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out ${!props.sidebarOpen && "delay-400 !w-full"}`}></span>
                <span className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out ${!props.sidebarOpen && "!w-full delay-500"}`}></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out ${!props.sidebarOpen && "!h-0 !delay-[0]"}`}></span>
                <span className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out ${!props.sidebarOpen && "!h-0 !delay-200"}`}></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link href="/" className="block mr-6 flex-shrink-0 lg:hidden">
            {/* <Image width={32} height={32} src={"/images/logo/logo-icon.svg"} alt="Logo" /> */}
            <svg className="fill-current" width="22" height="22" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path d="M32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l576 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zm0 384c-17.7 0-32 14.3-32 32s14.3 32 32 32l576 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 416zM7 167c-9.4 9.4-9.4 24.6 0 33.9l55 55L7 311c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55L41 167c-9.4-9.4-24.6-9.4-33.9 0zM265 167c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55zM455 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z" />
            </svg>
          </Link>
        </div>
        {parentPage && (
          <Link href={getFrenchSlug(parentPage.href)} className="text-gray-600 hover:text-gray-800 flex items-center gap-1">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>{parentPage.title}</span>
          </Link>
        )}

        {/* Center Section: Title */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-xl font-bold text-center text-gray-800">{title}</h1>
        </div>

        {/* Right Section */}
        <div className="flex ml-auto items-center gap-3 2xsm:gap-7">
          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
