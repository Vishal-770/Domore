import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import AppSideBar from "./_components/AppSideBar";
import AppNavBar from "./_components/AppNavBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSideBar />

        <main className="w-full">
          <AppNavBar />
          <div className="px-4"> {children}</div>
        </main>
      </SidebarProvider>
    </>
  );
}
