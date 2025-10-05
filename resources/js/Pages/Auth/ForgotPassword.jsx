import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function ForgotPassword() {
  const { flash = {} } = usePage().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.email'), {
      onFinish: () => reset('email'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Olvidé mi contraseña" />

      <div className="mb-4 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
        ¿Olvidaste tu contraseña? No hay problema. Solo ingresá tu correo electrónico y te enviaremos un enlace para restablecerla.
      </div>

      {flash.status && (
        <div className="mb-4 text-sm font-medium" style={{ color: '#76c893' }}>
          {flash.status}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            isFocused
            onChange={(e) => setData('email', e.target.value)}
            placeholder="tu@correo.com"
            autoComplete="email"
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <PrimaryButton className="ms-4" disabled={processing}>
            Enviar enlace de restablecimiento
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
