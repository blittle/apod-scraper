({
    name: "apod-scraper",
    paths: {
        "apod-scraper": "apod-scraper"
    },
    baseUrl: "build",
    mainConfigFile: "config.js",
    out: "dist/apod-scraper-amd.js",
    optimize: "none",
    shim: {
        "apod-scraper" : {
            "deps": [],
            "exports" : "apod"
        }
    }
})