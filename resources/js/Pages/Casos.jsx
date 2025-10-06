import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import FormCasos from '@/Components/FormCasos';

export default function Casos() {
  return (
    <AuthenticatedLayout>
      <Head title="Publicar caso" />
      <div className="mk-container" style={{ padding: 20 }}>
        <FormCasos />
      </div>
    </AuthenticatedLayout>
  );
}