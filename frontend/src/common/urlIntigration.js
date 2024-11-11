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
    current_user : {
        url : `${backendDomain}/api/auth/user-details`, 
        method : 'get'
    }
}

export default SummaryApi;