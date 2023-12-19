import React, {useEffect,useState} from 'react'

import SingleDetails from './SingleDetails'
import {Routes, Route, Link,useNavigate, Navigate,} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'


const Nutritions = () => { 
  const navigateTo = useNavigate()
 
 
   var nutritionsArray=[
      
        {
          "name": "Creamy Chicken Penne Pasta",
          "description": "If you're in need of a hug in a bowl, this creamy chicken penne pasta is just the ticket. With tender chicken, perfectly cooked pasta, and a velvety sauce, it's pure comfort in a bowl.",
          "thumbnail_url": "https://img.buzzfeed.com/video-api-prod/assets/641e3c1a5f2a48f29b605bff9cbe72b6/BFV10263_CreamyChickenPenne-Thumb1080.jpg"
        },
        {
        "name": "The Best Chewy Chocolate Chip Cookies",
        "description": "There are a few secrets to the best classic, chewy chocolate chip cookies. Number one: Don’t use chips; instead, opt for a mix of milk or semisweet and dark chocolate chunks. The second is to let the dough rest overnight or longer for a more complex, toffee-like flavor. Lastly, use an ice cream scooper to get even-sized cookies every time. And that’s it! With these little tweaks, the result is a cookie that’s textured on the outside, and soft and gooey on the inside. Absolutely perfect!",
        "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/62298.jpg"
      },
      {
        "name": "3-Ingredient Teriyaki Chicken",
        "description": "This 3-Ingredient Teriyaki Chicken is a total game-changer - with its perfect balance of salty and sweet, this dish is sure to kick up your weeknights with minimal effort required.",
        "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/1d47125afffa461a9711758f632306b8/BFV12484_3-IngredientDinners-FB1080SQ.jpg"
      },
    
      {
        "name": "Cheesy Chicken Alfredo Pasta Bake",
        "description": "Get ready to be cheesin' from ear to ear with this Cheesy Chicken Alfredo Pasta Bake - loaded with gooey cheese, al dente pasta, and tender chicken, this dish is pure comfort in a bowl.",
        "thumbnail_url": "https://img.buzzfeed.com/video-api-prod/assets/e1119589710f4cc19266fc5f05448933/BFV10386_Cheesy_Chicken_Alfredo_Pasta_Bake_Recipe_Photo_2.jpg"
      },
      {
        "name": "The Best One-Bowl Brownies",
        "description": "Indulge your sweet tooth with The Best One-Bowl Brownies that are rich, fudgy, and oh-so-decadent! With just the right balance of chewy and gooey, these brownies are a chocolate lover's dream come true, and the best part? They're made with just one bowl, making clean-up a breeze.",
        "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/177189.jpg"
      },
      {
        "name": "One-Pan Honey Garlic Chicken",
        "description": "Calling all honey garlic lovers! This One-Pan Honey Garlic Chicken is a one-way ticket to flavor town - juicy chicken thighs coated in a sticky, sweet sauce that will have you licking your plate clean!",
        "thumbnail_url": "https://img.buzzfeed.com/video-api-prod/assets/ba8b9b30531c4058956bbe5c1296bbc8/Thumb_A_FB.jpg"
      },
      {
        "name": "Chicken & Veggie Stir-Fry",
        "description": "Getting take-out is a crave-worthy indulgence. And with our easy chicken veggie stir fry recipe, you can recreate the magic of a Chinese takeout right in your very own kitchen. Feel free to mix up the protein or vegetables depending on what you have in your fridge. The simple sauce packs a flavor punch that will bring the dish together, no matter what.",
        "thumbnail_url": "https://img.buzzfeed.com/video-api-prod/assets/cf779f07644e43d988e37652a4987d7f/BFV12730_ChickenBroccoliandMushroomStirFry-ThumbTextless1080.jpg"
      },
      {
        "name": "Garlic Shrimp Bacon Alfredo",
        "description": "This garlic bacon shrimp alfredo is the ultimate weeknight indulgence, with succulent shrimp, smoky bacon, and a rich, creamy sauce that will have your taste buds dancing with delight.",
        "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/1c17e86f91b94748bf4cf52ba781c789/BFV16661_ShrimpAlfredoDinnerForTwoFINAL.jpg"
      },
      {
        "name": "3 Ingredient Peanut Butter Cookies",
        "description": "Whip up these scrumptious 3-Ingredient Peanut Butter Cookies in a snap! With just peanut butter, sugar, and an egg, you'll have a delightful treat that's perfect for satisfying your sweet tooth.",
        "thumbnail_url": "https://img.buzzfeed.com/video-api-prod/assets/334c9eee7f37412fba5111e291dd6cb1/YT_Thumb.jpg"
      },
      {
        "name": "Easy Chicken Alfredo Penne",
        "description": "Nothing spells comfort like Italian food. Steaming bowls of pasta, buttery, roasted garlic bread, and tureens of the most flavorful sauces: it’s all right there. Sometimes, you want to bring that comfort into your very own kitchen and, well, we’ve got just the recipe for you. This easy chicken alfredo penne will have you saying ‘mangia!’ before you even know it.  ",
        "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/9768.jpg"
      }
    ]
    var nutritions = JSON.parse(JSON.stringify(nutritionsArray))
    
    const [defaultDetails,setDefaultDetails]=useState(nutritions.length > 0 ? (nutritions[0].name): null)
   
    const truncateDescription = (description) => {
      const words = description.split(' ');
      const truncated = words.slice(0, 20).join(' '); 
      return `${truncated}...`;
    }; 
    useEffect(()=>{
      setDefaultDetails(nutritions[0].name)
    },[nutritions])
    
  return (
    <div className='mb-5'>
      <div><Navbar/></div>
      <div className='row mb-2'>
        <div className='col-md-1'></div>
        <div className='col-md-4 text-center' style={{ backgroundColor:"#F5F5F5"}}>
        <ul >
          {nutritions.length && nutritions.map((dish,index)=>(                
              <li key={index} style={{ listStyle:"none"}}>
              <div>
              <Link to={`/nutritions/single-details/${dish.name}`}
              state={{ dish: dish }}><h4>{dish.name}</h4></Link>
              <img src={dish.thumbnail_url} alt="" width="350" height="300" style={{ borderRadius: '10px'}} />
            <p className='mt-2'>({truncateDescription(dish.description)})</p>
              </div><hr/></li>                            
          ))}            
        </ul> 
        </div>
   
        <div className='col-md-7 px-5 text-center' style={{ backgroundColor:"#F0F0F0",position:'fixed',right:0,top:60,bottom:10 }}>        
        <Routes>    
        
         <Route path='/' element={<Navigate to={`/nutritions/single-details/${encodeURIComponent(defaultDetails)}`} />} />
        <Route path='/single-details/:name' element={<SingleDetails />} />        
        </Routes>
        </div>    
        {/* <div className='col-md-1'> far right</div>    */}
      </div>   
      <div><Footer/></div>
    </div>
  )
}

export default Nutritions
