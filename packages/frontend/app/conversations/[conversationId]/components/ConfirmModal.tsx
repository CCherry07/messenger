import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import { useCallback, useState } from "react";
import { client } from "@/utils/client";
import Modal from "@/app/components/Modal";
import { FiAlertTriangle } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { Dialog } from "@headlessui/react";
import Button from "@/app/components/Button";
import { useMutation } from "@tanstack/react-query";
import { deleteConversationById } from "@/apis/conversations";
interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ConfirmModal = ({ isOpen, onClose, children }: ConfirmModalProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { conversationId } = useConversation();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["deleteConversation", conversationId],
    mutationFn: () =>
      deleteConversationById(+conversationId, session!.user.accessToken),
    onSuccess: () => {
      onClose();
      router.push("/conversations");
    },
  });

  const onDeleting = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div
          className="
      mx-auto
      flex 
      h-12
      w-12
      flex-shrink-0
      items-center
      rounded-full
      bg-red-100
      sm:mx-0
      sm:h-10
      sm:w-10
      "
        >
          <FiAlertTriangle className="h-6 w-6 text-red-600 mx-auto" />
        </div>
        <div
          className="
      mt-3
      text-center
      sm:ml-4
      sm:mt-0
      sm:text-left
      "
        >
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-5 text-gray-900"
          >
            Delete Conversation
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this conversation?
              </p>
            </div>
          </Dialog.Title>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button variant="danger" disabled={isLoading} onClick={onDeleting}>
          Delete
        </Button>
        <Button
          variant="secondary"
          disabled={isLoading}
          onClick={onClose}
          className="mr-2"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
