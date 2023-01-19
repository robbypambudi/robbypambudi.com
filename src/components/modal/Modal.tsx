import { Dialog, Transition } from '@headlessui/react';
import * as React from 'react';
import { FiX } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';
import { ExtractProps } from '@/types/helper';

type ModalProps = {
  className?: string;
  children: React.ReactNode;
  /** Use sm:max-w-xx to adjust max-width */
  modalContainerClassName?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & Omit<ExtractProps<typeof Dialog>, 'onClose'>;

export function ModalRoot({
  className,
  children,
  modalContainerClassName,
  open,
  setOpen,
  ...rest
}: ModalProps) {
  // Set initial focus to the container div instead of automatically focused to the close button
  const containerRef = React.createRef<HTMLDivElement>();

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as='div'
        className={clsxm('fixed inset-0 z-50 overflow-y-auto ', className)}
        {...rest}
        onClose={setOpen}
        initialFocus={containerRef}
      >
        <div
          className='flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0'
          ref={containerRef}
        >
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-30 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:h-screen sm:align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div
              className={clsxm(
                'inline-block transform rounded-xl bg-primary-900 text-left shadow-xl transition-all sm:align-middle my-6',
                'w-full max-w-md sm:max-w-xl border border-primary-700',
                modalContainerClassName
              )}
            >
              <div className='absolute top-4 right-4 z-10'>
                <button
                  type='button'
                  className='focus:ring-primary-100 rounded-md bg-transparent text-danger-500 hover:text-danger-900 focus:outline-none focus:ring-2 focus:ring-offset-2'
                  onClick={() => setOpen(false)}
                >
                  <span className='sr-only'>Close</span>
                  <FiX className='h-6 w-6' aria-hidden='true' />
                </button>
              </div>
              <div className=''>{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function Title({ className, ...rest }: ExtractProps<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      as='h1'
      className={clsxm(
        'text-xl font-semibold leading-6 text-primary-700 md:text-2xl',
        'px-4 pt-2 ',
        className
      )}
      {...rest}
    />
  );
}

function Body({ className, children }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={clsxm('flex w-full flex-col', className)}>
      <div className='px-4 my-4'>
        <div className='inline-block min-w-full align-middle '>{children}</div>
      </div>
    </div>
  );
}

const Modal = Object.assign(ModalRoot, { Title, Body });
export default Modal;
