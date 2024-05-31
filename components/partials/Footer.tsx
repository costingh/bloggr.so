import Social from '@/components/Social'
import config from '@/config/config.json'
import menu from '@/config/menu.json'
import social from '@/config/social.json'
import Logo from '@/components/Logo'
import Link from 'next/link'

const Footer = () => {
    const { copyright } = config.params
    return (
        <footer className="bg-[#eef2ff]">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Logo/>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        {menu.footer.map((f) => (
                            <div key={f.name}>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                                    {f.name}
                                </h2>
                                <ul className="text-gray-400 font-medium">
                                    {f.links.map((menu) => (
                                        <li className="mb-4" key={menu.name}>
                                            <Link
                                                href={menu.url}
                                                className="hover:underline"
                                            >
                                                {menu.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <hr className="my-6 sm:mx-auto border-gray-300 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">
                        © 2023{' '}
                        <a
                            href="https://paperchat.io/"
                            className="hover:underline"
                        >
                            PaperChat
                        </a>
                        . All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <Social source={social} className="social-icons" />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
