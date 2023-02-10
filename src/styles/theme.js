import { extendTheme, useColorModeValue } from "@chakra-ui/react"
import { switchTheme } from '../../components/switch'


const theme = extendTheme({
    config: {
        initialColorMode: 'system',
        useColorModeValue: true
    },
    styles: {
        global: (props) => ({
            body: {
                bg: props.colorMode === 'dark' ? '#30475E' : '#DDDDDD',
            },
        }),
    },
    components: { Switch: switchTheme },
})

export default theme;