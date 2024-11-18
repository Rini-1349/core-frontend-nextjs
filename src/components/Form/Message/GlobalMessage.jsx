import { ConfirmationMessage } from "./ConfirmationMessage";
import { ErrorMessage } from "./ErrorMessage";

function GlobalMessage({ message }) {
  console.log(message);
  if (message) {
    if (message.type === "success") {
      return <ConfirmationMessage text={message.text} />;
    } else if (message.type === "error") {
      return <ErrorMessage text={message.text} />;
    }
  }
}

export { GlobalMessage };
