import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"

const brandPrimary = defineStyle({
    borderWidth: '3px',
    borderStyle: 'dashed',
    borderColor: 'orange.500',

    // let's also provide dark mode alternatives
    _dark: {
        borderColor: 'orange.300',
    }
})

const xl = defineStyle({
    borderWidth: "10px",
    borderStyle: "solid",
    borderRadius: 20,
})

const thick = defineStyle({
    borderWidth: '5px', // change the appearance of the border
    borderStyle: "solid",
    borderRadius: 10, // set border radius to 10
    borderColor: "orange.500",
    _dark: {
      borderColor: "orange.300",
    }
})

export const dividerTheme = defineStyleConfig({
    thick,
    sizes: {
        "xl": xl
    },
    variants: {
        brand: brandPrimary,
        "thick": thick
    },
})