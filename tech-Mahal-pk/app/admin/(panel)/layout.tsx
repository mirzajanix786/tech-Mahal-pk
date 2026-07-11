import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-onyx-950 sm:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-5 sm:p-8">{children}</main>
    </div>
  );
}
