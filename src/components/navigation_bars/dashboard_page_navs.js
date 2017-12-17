import React from 'react'

export default function () {
    return(
        <div className="header clearfix">
            <nav>
                <ul className="nav nav-pills float-center">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/dashboard">Dashboard</a>
                    </li>
                    <li className="nav-item pull-right">
                            <a className="nav-link" href="/logout">Logout</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}