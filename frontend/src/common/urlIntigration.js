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
        method : 'post'
    },
    categoryProduct : {
        url : `${backendDomain}/api/product/get-categoryProduct`,
        method : 'get',
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/product/category-product`,
        method : 'post',
    },
    productDetails : {
        url : `${backendDomain}/api/product/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomain}/api/product/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomain}/api/product/countAddToCartProduct`,
        method : 'get'
    },
    addToCartViewProduct : {
        url : `${backendDomain}/api/product/view-cart-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomain}/api/product/update-cart-product`,
        method : 'post',
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/product/delete-cart-product`,
        method : 'post',
    },
    productSearch : {
        url : `${backendDomain}/api/product/searchProduct`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomain}/api/product/filter-product`,
        method : 'post'
    }
}

export default SummaryApi;