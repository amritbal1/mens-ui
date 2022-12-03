import { Fragment, useRef, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { isEmpty } from "../../utils/objectUtils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { withRouter } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MenuItemComponent = function MenuItem({
  menuTitle,
  linksArray,
  urlParam,
  showChevron = true,
  history,
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
    "w-full cursor-pointer pb-3 px-2",
    "text-sm sm:text-base font-light text-slate-gray",
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

  const handleLinkClick = ({ href }) => {
    if (urlParam === "brands") {
      history.push(
        `/results?brands=${href}&minPrice=null&maxPrice=null&productCategories=null&skinConcerns=null`
      );
    } else if (urlParam === "productCategories") {
      history.push(
        `/results?brands=null&minPrice=null&maxPrice=null&productCategories=${href}&skinConcerns=null`
      );
    }
  };

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
                  "flex justify-center items-center focus:outline-none py-3 px-6"
                }
                onClick={() => handleClick(open)}
              >
                <span className="uppercase font-medium text-sm tracking-widest leading-5">
                  {menuTitle}
                </span>
                {showChevron && <ChevronDownIcon class="inline ml-1 w-4 h-4" />}
              </div>
            </Popover.Button>

            {!isEmpty(linksArray) && (
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
                <Popover.Panel static className="z-10 -translate-x-1/2">
                  <div
                    className={classNames(
                      "bg-white px-8 shadow-lg py-6 absolute left-0 w-56"
                    )}
                  >
                    {!isEmpty(linksArray) &&
                      linksArray.map(([title, href]) => (
                        <Fragment key={"PopoverPanel<>" + title + href}>
                          <div
                            className={LINK_STYLES}
                            onClick={() => handleLinkClick({ href })}
                          >
                            {title}
                          </div>
                        </Fragment>
                      ))}
                  </div>
                </Popover.Panel>
              </Transition>
            )}
          </div>
        )}
      </Popover>
    </div>
  );
};

export default withRouter(MenuItemComponent);
