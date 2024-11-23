import AdminLayout from "@/components/Layouts/AdminLayout";

export const metadata = {
  title: "Administration",
  description: "Administration",
};

export default function BackOfficeLayout({ children }) {
  return (
    <>
      <AdminLayout />
    </>
  );
}
