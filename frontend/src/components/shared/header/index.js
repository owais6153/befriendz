import { Fragment , useContext, useEffect, useState, useCallback} from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Images } from "config/images";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { USER_TYPE } from "constants/user.constant";
import { SocketContext } from "context/socket.context";
import { SOCKET_EVENTS } from "constants/socket.constant";
import { openChatAction } from "redux/actions/chatAction";

const {
  logo,
  home,
  selectedHome,
  message,
  global,
  selectedGlobal,
  coin,
  selectedCoin,
  profile,
  selectedProfile,
  blueCheckIcon,
  minimizeIcon,
  notifyLike,
  notifyMessage,
  notifyProfile,
  userProfile,
  settings,
} = Images;

const userNavigation = [
  { name: "Profile", link: "/profile", icon: userProfile },
  { name: "Settings", link: "/settings/payments", icon: settings },
  { name: "Logout", link: "/logout", icon: settings },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavLinks = [
  {
    label: "Home",
    link: "/",
    icon: home.default,
    selectedIcon: selectedHome.default,
  },
  {
    label: "Groups",
    link: "/groups",
    icon: global.default,
    selectedIcon: selectedGlobal.default,
  },
  {
    label: "Friends",
    link: "/friends",
    icon: profile.default,
    selectedIcon: selectedProfile.default,
  },

  {
    label: "Buy",
    link: "/buy",
    icon: coin.default,
    selectedIcon: selectedCoin.default,
  },
];


function MessageDropdown ({rooms, openChat})  {
  return (                        
  <div className="max-w-lg flex-auto overflow-hidden rounded-2xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
    <div className="p-3">
      <div className="m-4 text-[16px] font-openSans_bold text-[#515165]">
      Messages
      </div>
    <div className="overflow-auto max-h-[402px]">
    {rooms.map(
      (item, index) => (
        <div
          key={item._id}
          className="flex flex-row pr-2 items-center justify-between pointer" onClick={(e)=>{           
            openChat(item);
          }}
        >
          <div className="group relative flex gap-x-3 rounded-lg p-2 hover:bg-gray-50">
            <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
              <span className="relative inline-block">
                <img
                  className="h-[40px] w-[40px] rounded-full"
                  src={item.user.profileImage}
                  alt={item.user.username}
                  title={item.user.username}
                />
                {/* <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" /> */}
              </span>
            </div>
            <div className="flex flex-col justify-between">
              <div className="font-openSans_semiBold text-c_515165 space-x-1 w-full">
                <span className="text-[12px] text-[#515165] font-openSans_bold">
                  {item.user?.type === USER_TYPE?.PERSONAL
                ? `${item.user?.first_name} ${item.user?.last_name}`
                : item.user?.business_name}
                </span>
                <span className="text-[12px] text-[#949494] font-openSans_regular">
                  {item.msg.createdAt}
                </span>
              </div>
              <div
                className="text-[10px] text-[#949494] font-openSans_regular block max-w-[300px] "
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.msg.message}
              </div>
            </div>
          </div>
          
            {item.isNew ? <div className="flex flex-col items-center justify-center rounded-full bg-[#FD6769] h-[10px] w-[10px]">
              </div>: null}
          
        </div>
      )
    )}
    </div>
    </div>
    </div>
    )
}


function Header(props) {
  const { pathname } = useLocation();

  const {socket} = useContext(SocketContext);
  const [rooms, setRooms] = useState([])

  const newMessageReceived = useCallback((data) => {
    const hasRoom = rooms.some(room => room._id == data.room?._id);
    console.log(rooms)
    if (!hasRoom) {
      setRooms((prevRooms) => [
        { ...data.room, isNew: true, msg: data.msg },
        ...prevRooms,
      ]);
    } else {
      setRooms(
        rooms?.map((room) => {
          if (room._id === data.room?._id) {
            return {
              ...room,
              ...data.room,
              isNew: true,
              msg: data.msg 
            };
          }
          else return room;
        })
      );
    }
  }, [rooms]);

  useEffect(() => {
    if (socket?.on) {
      socket.on(`${SOCKET_EVENTS.NEW_MESSAGE}`, newMessageReceived);
      return () => {
        socket.off(
          `${SOCKET_EVENTS.NEW_MESSAGE}}`,
          newMessageReceived
        );
      };
    }
  }, [socket]);

  return (
    <>
      
        <div className="min-h-full sticky top-0" style={{ zIndex: 10 }}>
          {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
          <Popover
            as="header"
            className={({ open }) =>
              classNames(
                open ? "fixed inset-0 z-40 overflow-y-auto" : "",
                "bg-white shadow-sm lg:static lg:overflow-y-visible"
              )
            }
          >
            {({ open }) => (
              <>
                <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
                  <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12 sm:grid-cols-12 flex-wrap">
                    <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2 ">
                      <div className="flex flex-shrink-0 items-center">
                        <Link to="/">
                          <img
                            className="block w-auto"
                            src={logo.default}
                            alt="Befriendz"
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="xl:col-span-2 hidden lg:block">
                      <div className="flex flex-row gap-2 items-center h-full">
                        {NavLinks.map((item, index) => {
                          const isSelected =
                            pathname === item.link ||
                            (pathname.includes(item.link) && item.link !== "/");
                          return (
                            <Link to={item.link} key={index}>
                              <div
                                className={`p-2 rounded-lg ${
                                  isSelected && "bg-[#FD6769]"
                                }`}
                              >
                                <img
                                  src={
                                    isSelected ? item.selectedIcon : item.icon
                                  }
                                />
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-4 sm:col-span-12 ">
                      <div className="flex items-center justify-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0 ">
                        <div className="w-full max-w-[400px]">
                          <label htmlFor="search" className="sr-only">
                            Search
                          </label>
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <MagnifyingGlassIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </div>
                            <input
                              id="search"
                              name="search"
                              className="outline-none block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-500 sm:text-sm sm:leading-6"
                              placeholder="Search"
                              type="search"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                      {/* Mobile menu button */}
                      <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                        <span className="sr-only">Open menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Popover.Button>
                    </div>
                    {props.auth.isLoggedIn && (<div className="hidden gap-2 lg:flex lg:items-center lg:justify-end xl:col-span-4">
                      <Popover className="relative">
                        <Popover.Button className="bg-[#F5F5F5] p-2 rounded-lg inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                          <span>
                            <img
                              src={message.default}
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </span>
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="min-w-[400px] absolute  z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-2">
                          <MessageDropdown rooms={rooms} openChat={props.openChat}/>
                          </Popover.Panel>
                        </Transition>
                      </Popover>
                      <Popover className="relative">
                        <Popover.Button className="bg-[#F5F5F5] p-2 rounded-lg inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                          <span>
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
                            {props.notification.totalUnseen[0].total > 0 ? <path d="M17.139 5.83366C18.2896 5.83366 19.2223 4.90092 19.2223 3.75033C19.2223 2.59973 18.2896 1.66699 17.139 1.66699C15.9884 1.66699 15.0557 2.59973 15.0557 3.75033C15.0557 4.90092 15.9884 5.83366 17.139 5.83366Z" fill="#FD6769" stroke="#FD6769" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/> : null}
                           </svg>
                          </span>
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 mt-5 flex w-screen max-w-max -translate-x-2/3 px-4 ">
                            <div className="max-w-[589px] flex-auto overflow-hidden rounded-md bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                              <div className="p-4">
                                <div className="m-4 flex flex-row items-center justify-between">
                                  <div className="text-[26px] font-bold text-[#515165]">
                                    {props.notification.totalUnseen[0].total} New Notifications
                                  </div>

                                  {props.notification.totalUnseen[0].total > 0 ? <div>
                                    <button className="flex flex-row items-center gap-2  font-openSans_semiBold rounded-md bg-[#E6F4F6] text-[#0493A3] py-2 px-3 text-[16px]">
                                      <img
                                        src={blueCheckIcon.default}
                                        fill="#0493A3"
                                        height="15px"
                                        width="15px"
                                      />
                                      Mark as Read
                                    </button>
                                  </div> : null }
                                </div>
                                <div className="px-4 mt-8 flex flex-row items-center justify-between text-[#949494]">
                                  <div className="text-[#0493A3] font-bold border-2 border-transparent border-b-[#0493A3] text-[16px]">
                                    All notifications
                                  </div>
                                  <div className="flex flex-row items-center gap-1 text-[16px] font-openSans_medium">
                                    <div>Reactions</div>
                                    <div>
                                      <img
                                        src={notifyLike.default}
                                        className="h-5 w-5"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-row items-center gap-1 text-[16px] font-openSans_medium">
                                    <div>Comments</div>
                                    <div>
                                      <img
                                        src={notifyMessage.default}
                                        className="h-5 w-5"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-row items-center gap-1 text-[16px] font-openSans_medium">
                                    <div>Mentions</div>
                                    <div>
                                      <img
                                        src={notifyProfile.default}
                                        className="h-5 w-5"
                                      />
                                    </div>{" "}
                                  </div>
                                </div>
                                <div className="overflow-auto max-h-[60vh] ">
                                  {props.notification.notifications?.map((item, index) => (
                                    <div
                                      key={item._id}
                                      className="group relative flex gap-x-5 rounded-lg p-2 hover:bg-gray-50"
                                    >
                                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <span className="relative inline-block">
                                          <img
                                            className="h-[50px] w-[50px] rounded-full"                                            
                                            src={item.by.profileImage}
                                            alt={item.by.username}
                                            title={item.by.username}
                                          />
                                          {/* <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" /> */}
                                        </span>
                                      </div>
                                      <div className="w-full">
                                        <div
                                          to={item.link}
                                          className="font-openSans_semiBold text-c_515165 space-x-3"
                                        >
                                          <span className="text-[18px] text-[#515165]">
                                            {item?.by?.type === USER_TYPE?.PERSONAL
                                                ? `${item?.by?.first_name} ${item?.by?.last_name}`
                                                : item?.by?.business_name}
                                          </span>
                                          <span className="text-[14px]">
                                           {item.type === 'comments' && !item?.parentComment ? 'commented on your post' : null }
                                           {item.type === 'comments' && item?.parentComment ? 'replied to your comment' : null }
                                          </span>
                                          <span className="absolute inset-0" />
                                          <div className="bg-c_F5F5F5 py-2 px-4 rounded-md">
                                            {item?.parentComment?.content ?  item?.comment?.content : null}                                            
                                          </div>
                                           <p className="mt-1 text-c_FD6769 text-[18px] font-openSans_semiBold mb-0">
                                          {item?.parentComment?.content ?
                                            item?.parentComment?.content
                                          : item?.post?.title} </p>
                                          <p className="text-c_515165 text-[10px] font-openSans_regular">
                                            {item.createdAt}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </Popover>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-5 flex-shrink-0">
                        <Menu.Button className="flex rounded-full bg-white">
                          <div>
                            <div className="flex flex-row gap-4 items-center">
                              <div>
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-8 w-8 rounded outline outline-c_FD6769 border border-white"
                                  src={props?.auth.user?.profileImage}
                                  alt=""
                                />
                              </div>
                              <div>{props?.auth.user?.username}</div>
                              <img
                                src={minimizeIcon.default}
                                height="15px"
                                width="15px"
                              />
                            </div>
                          </div>
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-2xl bg-white py-1 drop-shadow-md ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? " bg-gray-100" : "",
                                      "block py-2 px-3 rounded-lg"
                                    )}
                                  >
                                    <div className="flex items-center space-x-3 rounded">
                                      <div>
                                        <img src={item?.icon.default} />
                                      </div>
                                      <div>
                                        <span className="font-openSans_regular text-[#515165] text-[16px]">
                                          {item.name}
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>)}
                  </div>
                </div>

                <Popover.Panel
                  as="nav"
                  className="lg:hidden"
                  aria-label="Global"
                >
                  <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
                    {NavLinks.map((item, index) => {
                      const isSelected =
                        pathname === item.link ||
                        (pathname.includes(item.link) && item.link !== "/");
                      return (
                        <Link
                          key={index}
                          to={item.link}
                          aria-current={isSelected ? "page" : undefined}
                          className={classNames(
                            isSelected
                              ? "bg-gray-100 text-gray-900"
                              : "hover:bg-gray-50",
                            "block rounded-md py-2 px-3 text-base font-medium"
                          )}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                  {props.auth.isLoggedIn && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={props?.auth.user?.profileImage}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">
                          {props?.auth.user?.username}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          {props?.auth.user?.email}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                      {userNavigation?.map((item, index) => (
                        <Link
                          key={item.name}
                          to={item.link}
                          className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  )}
                </Popover.Panel>
              </>
            )}
          </Popover>
        </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  notification: state.notification,
});
const mapDispatchToProps = (dispatch) => ({
  openChat: data => dispatch(openChatAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
