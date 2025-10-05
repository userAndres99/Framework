import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm({});

  const submit = (e) => {
    e.preventDefault();
    post(route('verification.send'));
  };

  return (
    <GuestLayout>
      <Head title="Verificación de correo" />

      <div className="mb-4 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
        ¡Gracias por registrarte! Antes de continuar, verifica tu correo electrónico haciendo clic en el enlace que te enviamos. Si no lo recibiste, te enviaremos otro.
      </div>

      {status === 'verification-link-sent' && (
        <div className="mb-4 text-sm font-medium" style={{ color: '#76c893' }}>
          Se ha enviado un nuevo enlace de verificación al correo electrónico que proporcionaste durante el registro.
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <div className="flex items-center justify-between">
          <PrimaryButton disabled={processing}>
            Reenviar correo de verificación
          </PrimaryButton>

          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="mk-link-button text-sm"
          >
            Cerrar sesión
          </Link>
        </div>
      </form>
    </GuestLayout>
  );
}