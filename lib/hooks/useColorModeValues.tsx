import { useColorModeValue } from "@chakra-ui/react";

export const useColorModeValues = () => {
    const primaryTextColor = useColorModeValue(
        "rgba(0,0,0,1)",
        "whiteAlpha.800",
    );

    const secondaryTextColor = useColorModeValue(
        "rgb(99, 99, 99)",
        "whiteAlpha.600",
    );

    const borderColor = useColorModeValue(
        "RGBA(0, 0, 0, 0.08)", // blackAlpha.200
        "RGBA(255, 255, 255, 0.08)",
    );
    const outlineColor = useColorModeValue(
        "RGBA(0, 0, 0, 0.08)", // blackAlpha.200
        "RGBA(255, 255, 255, 0.08)", // whiteAlpha.200
    );

    const baseTextColor = {
        50: useColorModeValue("blackAlpha.50", "whiteAlpha.50"),
        100: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
        200: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
        300: useColorModeValue("blackAlpha.300", "whiteAlpha.300"),
        400: useColorModeValue("blackAlpha.400", "whiteAlpha.400"),
        500: useColorModeValue("blackAlpha.500", "whiteAlpha.500"),
        600: useColorModeValue("blackAlpha.600", "whiteAlpha.600"),
        700: useColorModeValue("blackAlpha.700", "whiteAlpha.700"),
        800: useColorModeValue("blackAlpha.800", "whiteAlpha.800"),
        900: useColorModeValue("blackAlpha.900", "whiteAlpha.900"),
    };

    const colorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
    const colorSchemeSolid = useColorModeValue('#FFF', '#1A202C');


    return {
        colorScheme,
        primaryTextColor,
        secondaryTextColor,
        borderColor,
        baseTextColor,
        outlineColor,
        colorSchemeSolid
    };
};
