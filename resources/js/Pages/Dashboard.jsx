import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="mk-card-title">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mk-container">
          <div className="mk-card">
            <div className="p-6">
              <div className="text-sm" style={{ color: 'var(--mk-text)' }}>
                You're logged in!
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}