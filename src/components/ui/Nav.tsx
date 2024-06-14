'use client';

import clsx from 'clsx';
import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { logout } from '@/actions/auth';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: '/images/photo-user.jpeg',
};
const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Jobs', href: '/jobs' },
  { name: 'Contact', href: '/contact' },
];
const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
  // { name: 'Logout', href: '#' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Nav() {
  const pathName = usePathname();
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          {/* Desktop Nav */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Left (Logo + Main Nav Menu) */}
              <div className="flex items-center">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <Image
                    className="h-8 w-8"
                    src="/images/favicon-32x32.png"
                    alt="Your Company"
                    height={32}
                    width={32}
                  />
                </div>

                {/* Main Nav Menu */}
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          'rounded-md px-3 py-2 text-sm font-medium',
                          item.href === pathName && 'bg-gray-900 text-white',
                          item.href !== pathName &&
                            'text-gray-300 hover:bg-gray-700 hove:text-white'
                        )}
                        aria-current={
                          item.href === pathName ? 'page' : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right (Notification, Profile Dropdown) */}
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Notification */}
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={user.imageUrl}
                          alt=""
                          height={32}
                          width={32}
                        />
                      </MenuButton>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map(item => (
                          <MenuItem key={item.name} as={Fragment}>
                            {({ focus }) => (
                              <Link
                                href={item.href}
                                className={clsx(
                                  'block px-4 py-2 text-sm text-gray-700',
                                  focus && 'bg-gray-100'
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </MenuItem>
                        ))}
                        {/* Logout Button */}
                        <MenuItem key="logout" as={Fragment}>
                          {({ focus }) => (
                            <button
                              className={clsx(
                                'w-full text-left block px-4 py-2 text-sm text-gray-700',
                                focus && 'bg-gray-100'
                              )}
                              onClick={async () => await logout()}
                            >
                              Logout
                            </button>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Mobile Nav */}
          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map(item => (
                <DisclosureButton
                  key={item.name}
                  className={classNames(
                    item.href === pathName
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block w-full rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  <Link
                    href={item.href}
                    className="block w-full"
                    aria-current={item.href === pathName ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt=""
                    height={32}
                    width={32}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map(item => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
