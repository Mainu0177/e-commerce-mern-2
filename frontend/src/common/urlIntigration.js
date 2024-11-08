const backendDomain = 'http://localhost:4001'

const SummaryApi = {
    singUp : {
        url : `${backendDomain}/api/auth/sign-up`,
        method : 'post',
    }
}

module.exports = SummaryApi;