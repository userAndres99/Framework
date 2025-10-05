import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm({
    password: '',
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser = (e) => {
    e.preventDefault();

    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    clearErrors();
    reset();
  };

  return (
    <section className={`space-y-6 ${className}`}>
      <header>
        <h2 className="mk-card-title">Eliminar cuenta</h2>

        <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
          Una vez eliminada tu cuenta, todos sus recursos y datos se eliminarán de forma permanente. Antes de eliminar tu cuenta, descarga cualquier dato que desees conservar.
        </p>
      </header>

      <DangerButton onClick={confirmUserDeletion}>Eliminar cuenta</DangerButton>

      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <form onSubmit={deleteUser} className="p-6">
          <h2 className="mk-card-title">¿Estás seguro de que quieres eliminar tu cuenta?</h2>

          <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Ingresa tu contraseña para confirmar que deseas eliminar tu cuenta de forma permanente.
          </p>

          <div className="mt-6">
            <InputLabel htmlFor="password" value="Contraseña" className="mk-hidden-visually" />

            <TextInput
              id="password"
              type="password"
              name="password"
              ref={passwordInput}
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="mt-1 block w-full"
              isFocused
              placeholder="Contraseña"
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>

            <DangerButton className="ms-3" disabled={processing}>Eliminar cuenta</DangerButton>
          </div>
        </form>
      </Modal>
    </section>
  );
}
