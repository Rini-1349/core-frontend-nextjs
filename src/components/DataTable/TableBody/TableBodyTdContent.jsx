import { replaceMultiplePatternsWithItemField } from "@/utils/miscellaneousFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * TableBodyTdContent component
 *
 * @returns {JSX.Element}
 */
const TableBodyTdContent = ({ col, item, onDeleteClick, onLinkClick }) => {
  let content = "";

  if (col.boolean) {
    if (item[col.key]) {
      content = col.boolean.true;
    } else {
      content = col.boolean.false;
    }
  } else if (col.actions) {
    content = col.actions.map((action, index) => {
      const colorClassName = action.color ? `text-${action.color}` : "text-white";
      const bgColorClassName = action.bgColor ? `bg-${action.bgColor}-600 hover:bg-${action.bgColor}-700 focus:ring-${action.bgColor}-200` : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-200";

      return (
        <button
          key={index}
          onClick={() => {
            if (action.key === "delete") {
              onDeleteClick(item, replaceMultiplePatternsWithItemField(action.itemDescription, action.replacePatterns, item));
            } else if (action.href) {
              onLinkClick(replaceMultiplePatternsWithItemField(action.href, action.replacePatterns, item), action);
            }
          }}
          className={`font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center ${colorClassName} ${bgColorClassName}`}
        >
          {action.icon && <FontAwesomeIcon icon={action.icon} className="mr-1" />}
          {action.label}
        </button>
      );
    });
  } else {
    content = item[col.key];
  }

  return <>{content}</>;
};

export default TableBodyTdContent;
