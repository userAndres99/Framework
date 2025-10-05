import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function ConfirmPassword() {
  const { flash = {} } = usePage().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.confirm'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Confirmar Contraseña" />

      <div className="mb-4 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
        Esta es un área segura de la aplicación. Por favor, confirma tu contraseña antes de continuar.
      </div>

      {flash.status && (
        <div className="mb-4 text-sm font-medium" style={{ color: '#76c893' }}>
          {flash.status}
        </div>
      )}
      {flash.error && (
        <div className="mb-4 text-sm font-medium" style={{ color: '#ff6b6b' }}>
          {flash.error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-6">
        <div>
          <InputLabel htmlFor="password" value="Contraseña" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            isFocused
            onChange={(e) => setData('password', e.target.value)}
            autoComplete="current-password"
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="flex items-center justify-end">
          <PrimaryButton className="ms-4" disabled={processing}>
            Confirmar
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
