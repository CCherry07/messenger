"use client";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ClipLoader } from "react-spinners";
interface LoadingModalProps {
  loading: boolean;
  onClose?: () => void;
}

const LoadingModal = ({ loading, onClose }: LoadingModalProps) => {
  return (
    <Transition.Root show={loading} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose ? onClose : () => ({})}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opecity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex inset-0 bg-gray-100 bg-opacity-50 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-100 bg-opacity-50 transition-opacity">
          <div
            className="
      flex
      min-h-full
      items-center
      justify-center
      p-4
      "
          >
            <Dialog.Panel>
              <ClipLoader color="#0284c7" size={40} />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoadingModal;
