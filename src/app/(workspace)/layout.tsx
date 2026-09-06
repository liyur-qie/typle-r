import WorkspaceGate from '@/components/WorkspaceGate'
import SaveNotification from '@/components/SaveNotification'
export default function Layout({ children }: { children: React.ReactNode }) {
  return <WorkspaceGate><SaveNotification>{children}</SaveNotification></WorkspaceGate>
}
