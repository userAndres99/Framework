import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';

export default function Modal({
  children,
  show = false,
  maxWidth = '2xl',
  closeable = true,
  onClose = () => {},
}) {
  const close = () => {
    if (closeable) onClose();
  };

  const maxWidthClass = {
    sm: 'mk-max-w-sm',
    md: 'mk-max-w-md',
    lg: 'mk-max-w-lg',
    xl: 'mk-max-w-xl',
    '2xl': 'mk-max-w-2xl',
  }[maxWidth];

  return (
    <Transition show={show} leave="duration-200">
      <Dialog
        as="div"
        id="modal"
        className="fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0"
        onClose={close}
      >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 mk-modal-backdrop" />
        </TransitionChild>

        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <DialogPanel
            className={`mb-6 transform overflow-hidden rounded-lg mk-modal-panel transition-all sm:mx-auto sm:w-full ${maxWidthClass}`}
          >
            {children}
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
