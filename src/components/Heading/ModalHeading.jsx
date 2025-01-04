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
        <div className={`flex py-3 border-b border-gray-300`}>
          <>
            {parentPage ? (
              <Link href={getFrenchSlug(parentPage.href)} className="w-1/5 ml-4 text-gray-600 hover:text-gray-800 flex items-center gap-1">
                <FontAwesomeIcon icon={faArrowLeft} />
                <span className="hidden sm:block">{parentPage.title}</span>
              </Link>
            ) : (
              <div className="w-1/5"></div>
            )}

            <div className="w-3/5 flex justify-center items-center">
              <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            </div>
          </>
        </div>
      )}
    </>
  );
}
