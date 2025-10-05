import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword, auth, canLogin, canRegister }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <GuestLayout auth={auth} canLogin={canLogin} canRegister={canRegister}>
      <Head title="Iniciar sesión" />

      {status && (
        <div className="mb-4 text-sm" style={{ color: '#76c893' }}>
          {status}
        </div>
      )}

      <form onSubmit={submit} className="space-y-6">
        <div>
          <InputLabel htmlFor="email" value="Correo electrónico" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused
            onChange={(e) => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="password" value="Contraseña" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
            />
            <span className="ms-2 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Recordarme
            </span>
          </label>

          {canResetPassword && (
            <Link
              href={route('password.request')}
              className="mk-link-button text-sm"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          )}
        </div>

        <div className="flex items-center justify-end">
          <PrimaryButton className="ms-4" disabled={processing}>
            Iniciar sesión
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}