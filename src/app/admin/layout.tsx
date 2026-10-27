import { AdminNav } from "@/components/admin/AdminNav";
import { LogoutIcon } from "@/components/icons";
import { hasAdminSession } from "@/lib/adminSession";

export const metadata = { title: "관리자", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Only decides whether the nav shows (the login page shares this layout); each data page calls requireAdmin().
  const authed = await hasAdminSession();

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      {authed ? (
        <div className="mb-8 flex items-center justify-between gap-3 border-b border-border pb-3">
          <AdminNav />
          <form action="/api/admin/logout" method="post" className="shrink-0">
            <button type="submit" className="btn btn-sm">
              <LogoutIcon />
              로그아웃
            </button>
          </form>
        </div>
      ) : null}
      {children}
    </div>
  );
}
