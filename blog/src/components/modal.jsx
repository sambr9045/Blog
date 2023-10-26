import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({ open, setOpen }) {
  const cancelButtonRef = useRef(null);

  const CloseButton = {
    position: "absolute",
    top: "0",
    right: "0",
    border: "1px solid lightgray",
    marginRight: "10px",
    borderRadius: "285px",
    marginTop: "8px",
    padding: "3px 12px",
    cursor: "pointer",
  };
  return (
    <Transition.Root
      show={open}
      as={Fragment}
      // onClick={() => setOpen(true)}
      // ref={cancelButtonRef}
      onClose={() => setOpen(true)}
    >
      <Dialog
        as="div"
        className="relative z-10"
        // initialFocus={cancelButtonRef}
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex lg:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      style={CloseButton}
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      x
                    </div>
                    <div
                      className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"
                      style={{ width: "100%" }}
                    >
                      <form className="p-10" method="get" action="/search">
                        <label
                          htmlFor="default-search"
                          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                          Search
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                              />
                            </svg>
                          </div>
                          <input
                            type="search"
                            id="default-search"
                            name="q"
                            className="block w-100 p-4 pl-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                            placeholder="Search article "
                            required
                            style={{ width: "100%", color: "black" }}
                            // onChange={handleInputChange}
                          />
                          <button
                            type="submit"
                            className="text-white absolute right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            // onClick={performSearch}
                          >
                            Search
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
