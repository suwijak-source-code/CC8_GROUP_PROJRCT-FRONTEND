import { extendTheme } from "@chakra-ui/react";
import Button from "./Button"



export const theme = extendTheme({
    styles: {
        global: {
            "html, body": {
                padding: 0,
                margin: 0,
                fontSize: "16px"
            },
            "*": {
                boxSizing: "border-box"
            }
        }
    },
    colors: {
        primary: {
            100: "#25E74F",
            200: "#22B442"
        },
        highlight: {
            100: "#BCF3C8"
        },
        muted: {
            100: "#FFFFFF",
            200: "#FCFCFC",
            300: "#F3F4ED"
        }
    },
    fonts: {
        heading: "Chakra Petch",
        body: "Chakra Petch"
    },
    components: {
        Button
    }
})