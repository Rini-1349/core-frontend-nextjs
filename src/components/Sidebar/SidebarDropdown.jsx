import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isAuthorizedRoute, matchPathname } from "@/utils/routesHelper";
import { getEnglishSlug, getFrenchSlug } from "@/lib/slugUtils";

/**
 * SidebarDropdown component
 *
 * @param {{ item: {}; }} param0
 * @param {{}} param0.item
 * @returns {JSX.Element}
 */
const SidebarDropdown = ({ item, session }) => {
  const pathname = getEnglishSlug(usePathname());

  return (
    <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
      {session &&
        item
          .filter((item) => isAuthorizedRoute({ pathname: item.route }, session))
          .map((item, index) => {
            const isActive = matchPathname(pathname, item.isActiveRoutes);
            return (
              <li key={index}>
                <Link href={getFrenchSlug(item.route)} className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${isActive ? "text-white" : ""}`}>
                  {item.icon && <FontAwesomeIcon icon={item.icon} />}
                  {item.label}
                </Link>
              </li>
            );
          })}
    </ul>
  );
};

export default SidebarDropdown;
