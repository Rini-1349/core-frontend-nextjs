/**
 * AuthHeading1 component
 *
 * @param {{ title: string; isModal: string; }} param0
 * @param {string} param0.title
 * @param {boolean} param0.isModal
 * @returns {JSX.Element}
 */
export default function ModalHeading({ title, isModal }) {
  return (
    <>
      {isModal && (
        <div className="flex justify-center items-center pb-3 mb-3 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
      )}
    </>
  );
}
