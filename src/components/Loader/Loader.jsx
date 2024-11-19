export function Loader({ visible }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="loader"></div>
    </div>
  );
}
