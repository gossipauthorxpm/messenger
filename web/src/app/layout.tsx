'use client'

import React from "react";
import TopPanel from "@/app/@components/topPanel/TopPanel";
import {NotificationsProvider} from '@toolpad/core/useNotifications';
import AuthProvider from "@/app/provider/AuthProvider";
import {Provider} from "react-redux";
import {_store} from "@/app/@redux/_store";
import FetchProvider from "@/app/provider/FetchProvider";


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
        <body>
        <Provider store={_store}>
            <NotificationsProvider>
                {/*Панель навигации*/}
                <AuthProvider>
                    <FetchProvider>
                        <>
                            <div>
                                <TopPanel/>
                            </div>
                            {children}
                        </>
                    </FetchProvider>
                </AuthProvider>
            </NotificationsProvider>
        </Provider>
        </body>
        </html>
    );
}
