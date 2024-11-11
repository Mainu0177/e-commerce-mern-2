const backendDomain = 'http://localhost:4001'

const SummaryApi = {
    signUp : {
        url : `${backendDomain}/api/auth/sign-up`,
        method : 'post',
    }, 
    signIn : {
        url: `${backendDomain}/api/auth/sign-in`,
        method : 'post',
    },

}

export default SummaryApi;