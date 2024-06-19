export type DomainVerificationStatusProps =
    | "Valid Configuration"
    | "Invalid Configuration"
    | "Pending Verification"
    | "Domain Not Found"
    | "Unknown Error";

// From https://vercel.com/docs/rest-api/endpoints#get-a-project-domain
export interface DomainResponse {
    name: string;
    apexName: string;
    projectId: string;
    redirect?: string | null;
    redirectStatusCode?: (307 | 301 | 302 | 308) | null;
    gitBranch?: string | null;
    updatedAt?: number;
    createdAt?: number;
    /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
    verified: boolean;
    /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
    verification: {
        type: string;
        domain: string;
        value: string;
        reason: string;
    }[];
}

// From https://vercel.com/docs/rest-api/endpoints#get-a-domain-s-configuration
export interface DomainConfigResponse {
    /** How we see the domain's configuration. - `CNAME`: Domain has a CNAME pointing to Vercel. - `A`: Domain's A record is resolving to Vercel. - `http`: Domain is resolving to Vercel but may be behind a Proxy. - `null`: Domain is not resolving to Vercel. */
    configuredBy?: ("CNAME" | "A" | "http") | null;
    /** Which challenge types the domain can use for issuing certs. */
    acceptedChallenges?: ("dns-01" | "http-01")[];
    /** Whether or not the domain is configured AND we can automatically generate a TLS certificate. */
    misconfigured: boolean;
}

// From https://vercel.com/docs/rest-api/endpoints#verify-project-domain
export interface DomainVerificationResponse {
    name: string;
    apexName: string;
    projectId: string;
    redirect?: string | null;
    redirectStatusCode?: (307 | 301 | 302 | 308) | null;
    gitBranch?: string | null;
    updatedAt?: number;
    createdAt?: number;
    /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
    verified: boolean;
    /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
    verification?: {
        type: string;
        domain: string;
        value: string;
        reason: string;
    }[];
}

type Logo = {
    src: string;
    redirectUrl?: string
} 

type ButtonVariant = 'outline' | 'solid' | 'simple'

type Button = {
    text: string
    link: string
    color?: string
    borderRadius?: string 
    variant?: ButtonVariant
}

export type NavbarConfig = {
    brandName: string
    logo: Logo
    links: MenuItem[]
    ctaButtons: Button[]
}

export type MenuItem = {
    name: string;
    url: string;
    hasChildren?: boolean;
    children?: MenuItem[];
}

export type FooterItem = {
    name: string;
    url: string;
}

export type SocialItem = {
    platform: string;
    tooltip?: string;
    url: string;
}

type FooterColumn = {
    columnTitle: string
    links?: FooterItem[]
    socials?: SocialItem[]
}

export type FooterConfig = {
    brandName?: string
    logo: Logo
    slogan?: string
    copyright?: string
    columns: FooterColumn[]
}