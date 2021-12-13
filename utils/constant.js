const baseApigeeUrl = 'https://frontend-screening-v1.herokuapp.com';

const errors = {
    internalServerError: { status: 500, statusText: 'Something went wrong. Please try again' }
}

module.exports = {
    baseApigeeUrl,
    errors
}