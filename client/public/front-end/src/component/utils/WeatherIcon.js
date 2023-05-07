import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import WbCloudyOutlinedIcon from "@material-ui/icons/WbCloudyOutlined";
import Brightness5OutlinedIcon from "@material-ui/icons/Brightness5Outlined";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#F7DC6F",
        },
        secondary: {
            main: "#D7DBDD",
        },
    },
});

const WeatherIcon = () => {
    return (
        <ThemeProvider theme={theme}>
            <WbCloudyOutlinedIcon style={{ fontSize: 80 }} color="secondary" />
            <Brightness5OutlinedIcon
                style={{
                    fontSize: 60,
                    color: theme.palette.primary.main,
                    position: "absolute",
                    top: 5,
                    left: 5,
                }}
            />
        </ThemeProvider>
    );
};

export default WeatherIcon;
