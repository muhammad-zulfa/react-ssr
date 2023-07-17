// ./server/index.js

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import App from '../pages/App'
import Home from '../pages/home'

const app = express()
const port = 3001
const cdnHost = `http://localhost:3000`; // [D]

app.get('/', (req, res) => {
    const jsx = ReactDOMServer.renderToString(<App />) // [A]

    const clientBundleStyle = `<link rel="stylesheet" href="${cdnHost}/styles/bundle.css">` // [B]
    const clientBundleScript = `<script src="${cdnHost}/scripts/bundle.js"></script>` // [C]

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>My SSR Apps</title>
                ${clientBundleStyle} <!-- [B] -->
            </head>
            <body>
                <div id='ssr-app'>${jsx}</div> <!-- [A] -->
                ${clientBundleScript} <!-- [C] -->
            </body>
        </html>
    `)
})

app.get('/home', (req,res) => {
    const jsx = ReactDOMServer.renderToString(<Home />) // [A]

    const clientBundleStyle = `<link rel="stylesheet" href="${cdnHost}/styles/bundle.css">` // [B]
    const clientBundleScript = `<script src="${cdnHost}/scripts/bundle.js"></script>` // [C]

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>My SSR Apps</title>
                ${clientBundleStyle} <!-- [B] -->
            </head>
            <body>
                <div id='ssr-app'>${jsx}</div> <!-- [A] -->
                ${clientBundleScript} <!-- [C] -->
            </body>
        </html>
    `)
})

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})