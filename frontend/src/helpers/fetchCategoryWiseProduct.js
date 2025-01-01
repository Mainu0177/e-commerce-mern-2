import SummaryApi from "../common/urlIntigration"



const fetchCategoryWiseProduct = async (category) => {
    const response = await fetch(SummaryApi.categoryWiseProduct.url,{
        method : SummaryApi.categoryWiseProduct.method,
        headers : {
            'Content-Type' : 'application/json'
        },
        bod : JSON.stringify({
            category : category
        })
    })
    const dateResponse = await response.json();
    return dateResponse;
}

export default fetchCategoryWiseProduct