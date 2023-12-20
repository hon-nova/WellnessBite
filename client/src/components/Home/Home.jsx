import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import '../../css/home.css'
import Papa from 'papaparse'


const Home = () => {

  const[users,setUsers]=useState([])

  useEffect(() => {
    const fetchData = async () => {
      const csvFilePath = '/assets/users.csv';

      try {
        const response = await fetch(csvFilePath);
        const text = await response.text();

        Papa.parse(text, {
          header: true,
          complete: (result) => {
            // 'result.data' contains the parsed data
          //   console.log("data inside fetchData")
          //   console.log(result.data);
            setUsers(result.data)
          },
          error: (error) => {
            console.error('CSV parsing error:', error.message);
          },
        });
      } catch (error) {
        console.error('Error fetching CSV file:', error.message);
      }
    };
    fetchData();
    
  }, []);

 const quotes=[
  {
     "content":"Wellness is the complete integration of body, mind, and spirit – the realization that everything we do, think, feel, and believe has an effect on our state of well-being.",
     "author":"Greg Anderson"
  },
  {
     "content":"The body is like a piano, and happiness is like music. It is needful to have the instrument in good order.",
     "author":"Henry Ward Beecher"
  }]
const imagesArray=[
  {
    name:"Biking",
    photo:"/assets/images/biking.jpg",
    benefit:"Simple. Regular biking strengthens the cardiovascular system, tones muscles, and promotes mental well-being, offering a joyful and effective fitness experience."
  },
  {
    name:"Boxing",
    photo:"/assets/images/boxing.jpg",
    benefit:"Regular boxing workouts enhance cardiovascular health, boost endurance, and improve overall body strength, providing a powerful and energizing exercise routine."
  },
  {
    name:"Practising Balle",
    photo:"/assets/images/eight.jpg",
    benefit:"Regular ballet practice enhances strength, posture, and grace, contributing to a sculpted physique and overall physical elegance."
  },
  {
    name:"Pushing up",
    photo:"/assets/images/five.jpg",
    benefit:"Incorporating daily push-ups into your exercise routine enhances upper body strength, tones multiple muscle groups, and contributes to overall functional fitness."
  },
  {
    name:"Woman Using Roping",
    photo:"/assets/images/four.jpg",
    benefit:"Engaging in daily exercises with dual ropes offers women an empowering fitness routine, promoting enhanced cardiovascular endurance and muscle toning. The rhythmic coordination required in dual rope workouts not only strengthens the body but also adds an enjoyable and dynamic element to their overall well-being."
  },
  {
    name:"Using Ropes",
    photo:"/assets/images/roping.jpg",
    benefit:"Incorporating dual rope exercises into your daily routine provides a dynamic and effective way for men to enhance cardiovascular health and build full-body strength. The synchronized movements foster coordination and agility, contributing to a well-rounded and invigorating fitness experience."
  },
  {
    name:"Jogging",
    photo:"/assets/images/seven.jpg",
    benefit:"Engaging in daily jogging provides consistent cardiovascular exercise, promoting heart health by strengthening the cardiovascular system and improving circulation. Regular jogging contributes to sustainable weight management, aiding in weight loss or maintenance, and enhances overall fitness and endurance over time. The daily routine of jogging also serves as an effective stress-reliever, releasing endorphins that elevate mood and contribute to mental well-being."
  },
  {
    name:"Playing Kungfu",
    photo:"/assets/images/six.jpg",
    benefit:"Practicing Kung Fu daily enhances physical fitness, fostering strength, flexibility, and coordination. Additionally, it cultivates mental discipline, promoting focus, resilience, and a harmonious balance between mind and body."
  },

  {
    name:"Skating",
    photo:"/assets/images/skating.jpg",
    benefit:"Embrace the joy of daily skating as it not only improves balance, flexibility, and coordination but also infuses your routine with a burst of fun and excitement. Glide through each day with the invigorating benefits of skating, promoting both physical fitness and a cheerful mindset."
  },
  {
    name:"Swimming",
    photo:"/assets/images/swimming.jpg",
    benefit:"Engaging in daily swimming not only promotes cardiovascular health, toning muscles and improving endurance but also provides a refreshing and stress-relieving experience, contributing to overall mental well-being and relaxation. Dive into a daily swim to nurture both physical fitness and mental rejuvenation."
  },
  {
    name:"Running Marathon",
    photo:"/assets/images/three.jpg",
    benefit:"Participating in daily marathon running not only enhances cardiovascular fitness and stamina but also fosters a sense of accomplishment, boosting confidence and mental resilience. Lace up your shoes for a daily marathon to experience the joy of achieving both physical and mental milestones."
  },
  {
    name:"Heavy Weight-lifting",
    photo:"/assets/images/two.jpg",
    benefit:"With each lift, you not only foster robust muscles but also cultivate a powerful mindset that conquers challenges inside and outside the gym."
  },
  {
    name:"Dump-bell",
    photo:"/assets/images/workout.jpg",
    benefit:"Integrate dumbbell exercises into your daily routine to amplify your fitness journey. With these versatile tools, you'll not only sculpt your physique but also enhance your overall strength, boosting both physical and mental well-being."
  },

]
  return (
    <div>
      <Navbar/>
      <div className='row mb-2'>
        <img src="/assets/images/main.jpg" alt=""/>
      </div>
      <div className='row mb-2'>
        <h1 className='text-center py-3' style={{ backgroundColor:"lightpink" }}>Most popular sports types</h1>
      </div>
      <div className='row mb-2 mx-5 text-center' >         
          {imagesArray.length && imagesArray.map((el,index)=>(
            <div className='col-md-4' key={index}>
              <h4>{el.name}</h4>
              <img src={el.photo} width={200} height={180} style={{borderRadius:"50%"}} alt=""/>
              <div className='mt-2'>
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
        <h1 className='text-center py-3' style={{ backgroundColor:"lightblue" }}>Courage</h1></div>
      <div>
      <div className='row mb-3'>
        <div className='col-md-1'></div>
        <div className='col-md-5 px-5 py-5'>
        <p style={{ fontSize:"27px",fontFamily:"fantasy" }}>
        Embracing the courage to engage in physical activities, like a simple daily walk or workout, has the power to boost your happiness. The energy you invest in movement not only enhances your physical well-being but also releases feel-good chemicals in your brain, fostering a positive mood. So, lace up those shoes, take a step, and discover the happiness that comes from the simple act of moving your body.
        </p>
        
        </div>
        <div className='col-md-5'>
        <img src="/assets/images/ai-generated.png" alt="" width="600px" height="auto"/>
        </div>
        <div className='col-md-1'></div>
      </div>
      <div className='row mb-2 quotes'>
        <h1 className='text-center py-3' style={{ backgroundColor:"lightgrey" }}>Quotes</h1></div>       
      </div>
      <div className='row mb-2'>
        <div className='col-md-1'>far left</div>


        {/* here quotes*/}
       {/* Quotes Carousel */}
       <div className="col">
          {quotes.length > 0 && (
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                {quotes.map((quote, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to={index}
                    className={index === 0 ? "active" : ""}
                    aria-current={index === 0}
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                ))}
              </div>
              <div className="carousel-inner">
                {quotes.map((quote, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>        

                    {/* {users.map((user, index2) => (
            <img key={index2} src={user.picture} 
            className="d-block w-100" 
            alt={`User ${index2 + 1}`} style={{ width: "50px", height: "50px", margin: "5px" }} />
          ))} */}
                    <div className="carousel-caption d-none d-md-block">
                      <h5>{quote.content}</h5>
                      <p>{quote.author}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          )}
        </div>
        {/* End Quotes Carousel */}

        {/* User Images */}
        {/* <div className="col-md-1">
          {users.map((user, index) => (
            <img key={index} src={user.picture} alt={`User ${index + 1}`} style={{ width: "50px", height: "50px", margin: "5px" }} />
          ))}
        </div> */}
        {/* End User Images */}
        {/* end here */}
       
        <div className='col-md-1'>far right</div>
      </div>//end row
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Home
