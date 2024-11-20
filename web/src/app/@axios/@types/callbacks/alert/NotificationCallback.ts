import React from "react";
import {ShowNotificationOptions} from "@toolpad/core";

export type NotificationCallback = {
    (message: React.ReactNode,
     options?: Omit<ShowNotificationOptions, "autoHideDuration">): void
}