import { normalizeURL, getURLsFromHTML } from './crawl.js'

test('normalizeURL', () => {
    const testURLs = [
        'https://blog.boot.dev/path/',
        'https://blog.boot.dev/path',
        'http://blog.boot.dev/path/',
        'http://blog.boot.dev/path',
    ]
    const normalizedURL = 'blog.boot.dev/path'
    for (const url of testURLs) {
        expect(normalizeURL(url)).toBe(normalizedURL)
    }
})

describe('getURLsFromHTML', () => {
    test('get multiple absolute urls', () => {
        const testHTML = `
        <html>
            <body>
                <a href="http://example.com/foo">Example</a>
                <a href="http://example.com/bar">Example</a>
                <a href="http://example.com">Example</a>
            </body>
        </html>
    `
        const testURLs = ['http://example.com/foo', 'http://example.com/bar', 'http://example.com/']
        expect(getURLsFromHTML(testHTML, 'http://example.com')).toEqual(testURLs)
    })

    test('get multiple urls with relative', () => {
        const testHTML = `
        <html>
            <body>
                <a href="http://example.com">Example</a>
                <a href="/foo">Example</a>
                <a href="/bar">Example</a>
            </body>
        </html>
    `
        const testURLs = ['http://example.com/', 'http://example.com/foo', 'http://example.com/bar']
        expect(getURLsFromHTML(testHTML, 'http://example.com')).toEqual(testURLs)
    })
})
