/**
 * TableBodyTd component
 *
 * @returns {JSX.Element}
 */
const TableBodyTd = ({ children, colSpan }) => {
  return (
    <td colSpan={colSpan ?? "1"} className="p-4 whitespace-nowrap text-base font-medium text-gray-900 space-x-2">
      {children}
    </td>
  );
};

export default TableBodyTd;
