import AdminLayout from "@/components/Layouts/AdminLayout";

/**
 * metadata
 *
 * @type {{ title: string; description: string; }\}
 */
export const metadata = {
  title: "Administration",
  description: "Administration",
};

/**
 * BackOfficeLayout
 *
 * @export
 * @param {{ children: JSX.Element; }} param0
 * @param {JSX.Element} param0.children
 * @returns {JSX.Element}
 */
export default function BackOfficeLayout({ children }) {
  return (
    <>
      <AdminLayout />
    </>
  );
}
