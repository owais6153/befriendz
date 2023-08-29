import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useRef } from "react";
import Button from "views/components/shared/form-elements/button";

export default function Modal({
  open = false,
  size = "sm",
  titleCenter = false,
  setOpen = () => {},
  title = null,
  subTitle = null,
  isScroll = true,
  children,
}) {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#000000] bg-opacity-[10%] backdrop-blur-[2px] transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex  items-end justify-center p-4 text-center sm:items-center sm:p-0 m-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative transform overflow-hidden ${
                  isScroll && "max-h-[90vh]"
                } rounded-3xl bg-white  pb-4 pt-5 text-left transition-all sm:my-8 sm:w-full   
                ${size === "xs" && "sm:max-w-md"}
                ${size === "sm" && "sm:max-w-lg"}
                ${size === "md" && "sm:max-w-4xl"}
                ${size === "lg" && "sm:max-w-6xl"}
                `}
              >
                <div className="sm:flex sm:items-start w-full">
                  <div className="mt-3 w-full">
                    <Dialog.Title className="leading-6">
                      <>
                        <div
                          className={`px-8 ${
                            titleCenter && "text-center"
                          }  relative`}
                        >
                          <div>
                            <div>
                              <span className="font-openSans_bold text-[#2A2A2A] lg:text-[40px] md:text-[39px] sm:text-[38px] text-[37px]">
                                {title}
                              </span>
                            </div>
                            <div>
                              <span className="font-openSans_regular text-[#949494] lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px]">
                                {subTitle}
                              </span>
                            </div>
                          </div>
                          <div className="absolute right-5 sm:top-0 -top-8">
                            <button
                              type="button"
                              className="bg-transparent  focus:outline-none text-[#949494] border-2 rounded-full border-[#949494]"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close</span>
                              <XMarkIcon
                                className="lg:h-6 lg:w-6 md:h-5 md:w-5 sm:h-5 sm:w-5 h-4 w-4"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </>
                    </Dialog.Title>
                  </div>
                </div>
                <div>
                  <div>{children}</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
