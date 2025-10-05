import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
  return (
    <AuthenticatedLayout
      header={<h2 className="mk-card-title">Profile</h2>}
    >
      <Head title="Profile" />

      <div className="py-12">
        <div className="mk-container space-y-6">
          <div className="mk-card">
            <div className="p-6 sm:p-8">
              <UpdateProfileInformationForm
                mustVerifyEmail={mustVerifyEmail}
                status={status}
                className="max-w-xl"
              />
            </div>
          </div>

          <div className="mk-card">
            <div className="p-6 sm:p-8">
              <UpdatePasswordForm className="max-w-xl" />
            </div>
          </div>

          <div className="mk-card">
            <div className="p-6 sm:p-8">
              <DeleteUserForm className="max-w-xl" />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
