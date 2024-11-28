import { ConfirmationMessage } from "./ConfirmationMessage";
import { ErrorMessage } from "./ErrorMessage";

/**
 * GlobalMessage component
 *
 * @param {{ message: string; }} param0
 * @param {string} param0.message
 * @returns {JSX.Element}
 */
function GlobalMessage({ message }) {
  if (message) {
    if (message.type === "success") {
      return <ConfirmationMessage text={message.text} />;
    } else if (message.type === "error") {
      return <ErrorMessage text={message.text} />;
    }
  }
}

export { GlobalMessage };
