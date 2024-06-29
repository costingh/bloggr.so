import Logo from "@/components/Logo";
import SearchModal from "@/components/partials/SearchModal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useColorModeValues } from "@/lib/hooks/useColorModeValues";
import { DarkModeSwitch } from "@/components/DarkModeSwitch/DarkModeSwitch";

import { Box, Stack, Text } from "@chakra-ui/react";
import { MenuItem, NavbarConfig } from "@/lib/types";
import Button from "../BlogSetup/blog/Widgets/Button";

const Header: React.FC = ({logo, brandColor}: {logo?: string, brandColor?: string}) => {
    const [navFixed, setNavFixed] = useState(false);
    const [searchModal, setSearchModal] = useState(false);

    const { secondaryTextColor, colorSchemeSolid, borderColor, primaryTextColor } =
        useColorModeValues();

    const handleSearchModalOpen = () => {
        setSearchModal(true);
    };

    const navConfig: NavbarConfig = {
        brandName: "Bloggr",
        logo: {
            src: logo || '',
            redirectUrl: "/",
        },
        links: [
            {
                name: "Home",
                url: "/",
                hasChildren: true,
                children: [
                    {
                        name: "Home",
                        url: "/",
                        hasChildren: true,
                        children: [
                            {
                                name: "Home",
                                url: "/",
                            },
                        ],
                    },
                ],
            },
            {
                name: "Pricing",
                url: "/",
            },
        ],
        ctaButtons: [
            {
                text: "Start FREE",
                link: "/",
            },
        ],
    };

    const renderButtons = (): JSX.Element | null => {
        return <>
            {navConfig?.ctaButtons?.map((button, index) => (
                <Button key={index} brandColor={brandColor} variant={button.variant} text={button.text} link={button.link}/>
            ))}
        </>
    }

    return (
        <Box
            background={colorSchemeSolid}
            className={`sticky top-0 z-50 w-full border-b-[1px] py-1 transition-all border-[${borderColor}] ${
                navFixed ? "shadow" : ""
            }`}
        >
            <header>
                <nav className="navbar container">
                    <div className="order-0">
                        <Stack direction="row" alignItems="center">
                            <Logo
                                src={navConfig?.logo?.src}
                                redirectUrl={navConfig?.logo?.redirectUrl}
                            />
                            {navConfig?.brandName && (
                                <Text className='text-[16px] font-[700]' color={primaryTextColor}>
                                    {navConfig?.brandName}
                                </Text>
                            )}
                        </Stack>
                    </div>
                    <input id="nav-toggle" type="checkbox" className="hidden" />
                    <label
                        id="show-button"
                        htmlFor="nav-toggle"
                        className="order-2 ml-3 flex cursor-pointer items-center md:order-1 md:hidden"
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
                        {navConfig?.links?.map((menu: MenuItem, i: number) => (
                            <React.Fragment key={`menu-${i}`}>
                                {menu.hasChildren ? (
                                    <li className="nav-item nav-dropdown group relative">
                                        <span className="nav-link inline-flex items-center text-[17px] font-[500] cursor-pointer">
                                            <Box
                                                color={primaryTextColor}
                                                sx={{ marginRight: "4px" }}
                                                _hover={{
                                                    color: "brand.400",
                                                }}
                                            >
                                                {menu.name}
                                            </Box>
                                            <svg
                                                className="h-3 w-3 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                        <ul className="nav-dropdown-list hidden group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                                            {menu.children?.map(
                                                (
                                                    child: MenuItem,
                                                    j: number,
                                                ) => (
                                                    <li
                                                        className="nav-dropdown-item"
                                                        key={`children-${j}`}
                                                    >
                                                        <Link
                                                            href={child.url}
                                                            className="nav-dropdown-link block text-[17px] font-[500]"
                                                        >
                                                            <Box
                                                                color={
                                                                    primaryTextColor
                                                                }
                                                                _hover={{
                                                                    color: "brand.400",
                                                                }}
                                                            >
                                                                {child.name}
                                                            </Box>
                                                        </Link>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link
                                            href={menu.url}
                                            className="nav-link block text-[17px] font-[500]"
                                        >
                                            <Box
                                                color={primaryTextColor}
                                                _hover={{
                                                    color: "brand.400",
                                                }}
                                            >
                                                {menu.name}
                                            </Box>
                                        </Link>
                                    </li>
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                    <div className="order-1 ml-auto flex items-center gap-2 md:order-2 md:ml-0">
                        {/*TODO:

                        <div
                            className="cursor-pointer p-2 text-xl text-dark hover:text-blue-600"
                            onClick={handleSearchModalOpen}
                        >
                            <IoSearch />
                        </div> */}
                        <DarkModeSwitch />
                        {renderButtons()}
                    </div>
                    <SearchModal
                        searchModal={searchModal}
                        setSearchModal={setSearchModal}
                    />
                </nav>
            </header>
        </Box>
    );
};

export default Header;
