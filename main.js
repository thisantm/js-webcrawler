import { argv } from 'node:process'
import { crawlPage } from './crawl.js'
import { printReport } from './report.js'

async function main() {
    if (argv.length < 3) {
        console.error('Error: There must be a single argument')
        return
    }

    if (argv.length > 3) {
        console.error('Error: Only one argument is allowed')
        return
    }
    // npm run start https://wagslane.dev
    console.log('crawler starting...')
    const url = argv[2]
    const pages = await crawlPage(url)
    printReport(pages)
}

await main()
