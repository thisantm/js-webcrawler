function printReport(pages) {
    console.log('Starting Report...')
    const sortedPages = sortPages(pages)
    for (const page in sortedPages) {
        console.log(`Fount ${sortedPages[page]} internal links to ${page}`)
    }
}

function sortPages(pages) {
    const pagesArray = Object.entries(pages)
    pagesArray.sort((a, b) => b[1] - a[1])
    return Object.fromEntries(pagesArray)
}

export { printReport }
