import config from "@/config/config.json";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
    src?: string;
    redirectUrl?: string;
}

const Logo: React.FC<LogoProps> = ({ src, redirectUrl }) => {
    // Destructuring items from config object
    const { logo, logo_width, logo_height, logo_text, title } = config.site;

    return (
        <Link href={redirectUrl || '/'} passHref>
            {/* <a className="navbar-brand block"> */}
                {src || logo ? (
                    <Image
                        width={parseInt(logo_width.replace("px", "")) / 7}
                        height={parseInt(logo_height.replace("px", "")) / 7}
                        src={src ? src : logo}
                        alt={title}
                        priority
                    />
                ) : logo_text ? (
                    logo_text
                ) : (
                    title
                )}
            {/* </a> */}
        </Link>
    );
};

export default Logo;
