/**
 * GlobalMessage component
 *
 * @param {{ message: string; }} param0
 * @param {string} param0.message
 * @returns {JSX.Element}
 */
function GlobalMessage({ message }) {
  let color = "blue";
  if (message) {
    switch (message.type) {
      case "success":
        color = "green";
        break;
      case "error":
        color = "red";
        break;
    }
  }

  return (
    message && (
      <div className={`p-4 mb-4 text-sm text-${color}-800 rounded-lg bg-${color}-50`} role="alert">
        <span className="font-medium">{message.heading}</span> {message.text}
      </div>
    )
  );
}

export { GlobalMessage };
