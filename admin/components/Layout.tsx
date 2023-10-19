import React, { ReactNode } from 'react'
import style from "@/styles/layout.module.css"
import Nav from './Nav'

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