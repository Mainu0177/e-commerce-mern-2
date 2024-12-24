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
    },
    logout_user : {
        url : `${backendDomain}/api/auth/user-logout`,
        method: 'get'
    },
    all_users : {
        url : `${backendDomain}/api/auth/all-users`,
        method : 'get'
    },
    update_user : {
        url : `${backendDomain}/api/auth/update-user`,
        method : 'post'
    },
    upload_product : {
        url : `${backendDomain}/api/product/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomain}/api/product/getAllProduct`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomain}/api/product/updateProduct`,
        methode : 'post'
    }

}

export default SummaryApi;