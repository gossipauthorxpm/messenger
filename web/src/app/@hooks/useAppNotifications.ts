import {ShowNotificationOptions, useNotifications} from "@toolpad/core";
import React from "react";

export default function useAppNotifications() {
    const {show, close} = useNotifications()

    const showAlert = (
        message: React.ReactNode,
        options?: Omit<ShowNotificationOptions, "autoHideDuration">
    ) => {
        const messageOptions = {
            autoHideDuration: 1500,
            ...options
        }
        show(message, messageOptions)
    }

    return {
        show: showAlert
    }

}