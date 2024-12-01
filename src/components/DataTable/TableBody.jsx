import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId } from "react";

/**
 * TableBody component
 *
 * @returns {JSX.Element}
 */
const TableBody = ({ items, columns, isLoading }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {isLoading ? (
        <tr key={useId()} className="hover:bg-gray-100">
          <td colSpan={columns.length} className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
            Chargement...
          </td>
        </tr>
      ) : items.length > 0 ? (
        items.map((row) => (
          <tr key={row.id} className="hover:bg-gray-100">
            {columns.map((col) => (
              <td key={col.key} className="p-4 whitespace-nowrap text-base font-medium text-gray-900 space-x-2">
                {col.boolean
                  ? row[col.key]
                    ? col.boolean.true
                    : col.boolean.false
                  : col.actions
                  ? col.actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => (window.location.href = action.href)}
                        data-modal-toggle="user-modal"
                        className={`font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center
                      ${action.color ? `text-${action.color}` : "text-white"} 
                      ${action.bgColor ? `bg-${action.bgColor}-600 hover:bg-${action.bgColor}-700 focus:ring-${action.bgColor}-200` : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-200"}`}
                      >
                        {action.icon && <FontAwesomeIcon icon={action.icon} className="mr-1" />}
                        {action.label}
                      </button>
                    ))
                  : row[col.key]}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr key={useId()} className="hover:bg-gray-100">
          <td colSpan={columns.length} className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
            Aucun résultat trouvé
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
