import { useTitle } from "@/context/TitleContext";
import { getFrenchSlug } from "@/lib/slugUtils";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

/**
 * AuthHeading1 component
 *
 * @param {{ title: string; isModal: string; }} param0
 * @param {string} param0.title
 * @param {boolean} param0.isModal
 * @returns {JSX.Element}
 */
export default function ModalHeading({ isModal }) {
  const { title, parentPage } = useTitle();
  return (
    <>
      {isModal && (
        <>
          {parentPage && (
            <Link href={getFrenchSlug(parentPage.href)} className="text-gray-600 hover:text-gray-800 flex items-center gap-1">
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>{parentPage.title}</span>
            </Link>
          )}
          <div className="flex justify-center items-center pb-3 mb-3 border-b border-gray-300">
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          </div>
        </>
      )}
    </>
  );
}
