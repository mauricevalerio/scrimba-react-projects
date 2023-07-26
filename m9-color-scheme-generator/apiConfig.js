const options = {
    headers: {
        'Content-Type': 'application/json'
    }
}

function colorSchemeApi(colorSchemeData) {
    let baseUrl = new URL('https://www.thecolorapi.com/scheme')

    for (const pair of colorSchemeData.entries()) {
        baseUrl.searchParams.append(pair[0], pair[1]) //loops on the entries of formdata then appends to the URL as query string
    }

    return fetch(baseUrl.href, options)
        .then(response => response.json())
        .then(data => data)
}

export { colorSchemeApi }
