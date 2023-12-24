import React, { useState, useEffect,useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../css/home.css";
import Papa from "papaparse";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [isActive, setIsActive] = useState(null)
  useEffect(() => {
    const fetchQuotes = async () => {
      const result = await fetch("/assets/quotes.json");
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
      const dataRawJson = await result.json();
      setQuotes(dataRawJson);
    };
    fetchQuotes();
  }, {});

  const handleToggle = (index)=>{
    setIsActive((prevState)=> (prevState ===index ? null : index))
  }
  useEffect(() => {
    const fetchData = async () => {
      const csvFilePath = "/assets/users.csv";
      try {
        const response = await fetch(csvFilePath);
        const text = await response.text();

        Papa.parse(text, {
          header: true,
          complete: (result) => {           
            setUsers(result.data);
          },
          error: (error) => {
            console.error("CSV parsing error:", error.message);
          },
        });
      } catch (error) {
        console.error("Error fetching CSV file:", error.message);
      }
    };
    fetchData();
  }, []);
  const faqs = [
    {
      title: "Why is it important to work out daily?",
      content:
        "Well. Health is wealth. Regular exercise offers numerous health benefits, including improved cardiovascular health, weight management, increased energy levels, and enhanced mood. You are depositing capitals into your bank account. You are also depositing health into your whole self. Good health will serve wealth. Both are equally important.",
    },
    {
      title: "What should I eat before and after my daily workout?",
      content:
        "Eating a balanced meal or snack with a combination of carbohydrates and protein before a workout can provide energy. Afterward, refuel with a mix of protein and carbohydrates to aid recovery.",
    },
    {
      title: "How can I prevent burnout from daily workouts?",
      content:
        "Take it easy and don't let burnout happen to your new routine. Your body needs time to adapt and digest the changes you make through exercise as well.",
    },
    {
      title: "How can I make working out a habit?",
      content:
        "Start with small, achievable goals. Schedule your workouts at the same time each day. Consistency is key to forming a habit. Just do it until you win.",
    },
    {
      title: "Is it okay to work out if I'm feeling sore?",
      content:
        "Mild soreness is normal, but listen to your body. Think about a ballet artist and look at their feet. Have they been suffered the pain ? Plenty.",
    },
    {
      title: "How do I overcome workout plateaus and boredom?",
      content:
        "Set new fitness goals and challenge yourself with different exercises.",
    },
  ];
  const imagesArray = [
    {
      name: "Biking",
      photo: "/assets/images/biking.jpg",
      benefit:
        "Simple. Regular biking strengthens the cardiovascular system, tones muscles, and promotes mental well-being, offering a joyful and effective fitness experience.",
    },
    {
      name: "Boxing",
      photo: "/assets/images/boxing.jpg",
      benefit:
        "Regular boxing workouts enhance cardiovascular health, boost endurance, and improve overall body strength, providing a powerful and energizing exercise routine.",
    },
    {
      name: "Practising Ballet",
      photo: "/assets/images/eight.jpg",
      benefit:
        "Regular ballet practice enhances strength, posture, and grace, contributing to a sculpted physique and overall physical elegance.",
    },
    {
      name: "Pushs-up",
      photo: "/assets/images/five.jpg",
      benefit:
        "Incorporating daily push-ups into your exercise routine enhances upper body strength, tones multiple muscle groups, and contributes to overall functional fitness.",
    },
    {
      name: "Toggling Ropes",
      photo: "/assets/images/four.jpg",
      benefit:
        "Engaging in daily exercises with dual ropes offers women an empowering fitness routine, promoting enhanced cardiovascular endurance and muscle toning. The rhythmic coordination required in dual rope workouts not only strengthens the body but also adds an enjoyable and dynamic element to their overall well-being.",
    },
    {
      name: "Toggling Ropes",
      photo: "/assets/images/roping.jpg",
      benefit:
        "Incorporating dual rope exercises into your daily routine provides a dynamic and effective way for men to enhance cardiovascular health and build full-body strength. The synchronized movements foster coordination and agility, contributing to a well-rounded and invigorating fitness experience.",
    },
    {
      name: "Jogging",
      photo: "/assets/images/seven.jpg",
      benefit:
        "Engaging in daily jogging provides consistent cardiovascular exercise, promoting heart health by strengthening the cardiovascular system and improving circulation. Regular jogging contributes to sustainable weight management, aiding in weight loss or maintenance, and enhances overall fitness and endurance over time. The daily routine of jogging also serves as an effective stress-reliever, releasing endorphins that elevate mood and contribute to mental well-being.",
    },
    {
      name: "Playing Kung-fu",
      photo: "/assets/images/six.jpg",
      benefit:
        "Practicing Kung Fu daily enhances physical fitness, fostering strength, flexibility, and coordination. Additionally, it cultivates mental discipline, promoting focus, resilience, and a harmonious balance between mind and body.",
    },

    {
      name: "Skating",
      photo: "/assets/images/skating.jpg",
      benefit:
        "Embrace the joy of daily skating as it not only improves balance, flexibility, and coordination but also infuses your routine with a burst of fun and excitement. Glide through each day with the invigorating benefits of skating, promoting both physical fitness and a cheerful mindset.",
    },
    {
      name: "Swimming",
      photo: "/assets/images/swimming.jpg",
      benefit:
        "Engaging in daily swimming not only promotes cardiovascular health, toning muscles and improving endurance but also provides a refreshing and stress-relieving experience, contributing to overall mental well-being and relaxation. Dive into a daily swim to nurture both physical fitness and mental rejuvenation.",
    },
    {
      name: "Running a Marathon",
      photo: "/assets/images/three.jpg",
      benefit:
        "Participating in daily marathon running not only enhances cardiovascular fitness and stamina but also fosters a sense of accomplishment, boosting confidence and mental resilience. Lace up your shoes for a daily marathon to experience the joy of achieving both physical and mental milestones.",
    },
    {
      name: "Heavy Weightlifting",
      photo: "/assets/images/two.jpg",
      benefit:
        "With each lift, you not only foster robust muscles but also cultivate a powerful mindset that conquers challenges inside and outside the gym.",
    },
    {
      name: "Using Dumpbells",
      photo: "/assets/images/workout.jpg",
      benefit:
        "Integrate dumbbell exercises into your daily routine to amplify your fitness journey. With these versatile tools, you'll not only sculpt your physique but also enhance your overall strength, boosting both physical and mental well-being.",
    },
  ];
  const [isJogging, setIsJogging] = useState(null)
  const handleBenefitClick =()=>{
    setIsJogging((prevState)=>(!prevState))
  }
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const playVideoAndAudio = () => {
    videoRef.current.play();
    audioRef.current.play();
    setIsJogging(true)
  };
  const stopVideoAndAudio = () => {
    videoRef.current.pause();
    audioRef.current.pause();
    setIsJogging(false); 
  };
  useEffect(() => {    
    videoRef.current.controls = false;
  }, []);
  
  return (
    <div>
      <Navbar />
      <div className="row mb-2">
        <img src="/assets/images/main.jpg" width="auto" height="600px" alt="" />
      </div>
      <div className="row mb-2">
        <h1
          className="text-center py-3"
          style={{ backgroundColor: "lightpink" }}
        >
          Most popular sports types
        </h1>
      </div>
      <div className="row mb-2 mx-5 text-center">
        {imagesArray.length &&
          imagesArray.map((el, index) => (
            <div className="col-md-4" key={index}>
              <h4>{el.name}</h4>
              <img
                src={el.photo}
                width={230}
                height={200}
                style={{ borderRadius: "50%" }}
                alt=""
              />
              <div className="mt-2">
                <p>
                  <a
                    className="btn btn-info"
                    data-bs-toggle="collapse"
                    href={`#collapseExample${index}`}
                    onClick={()=>handleBenefitClick(index)}
                    role="button"
                    aria-expanded="false"
                    aria-controls={`collapseExample${index}`}
                  >
                    Benefits
                  </a>
                </p>
                <div className="collapse" id={`collapseExample${index}`}>
                <div className="card card-body">
                    {<small>{el.benefit}</small>}
                  </div>                
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="row mb-2">
        <h1
          className="text-center py-3"
          style={{ backgroundColor: "lightblue" }}
        >
          Courage
        </h1>
      </div>
      <div>
        <div className="row mb-3">
          <div className="col-md-1"></div>
          <div className="col-md-5 px-5 py-5">
            <p style={{ fontSize: "27px", fontFamily: "fantasy" }}>
              Embracing the courage to engage in physical activities, like a
              simple daily walk or workout, has the power to boost your
              happiness. The energy you invest in movement not only enhances
              your physical well-being but also releases feel-good chemicals in
              your brain, fostering a positive mood. So, lace up those shoes,
              take a step, and discover the happiness that comes from the simple
              act of moving your body.
            </p>
          </div>
          <div className="col-md-5">
            <img
              src="/assets/images/ai-generated.png"
              alt=""
              width="600px"
              height="auto"
            />
          </div>
          <div className="col-md-1"></div>
        </div>
        <div className="row mb-2 quotes">
          <h1
            className="text-center py-3"
            style={{ backgroundColor: "lightgrey" }}
          >
            Quotes
          </h1>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-md-1"></div>
        {/* here quotes*/}
        {/* Quotes Carousel */}
        <div
          className="col-md-10"
          style={{ backgroundColor: "#FFA500", color: "black" }}
        >
          {quotes.length > 0 && (
            <div
              id="carouselExampleCaptions"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                {quotes.map((_, index) => (
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
              <div className="carousel-inner my-5 py-5">
                {quotes.map((quote, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={users[index % users.length]?.picture}
                      className="d-block max-width-100"
                      alt="Quote Slide"
                      style={{ borderRadius: "50%" }}
                    />
                    <div
                      className="carousel-caption d-none d-md-block"
                      style={{ color: "black" }}
                    >
                      <p style={{ fontFamily: "cursive", fontSize: "32px" }}>
                        {quote.content}
                      </p>
                      <h5>{quote.author}</h5>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          )}
        </div>
        {/* End Quotes Carousel */}
        <div className="col-md-1"></div>
      </div>
      <div className="row mb-2">
        <h1
          className="text-center py-3"
          style={{ backgroundColor: "lightpink" }}
        >
          Most Frequently Asked Questions
        </h1>     
      </div>
      <div className="row">
          {/* loop here */}      
      <div className="row ml-5" style={{ margin:"40px 100px 60px 100px" }}>           
        {faqs.length > 0 &&
          faqs.map((item, index) => (
            <div className="col-md-5">
              <div className="accordion" id={`accordionExample${index}`}>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                    onClick={()=>handleToggle(index)}
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`collapseOne${index}`}
                      aria-expanded="true"
                      aria-controls={`collapseOne${index}`}
                    >
                      {item.title}
                    </button>
                  </h2>
                  <div
                    id={`collapseOne${index}`}
                    className={`accordion-collapse collapse ${isActive===index ? 'show' : ''}`}
                    data-bs-parent={`#accordionExample${index}`}
                  >
                  {isActive===index &&  <div className="accordion-body">
                      <code>{item.content}</code>
                    </div>}                   
                  </div>
                </div>
              </div>
            </div>
          ))}             
      </div> 
      {/* <div className="col-md-1">right</div>  */}
      </div> 
      <div className="row mb-2">
        <h1
          className="text-center py-3"
          style={{ backgroundColor: "lightblue" }}
        >
          Just Do It.
        </h1>
      </div>
      <div className="row my-5">
        <div className="col-md-1"></div>
        <div className="col-md-10 text-center mb-5">         
          <video ref={videoRef} width="640" height="360" controls muted>
            <source src="/assets/video_2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>         
       <div style={{ display:"none" }}>
          <audio ref={audioRef} controls>
            <source src="/assets/audio_2.mp3" type="audio/mp3" />
            Your browser does not support the audio tag.
          </audio>
       </div>         
          <br />
      
      <button 
      className="mx-auto d-block" style={{ borderRadius:"10px" }}
      onClick={isJogging? stopVideoAndAudio: playVideoAndAudio}>{isJogging ? 'Press to Pause':'Press to Play'}</button>
        </div>
        {/* <div className="col-md-3 mx-5">
          <h3>I am the One.</h3>
          <p>Unknown</p>
        </div> */}
        <div className="col-md-1"></div>
      </div>   
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
