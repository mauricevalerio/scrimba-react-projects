function appendOmdbQueryParams(queryParams) {
    const baseUrl = new URL('https://www.omdbapi.com/')

    for (const property in queryParams) {
        baseUrl.searchParams.append(property, queryParams[property])
    }

    return baseUrl.href
}

function getOmdbUrl(searchText) {
    return appendOmdbQueryParams({
        apiKey: '1a9d8ea6',
        s: searchText
    })
}

function getOmdbMovieDetailsUrl(imdbId) {
    return appendOmdbQueryParams({
        apiKey: '1a9d8ea6',
        i: imdbId
    })
}

export {
    getOmdbUrl,
    getOmdbMovieDetailsUrl
}