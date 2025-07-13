import { AuthProvider } from "./context/auth.context";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
      <AuthProvider>
        <main className="auth-layout">
          {children}
          </main>
        </AuthProvider>
  );
}
