import React, { ReactNode } from 'react'
import style from "@/styles/layout.module.css"
import Nav from './Nav'
// import { GetServerSideProps } from "next";

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//     const username = req.cookies.username;

//     if (!username) {
//         res.writeHead(302, { Location: "/login" });
//         res.end();
//     }

//     return {
//         props: {}
//     };
// }

interface LayoutProps {
    children: ReactNode
}

export default function Layout({children}: LayoutProps) {
    return (
        <div>
            <Nav />
            <main className={style.container}>{children}</main>
        </div>
    )
}