import dayjs from "dayjs";
import { Fragment, useMemo, useState } from "react";
import { EntitiesTypes } from "shared/types";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import Avatar from "@/app/components/Avatar";
import ConfirmModal from "./ConfirmModal";
import AvatarGroup from "@/app/components/AvatarGroup";
interface ProfileDrawerProps {
  conversation: EntitiesTypes["ConversationEntity"] & {
    users: EntitiesTypes["UserEntity"][];
  };
  icon: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}
const ProfileDrawer = ({
  onClose,
  isOpen,
  conversation,
}: ProfileDrawerProps) => {
  const [confirmopen, setConfirmopen] = useState(false);
  const joinedDate = useMemo(() => {
    return dayjs(conversation.createdAt).format("MMMM YYYY");
  }, [conversation.createdAt]);
  const title = useMemo(() => {
    return conversation.name || conversation.users?.[0]?.name;
  }, [conversation.name, conversation.users]);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return ` ${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation.isGroup, conversation.users.length]);

  return (
    <>
      <ConfirmModal isOpen={confirmopen} onClose={() => setConfirmopen(false)}>
        <div className="bg-white p-5">hello</div>
      </ConfirmModal>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>
          <div
            className="
        fixed
        inset-0
        overflow-hidden
      "
          >
            <div className="abslute inset-0 overflow-hidden">
              <div className=" pointer-events-none fixed inset-y-0 right-0 flex max-w-fill pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                    <div className="flex h-full flex-col overflow-y-scroll py-6 shadow-xl bg-white">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              onClick={onClose}
                              className="
                            rounded-md
                            bg-white
                            text-gray-400
                            hover:text-gray-500
                            focus:outline-none
                            focus:ring-2
                            focus:ring-sky-500
                            focus:ring-offset-2
                            "
                            >
                              <span className="sr-only">Close panel</span>
                              <IoClose size={24} />
                            </button>
                          </div>
                        </div>
                        <div className="relative mt-6 flex-1 px4 sm:px-6">
                          <div className="flex flex-col items-center">
                            <div className="mb-2">
                              {conversation.isGroup ? (
                                <AvatarGroup users={conversation.users} />
                              ) : (
                                <Avatar user={conversation.users[0]} />
                              )}
                            </div>
                            <div>{title}</div>
                            <div
                              className="
                          text-sm
                          text-gray-500
                          "
                            >
                              {statusText}
                            </div>
                            <div
                              className="
                            flex
                            gap-10
                            my-8
                          "
                            >
                              <div
                                onClick={() => setConfirmopen(true)}
                                className="
                                flex
                                flex-col
                                items-center
                                cursor-pointer
                                hover:opacity-75
                              "
                              >
                                <div
                                  className="
                                w-10
                                h-10
                                bg-neutral-100
                                rounded-full
                                flex
                                items-center
                                justify-center
                              "
                                >
                                  <IoTrash size={20} />
                                </div>
                                <div className="text-sm font-light text-neutral-600">
                                  Delete
                                </div>
                              </div>
                            </div>
                            <div
                              className="
                            w-full
                            pb-5
                            pt-5
                            sm:px-0
                            sm:pt-0
                          "
                            >
                              <dl
                                className="
                              space-y-8
                              px-4
                              sm:px-6
                              sm:space-y-6
                              "
                              >
                                {conversation.isGroup && (
                                  <div>
                                    <dt
                                      className="
                                    text-sm
                                    font-medium
                                    text-gray-500
                                    sm:w-40
                                    sm:flex-shrink-0
                                    "
                                    >
                                      Emails
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 flex flex-col">
                                      {conversation.users.map((user) => (
                                        <div
                                          key={user.email}
                                          className="flex items-center gap-4"
                                        >
                                          <Avatar user={user} />
                                          <a
                                            type="email"
                                            target="_blank"
                                            href={`mailto:${user.email}`}
                                          >
                                            {" "}
                                            {user.email}{" "}
                                          </a>
                                        </div>
                                      ))}
                                    </dd>
                                  </div>
                                )}
                                {!conversation.isGroup && (
                                  <div>
                                    <dt
                                      className="
                                      text-sm
                                      font-medium
                                      text-gray-500
                                      truncate
                                      sm:w-40
                                      sm:flex-shrink-0
                                    "
                                    >
                                      Email
                                    </dt>
                                    <dd
                                      className="
                                      mt-1
                                      text-sm
                                      text-gray-900
                                      sm:col-span-2
                                    "
                                    >
                                      {conversation.users[0].email}
                                    </dd>
                                  </div>
                                )}
                                {!conversation.isGroup && (
                                  <>
                                    <hr className="border-gray-200" />
                                    <div>
                                      <dt
                                        className="
                                      text-sm
                                      font-medium
                                      text-gray-500
                                      truncate
                                      sm:w-40
                                      sm:flex-shrink-0
                                      "
                                      >
                                        Joined
                                      </dt>
                                    </div>
                                    <dd
                                      className="
                                      mt-1
                                      text-sm
                                      text-gray-900
                                      sm:col-span-2
                                    "
                                    >
                                      <time dateTime={joinedDate}>
                                        {joinedDate}
                                      </time>
                                    </dd>
                                  </>
                                )}
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
