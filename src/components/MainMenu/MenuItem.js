import { Fragment, useRef, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { isEmpty } from "../../utils/objectUtils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MenuItem({
  menuTitle,
  linksArray,
  showChevron = true,
}) {
  let timeout; // NodeJS.Timeout
  const timeoutDuration = 0;

  const buttonRef = useRef(null);
  const [openState, setOpenState] = useState(false);

  const toggleMenu = (open) => {
    // log the current open state in React (toggle open state)
    setOpenState((openState) => !openState);
    // toggle the menu by clicking on buttonRef
    buttonRef?.current?.click(); // eslint-disable-line
  };

  // Open the menu after a delay of timeoutDuration
  const onHover = (open, action) => {
    // if the modal is currently closed, we need to open it
    // OR
    // if the modal is currently open, we need to close it
    if (
      (!open && !openState && action === "onMouseEnter") ||
      (open && openState && action === "onMouseLeave")
    ) {
      // clear the old timeout, if any
      clearTimeout(timeout);
      // open the modal after a timeout
      timeout = setTimeout(() => toggleMenu(open), timeoutDuration);
    }
    // else: don't click! 😁
  };

  const handleClick = (open) => {
    setOpenState(!open); // toggle open state in React state
    clearTimeout(timeout); // stop the hover timer if it's running
  };

  const LINK_STYLES = classNames(
    "py-3 px-2",
    "text-base text-gray-900",
    "transition duration-500 ease-in-out",
    "transition-transform transform hover:translate-x-2"
  );
  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      event.stopPropagation();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <div class="flex">
      <Popover className="relative mx-auto">
        {({ open }) => (
          <div
            onMouseEnter={() => onHover(open, "onMouseEnter")}
            onMouseLeave={() => onHover(open, "onMouseLeave")}
            className="flex flex-col"
          >
            <Popover.Button
              ref={buttonRef}
              className="focus:outline-none focus:ring-0 focus:ring-offset-0"
            >
              <div
                class={
                  "text-gray-800 flex justify-center items-center focus:outline-none py-3 px-6"
                }
                onClick={() => handleClick(open)}
              >
                <span className="uppercase font-light text-lg text-navTitle">
                  {menuTitle}
                </span>
                {showChevron && <ChevronDownIcon class="inline ml-1 w-4 h-4" />}
              </div>
            </Popover.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel static className="z-10 mx-auto">
                <div
                  className={classNames(
                    "w-full shadow-md flex flex-col py-1 absolute left-0 pl-3",
                    "bg-white"
                  )}
                >
                  {!isEmpty(linksArray) &&
                    linksArray.map(([title, href]) => (
                      <Fragment key={"PopoverPanel<>" + title + href}>
                        <a href={href} className={LINK_STYLES}>
                          {title}
                        </a>
                      </Fragment>
                    ))}
                </div>
              </Popover.Panel>
            </Transition>
          </div>
        )}
      </Popover>
    </div>
  );
}
