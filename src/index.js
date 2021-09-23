import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { ProjectFocus } from "./components/ProjectFocus.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ProjectFocus />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)

