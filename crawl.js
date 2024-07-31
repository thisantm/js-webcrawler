import { JSDOM } from 'jsdom'

function normalizeURL(urlString) {
    const objURL = new URL(urlString)
    const hostnamePath = `${objURL.hostname}${objURL.pathname}`

    if (hostnamePath.length > 0 && hostnamePath.at(-1) === '/') {
        return hostnamePath.slice(0, hostnamePath.length - 1)
    }

    return hostnamePath
}

function getURLsFromHTML(html, baseURL) {
    const dom = new JSDOM(html)
    const anchors = dom.window.document.querySelectorAll('a')
    const urls = []

    anchors.forEach((anchor) => {
        if (anchor.hasAttribute('href')) {
            const href = anchor.getAttribute('href')
            try {
                urls.push(new URL(href, baseURL).href)
            } catch (err) {
                console.error(`${err.message}: ${href}`)
            }
        }
    })

    return urls
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    const normalizedBaseURL = normalizeURL(baseURL)
    const normalizedCurrentURL = normalizeURL(currentURL)

    if (!normalizedCurrentURL.startsWith(normalizedBaseURL)) {
        return pages
    }

    if (normalizedCurrentURL in pages) {
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1

    console.log(`/X\\('-')/X\\ now crawling ${currentURL}`)
    let response
    try {
        response = await fetch(currentURL)
    } catch (err) {
        console.error(err)
        return pages
    }

    if (response.status >= 400) {
        console.error(`Error: Response Status = ${response.status}`)
        return pages
    }
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')) {
        console.error(`Error: Content Type = ${response.headers['content-type']} is not text/html`)
        return pages
    }

    const bodyHTML = await response.text()
    const urls = getURLsFromHTML(bodyHTML, baseURL)
    for (const url of urls) {
        pages = await crawlPage(baseURL, url, pages)
    }

    return pages
}

export { normalizeURL, getURLsFromHTML, crawlPage }
