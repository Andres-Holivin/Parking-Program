import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
    container: {
    },
    thumb: {
        bg: 'white',
        _checked: {
            bg: 'black',
        },
    },
    track: {
        bg: 'black',
        _checked: {
            bg: 'white',
        },
    },
})

export const switchTheme = defineMultiStyleConfig({ baseStyle })