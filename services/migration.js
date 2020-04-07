const axios = require('axios');

let url = "http://localhost:5000/api/";




migrate = async()=>{

let searchCriteria = ["horror","faultinourstars","harrypotter","comedy","political","poetry","romance",
"science", "suspense","poem","math","adult","children","animes","manga","kannada","bengalie", "harrypotter","soccer","cricket",
"education", "anime", "university", "india", "usa", "action"]

let structuredData;
let count = 0;
let criteria_count = 0;

try{
    await createSellers();
} catch(e){
    return;
}


searchCriteria.forEach(async(ele,index) => {
    let seller = "Batman";
    if(index<6){
        seller = "Superman";
    }
    if(index>=6 && index<12){
        seller = "Thor";
    }

    let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${ele}`);

    // console.log(Object.keys(res.data.items).length);
    // console.log(res.data.items);
if(res.data.hasOwnProperty("items")){
    res.data.items.forEach(async(element)=>{

           count = count+1;
        try{
             structuredData = {
                title: element.volumeInfo.title,
                authors: element.volumeInfo.authors? element.volumeInfo.authors: [],
                publisher : element.volumeInfo.publisher? element.volumeInfo.publisher: "Anonymous",
                description: element.volumeInfo.description? element.volumeInfo.description: "Read Book to find Out!!!",
                isbn:element.volumeInfo.industryIdentifiers,
                pageCount: element.volumeInfo.pageCount,
                category:element.volumeInfo.categories,
                averageRating: element.volumeInfo.averageRating?element.volumeInfo.averageRating:4.0,
                ratingsCount: element.volumeInfo.ratingsCount?element.volumeInfo.ratingsCount: 50,
                image : {},
                language: element.volumeInfo.language,
                price : {},
                seller: seller
            };

            if(element.volumeInfo.hasOwnProperty("imageLinks")){
            if(element.volumeInfo.imageLinks.hasOwnProperty("smallThumbnail")){
                structuredData.image.smallThumbnail = element.volumeInfo.imageLinks.smallThumbnail;
            }else{
                structuredData.image.smallThumbnail = "";
            }

            if(element.volumeInfo.imageLinks.hasOwnProperty("thumbnail")){
                structuredData.image.thumbnail = element.volumeInfo.imageLinks.thumbnail;
            }else{
                structuredData.image.thumbnail = "";
            }
        }else{
            structuredData.image.smallThumbnail = "";
            structuredData.image.Thumbnail = "";
        }

            if(element.saleInfo.sleability == "FOR_SALE"){
                structuredData.price.amount = element.saleInfo.listPrice.amount;
                structuredData.price.currency = element.saleInfo.listPrice.currencyCode;
            }else{
                structuredData.price.amount = "10.00";
                structuredData.price.currency = "USD"
            }
    
            // console.log("Structured data:::::", structuredData);
         await axios.post(url+"book/Addbook",structuredData);

        } catch(e){
            // console.log(e);
        }      
           
    });

}
console.log("countOfItems",count);

    
});


}

const createSellers = async()=>{  
    await axios.post(url+"users", {
            "username": "Batman",
            "email": "batman@gmail.com",
            "password": "Password123!",
            "userType": "SELLER"
        });

    await axios.post(url+"users", {
            "username": "Superman",
            "email": "superman@gmail.com",
            "password": "Password123!",
            "userType": "SELLER"
        });    
    
     await axios.post(url+"users", {
            "username": "Thor",
            "email": "thor@gmail.com",
            "password": "Password123!",
            "userType": "SELLER"
        });    

}


migrate();