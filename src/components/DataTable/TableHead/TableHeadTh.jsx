/**
 * TableHeadTh component
 *
 * @returns {JSX.Element}
 */
const TableHeadTh = ({ children, onClick, className }) => {
  return (
    <th onClick={onClick ? onClick : null} scope="col" className={className ? className : `p-4 text-left text-xs font-medium text-gray-500 uppercase`}>
      {children}
    </th>
  );
};

export default TableHeadTh;
