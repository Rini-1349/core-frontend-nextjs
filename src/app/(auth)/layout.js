export const metadata = {
  title: "Authentification",
  description: "Tout le processus d'authentification et de création de compte",
};

export default function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">{children}</div>
    </div>
  );
}
