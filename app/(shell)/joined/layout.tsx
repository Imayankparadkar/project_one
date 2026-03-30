import AppShellJoined from "@/components/layout/AppShellJoined";

export default function JoinedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShellJoined>{children}</AppShellJoined>;
}
