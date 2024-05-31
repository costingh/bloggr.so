import Logo from '@/components/Logo';
import menu from '@/config/menu.json';
import SearchModal from '@/components/partials/SearchModal';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useColorModeValues } from "@/lib/hooks/useColorModeValues";
import { DarkModeSwitch } from "@/components/DarkModeSwitch/DarkModeSwitch";

import {
   Box
} from "@chakra-ui/react";

interface MenuItem {
    name: string;
    url: string;
    hasChildren?: boolean;
    children?: MenuItem[];
}

const Header: React.FC = () => {
    const { main } = menu;

    const [navFixed, setNavFixed] = useState(false);
    const [searchModal, setSearchModal] = useState(false);

    const { secondaryTextColor, colorSchemeSolid, borderColor } = useColorModeValues();

    const handleSearchModalOpen = () => {
        setSearchModal(true);
    };

    return (
        <Box background={colorSchemeSolid} className={`sticky top-0 z-50 py-1 transition-all w-full border-b-2 border-[${borderColor}] ${
            navFixed ? 'shadow' : ''
        }`} >
            <header
            >
                <nav className="navbar container">
                    <div className="order-0">
                        <Logo/>
                    </div>
                    <input id="nav-toggle" type="checkbox" className="hidden" />
                    <label
                        id="show-button"
                        htmlFor="nav-toggle"
                        className="order-2 flex cursor-pointer items-center md:order-1 md:hidden ml-3"
                    >
                        <svg className="h-6 fill-current" viewBox="0 0 20 20">
                            <title>Menu Open</title>
                            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
                        </svg>
                    </label>
                    <label
                        id="hide-button"
                        htmlFor="nav-toggle"
                        className="order-2 hidden cursor-pointer items-center md:order-1"
                    >
                        <svg className="h-6 fill-current" viewBox="0 0 20 20">
                            <title>Menu Close</title>
                            <polygon
                                points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                                transform="rotate(45 10 10)"
                            />
                        </svg>
                    </label>
                   
                        <ul
                            id="nav-menu"
                            className="navbar-nav order-3 hidden w-full md:order-1 md:flex md:w-auto md:space-x-2"
                        >
                            {main.map((menu: MenuItem, i: number) => (
                                <React.Fragment key={`menu-${i}`}>
                                    {menu.hasChildren ? (
                                        <li className="nav-item nav-dropdown group relative">
                                            <span className="nav-link inline-flex items-center">
                                                <Box
                                                    color={secondaryTextColor}
                                                >
                                                    {menu.name}
                                                </Box>
                                                <svg
                                                    className="h-4 w-4 fill-current"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </span>
                                            <ul className="nav-dropdown-list hidden group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                                                {menu.children?.map((child: MenuItem, j: number) => (
                                                    <li className="nav-dropdown-item" key={`children-${j}`}>
                                                        <Link href={child.url} className="nav-dropdown-link block">
                                                            <Box
                                                                color={secondaryTextColor}
                                                            >
                                                                {child.name}
                                                            </Box>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ) : (
                                        <li className="nav-item">
                                            <Link href={menu.url} className="nav-link block text-[15px] font-normal">
                                                <Box
                                                    color={secondaryTextColor}
                                                >
                                                    {menu.name}
                                                </Box>
                                            </Link>
                                        </li>
                                    )}
                                </React.Fragment>
                            ))}
                        </ul>
                    <div className="order-1 ml-auto md:order-2 md:ml-0 flex items-center gap-2">
                        {/* <div
                            className="cursor-pointer p-2 text-xl text-dark hover:text-indigo-600"
                            onClick={handleSearchModalOpen}
                        >
                            <IoSearch />
                        </div> */}
                        <DarkModeSwitch />
                        {/* <Link
                            href="https://paperchat.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-transparent rounded-lg py-1 px-4 text-indigo-600 border border-indigo-600 transition cursor-pointer hover:text-slate-200 hover:bg-indigo-600"
                        >
                            Login
                        </Link> */}
                        <Link
                            href="https://paperchat.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-indigo-600 rounded-lg py-1 px-4 text-slate-200 border border-indigo-600 transition cursor-pointer hover:text-indigo-600 hover:bg-transparent"
                        >
                            CTA Button
                        </Link>
                    </div>
                    <SearchModal searchModal={searchModal} setSearchModal={setSearchModal} />
                </nav>
            </header>
        </Box>
    );
};

export default Header;
