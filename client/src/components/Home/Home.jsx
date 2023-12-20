import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'


const Home = () => {
 
const imagesArray=[
  {
    name:"Biking",
    photo:"/assets/images/biking.jpg",
    benefit:""
  },
  {
    name:"Boxing",
    photo:"/assets/images/boxing.jpg",
    benefit:""
  },
  {
    name:"Playing Bale",
    photo:"/assets/images/eight.jpg",
    benefit:""
  },
  {
    name:"Pushing up",
    photo:"/assets/images/five.jpg",
    benefit:""
  },
  {
    name:"Woman Roping",
    photo:"/assets/images/four.jpg",
    benefit:""
  },
  {
    name:"Man Roping",
    photo:"/assets/images/roping.jpg",
    benefit:""
  },
  {
    name:"Jogging",
    photo:"/assets/images/seven.jpg",
    benefit:"Engaging in daily jogging provides consistent cardiovascular exercise, promoting heart health by strengthening the cardiovascular system and improving circulation. Regular jogging contributes to sustainable weight management, aiding in weight loss or maintenance, and enhances overall fitness and endurance over time. The daily routine of jogging also serves as an effective stress-reliever, releasing endorphins that elevate mood and contribute to mental well-being."
  },
  {
    name:"Playing Kungfu",
    photo:"/assets/images/six.jpg",
    benefit:""
  },

  {
    name:"Skating",
    photo:"/assets/images/skating.jpg",
    benefit:""
  },
  {
    name:"Swimming",
    photo:"/assets/images/swimming.jpg",
    benefit:""
  },
  {
    name:"Running Marathon",
    photo:"/assets/images/three.jpg",
    benefit:""
  },
  {
    name:"Heavy Weight-lifting",
    photo:"/assets/images/two.jpg",
    benefit:""
  },
  {
    name:"Dump-bell",
    photo:"/assets/images/workout.jpg",
    benefit:""
  },

]
  return (
    <div>
      <Navbar/>
      <div className='row mb-2'>
        <img src="/assets/images/main.jpg" alt=""/>
      </div>
      <div className='row mb-2'>
        <h1 className='text-center py-3' style={{ backgroundColor:"lightpink" }}>Most popular sport types</h1>
      </div>
      <div className='row mbx-2 mx-5 text-center' >         
          {imagesArray.length && imagesArray.map((el,index)=>(
            <div className='col-md-4' key={index}>
              <h4>{el.name}</h4>
              <img src={el.photo} width={200} height={180} style={{borderRadius:"50%"}} alt=""/>
              <div>
              <p>
                <a class="btn btn-info" data-bs-toggle="collapse" href={`#collapseExample${index}`} role="button" aria-expanded="false" aria-controls={`collapseExample${index}`}>
                  Benefits
                </a>  
              </p>
              <div class="collapse" id={`collapseExample${index}`}>
                <div class="card card-body">
                  {<small>{el.benefit}</small>}
                </div>
              </div>
              </div>             
            </div>
          ))}   
        
      </div>
      <div className='row mb-2'>
        <h1 className='text-center py-3' style={{ backgroundColor:"lightblue" }}>Most popular sport types</h1>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Home
