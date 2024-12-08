import { DefaultButton } from "../Button/DefaultButton";

/**
 * ContentPageHeader component
 *
 * @returns {JSX.Element}
 */
const ContentPageHeader = ({ action, onLinkClick }) => {
  if (!action.href) return;

  return (
    <div className="flex">
      <DefaultButton
        type="button"
        title="Ajouter utilisateur"
        onClick={() => {
          onLinkClick(action.href, action);
        }}
        btnStyle="success"
        widthClass=""
        className="ml-auto"
      />
    </div>
  );
};

export default ContentPageHeader;
