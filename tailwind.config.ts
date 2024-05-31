import type { Config } from "tailwindcss";
const theme = require('./config/theme.json')

let font_base = Number(theme.fonts.font_size.base.replace('px', ''))
let font_scale = Number(theme.fonts.font_size.scale)
let h6 = font_base / font_base
let h5 = h6 * font_scale
let h4 = h5 * font_scale
let h3 = h4 * font_scale
let h2 = h3 * font_scale
let h1 = h2 * font_scale
let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType
if (theme.fonts.font_family.primary) {
    fontPrimary = theme.fonts.font_family.primary
        .replace(/\+/g, ' ')
        .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, '')
    fontPrimaryType = theme.fonts.font_family.primary_type
}
if (theme.fonts.font_family.secondary) {
    fontSecondary = theme.fonts.font_family.secondary
        .replace(/\+/g, ' ')
        .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, '')
    fontSecondaryType = theme.fonts.font_family.secondary_type
}

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                // "2xl": "1400px",
                sm: '540px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
        },
        extend: {
            colors: {
                text: theme.colors.default.text_color.default,
                light: theme.colors.default.text_color.light,
                dark: theme.colors.default.text_color.dark,
                // primary: theme.colors.default.theme_color.primary,
                // secondary: theme.colors.default.theme_color.secondary,
                body: theme.colors.default.theme_color.body,
                // border: theme.colors.default.theme_color.border,
                'theme-light': theme.colors.default.theme_color.theme_light,
                'theme-dark': theme.colors.default.theme_color.theme_dark,
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            fontSize: {
                base: font_base + 'px',
                h1: h1 + 'rem',
                'h1-sm': h1 * 0.8 + 'rem',
                h2: h2 + 'rem',
                'h2-sm': h2 * 0.8 + 'rem',
                h3: h3 + 'rem',
                'h3-sm': h3 * 0.8 + 'rem',
                h4: h4 + 'rem',
                h5: h5 + 'rem',
                h6: h6 + 'rem',
            },
            fontFamily: {
                primary: [fontPrimary, fontPrimaryType],
                secondary: [fontSecondary, fontSecondaryType],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwind-bootstrap-grid')({ generateContainer: false }),],

} satisfies Config;

export default config;
