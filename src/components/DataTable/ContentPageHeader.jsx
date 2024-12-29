import { getFrenchSlug } from "@/lib/slugUtils";
import { DefaultButton } from "../Button/DefaultButton";
import { isAuthorizedRoute } from "@/utils/routesHelper";

/**
 * ContentPageHeader component
 *
 * @returns {JSX.Element}
 */
const ContentPageHeader = ({ action, onLinkClick, session }) => {
  if (!action.href) return;
  if (!session) return;
  if (!isAuthorizedRoute({ pathname: action.href }, session)) return;

  return (
    <div className="flex">
      <DefaultButton
        type="button"
        title={action.label}
        onClick={() => {
          onLinkClick(getFrenchSlug(action.href), action);
        }}
        btnStyle="success"
        widthClass=""
        className="ml-auto"
      />
    </div>
  );
};

export default ContentPageHeader;
