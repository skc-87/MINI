import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PackageBanner from "../assets/Packages/PackagesBanner.png";
import PlaneBg from "../assets/Packages/PlaneBg.png";
import TipsAndArticles from "../Components/Packages/TipsAndArticles";
import { useState, useEffect } from "react";
import { getAllTours } from "../services/operations/tourAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import TourCard from "../Components/Home/TourCard";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
// import "./styles.css";

// import required modules
import {
  Pagination,
  Navigation,
  Autoplay,
  Mousewheel,
  Keyboard,
} from "swiper/modules"; // Correct import for Autoplay

const PackagesDetails = () => {
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [tours, setTours] = useState([]);

  const getTours = async () => {
    try {
      const res = await getAllTours();
      console.log("Tours at packages page -> ", res);
      setTours(res?.response);
      console.log("Usestate tours -> ", tours);
    } catch (e) {}
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getTours();
  }, []);

  return (
    <div className="bg-blue-100 min-h-screen p-4 text-white">
      <div className="w-full  md:h-[500px] lg:h-[600px] overflow-hidden mb-8">
        <img
          src="https://1.bp.blogspot.com/-3mUa4Z5ria0/ToRV3GwN0GI/AAAAAAAAAQ8/kA71S1kIesE/s1600/Taj%2bMahal.jpg"
          alt="Taj Mahal"
          className=" object-center object-fit w-full h-full"
        />
      </div>

      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
        Explore India
      </h1>

      {/* National TOUR */}
      <div className="flex flex-col gap-y-[2rem] mt-[5rem]  h-auto mx-auto mb-[3rem] ">
        <div className="flex flex-col gap-y-[2rem]">
          <p className="text-start text-3xl font-semibold mb-4 bg-blue-500 text-transparent bg-clip-text">
            National Tour
          </p>

          <div>
            {tours?.length ? (
              <Swiper
                spaceBetween={20}
                slidesPerView={3}
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: true,
                }}
                loop={true}
                className="h-[450px] "
              >
                {tours?.map((tour, index) => (
                  <div
                    key={index}
                    className="  shadow-2xl hover:scale-105 transition-all duration-300  py-[1rem] rounded-xl"
                  >
                    {tour.category == "National" && (
                      <SwiperSlide className=" ">
                        <TourCard tour={tour} />
                      </SwiperSlide>
                    )}
                  </div>
                ))}
              </Swiper>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>

      <Section
        title="Top Destinations"
        sliderSettings={sliderSettings}
        items={topDestinations}
        navigate={navigate}
      />
      <Section
        title="State-wise Packages"
        sliderSettings={sliderSettings}
        items={statePackages}
        navigate={navigate}
      />
      <Section
        title="Festival-wise Packages"
        sliderSettings={sliderSettings}
        items={festivalPackages}
        navigate={navigate}
      />

      {/* plane Img */}
      <div className="mt-[5rem] w-[100%]">
        <img
          src={PlaneBg}
          alt=""
          style={{ width: "100%", height: "50%", objectFit: "cover" }}
        />
      </div>

      {/* TIPS & ARICLE*/}
      <div className="mx-auto bg-blue-100 text-black">
        <div className="w-11/12 flex justify-between  items-center mx-auto pt-[3rem]">
          {/* Left side */}
          <div className="flex flex-col items-start w-[595px] gap-y-7">
            <p className="font-bold text-4xl text-center">Tips & Article</p>
            <p className="text-start text-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta,
              suscipit laborum autem fugiat ipsam et mollitia nesciunt
              accusamus! Ex asperiores quam amet consequuntur assumenda
              recusandae voluptatibus. Itaque labore deleniti beatae?
            </p>
          </div>

          {/* Right side */}
          <div className="flex items-center">
            <button className="bg-black text-white px-4 py-2 rounded-full hover:scale-95 transition-all duration-300 cursor-pointer">
              <p>Veiw More</p>
            </button>
          </div>
        </div>
      </div>

      <div className="pt-[5rem] bg-blue-100 pb-[5rem]">
        <TipsAndArticles />
      </div>
    </div>
  );
};

// Section Component with Gradient Text
const Section = ({ title, sliderSettings, items, navigate }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
      {title}
    </h2>
    <Slider {...sliderSettings}>
      {items.map((item, index) => (
        <div key={index} className="px-2 h-[30rem] ">
          <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-white p-[2px] rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out">
            <div className="h-[25rem] bg-white p-4 rounded-lg flex flex-col justify-between ">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded-md transition-transform duration-300 hover:scale-105"
              />
              <h3 className="text-lg font-semibold mt-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <div className="mt-4">
                <p className="text-lg font-bold text-green-600">
                  ₹{item.price}
                </p>
                <button
                  className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-300"
                  onClick={() => navigate(`/packages/booking/${item.price}`)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </div>
);

// Custom Next Arrow
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg"
      onClick={onClick}
    >
      ▶
    </div>
  );
}

// Custom Prev Arrow
function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg"
      onClick={onClick}
    >
      ◀
    </div>
  );
}

// Dummy Data for Cards with Prices
const topDestinations = [
  {
    title: "Taj Mahal, Agra",
    image:
      "https://1.bp.blogspot.com/-3mUa4Z5ria0/ToRV3GwN0GI/AAAAAAAAAQ8/kA71S1kIesE/s1600/Taj%2bMahal.jpg",
    description:
      "Iconic symbol of love and one of the Seven Wonders of the World.",
    price: "5000.00",
  },
  {
    title: "Jaipur, Rajasthan (The Pink City)",
    image:
      "https://images.pexels.com/photos/784879/pexels-photo-784879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "A vibrant city filled with history and royal heritage.",
    price: "4500.00",
  },
  {
    title: "Varanasi, Uttar Pradesh",
    image:
      "https://www.tusktravel.com/blog/wp-content/uploads/2021/03/Things-to-do-in-ancient-place-of-world-Varanasi.jpg",
    description: "One of the oldest cities in the world, deeply spiritual.",
    price: "4000.00",
  },
  {
    title: "Kerala (God’s Own Country)",
    image:
      "https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/kerala-famous.jpg",
    description: "Backwaters, lush greenery, and serene beaches.",
    price: "6000.00",
  },
  {
    title: "Goa",
    image:
      "https://ds393qgzrxwzn.cloudfront.net/resize/m720x480/cat1/img/images/0/G2XCTDmY6m.jpg",
    description: "Beaches, nightlife, and Portuguese heritage.",
    price: "5500.00",
  },
  {
    title: "Leh-Ladakh, Jammu & Kashmir",
    image: "https://static.toiimg.com/photo/66122027.cms",
    description: "A haven for adventure lovers and nature enthusiasts.",
    price: "7000.00",
  },
  {
    title: "Rishikesh and Haridwar, Uttarakhand",
    image:
      "https://blog.weekendthrill.com/wp-content/uploads/2017/12/120717_0715_21Placestov6.jpg",
    description: "Known as the yoga capital of the world and spiritual hub.",
    price: "4800.00",
  },
  {
    title: "Andaman and Nicobar Islands",
    image:
      "https://greatindiantours.com/wp-content/uploads/2018/09/Andaman-islands.jpg",
    description: "Pristine beaches, coral reefs, and marine life.",
    price: "8500.00",
  },
  {
    title: "Udaipur, Rajasthan (The City of Lakes)",
    image:
      "https://seoimgak.mmtcdn.com/blog/sites/default/files/Udaipur-Hotels-Main-01.jpg",
    description: "A romantic city with beautiful lakes and palaces.",
    price: "4600.00",
  },
  {
    title: "Mysore, Karnataka",
    image:
      "https://www.mangalurutaxis.com/uploads/image/tour-packages-places/mysore-tour-packages/mysore-palace.jpg",
    description: "Known for its royal heritage and cultural richness.",
    price: "5000.00",
  },
];

const statePackages = [
  {
    title: "Rajasthan",
    image:
      "https://static.toiimg.com/photo/msid-97277718,width-96,height-65.cms",
    description:
      "Highlights: Jaipur, Udaipur, Jaisalmer, Jodhpur, Thar Desert, Ranthambore.",
    price: "5000.00",
  },
  {
    title: "Kerala",
    image:
      "https://www.bontravelindia.com/wp-content/uploads/2022/11/Munnar-Tourism-Kerala.jpg",
    description:
      "Highlights: Alleppey backwaters, Munnar tea gardens, Wayanad hills, Kochi beaches.",
    price: "6000.00",
  },
  {
    title: "Goa",
    image:
      "https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/10/18/16/goa-overview.jpg",
    description:
      "Highlights: Baga, Calangute beaches, Portuguese churches, Dudhsagar Falls, nightlife.",
    price: "5500.00",
  },
  {
    title: "Uttarakhand",
    image:
      "https://www.clubmahindra.com/blog/media/section_images/visit-in-u-b6fa5a61e8c38c7.jpg",
    description:
      "Highlights: Mussoorie, Rishikesh, Nainital, Jim Corbett Park, Valley of Flowers.",
    price: "4800.00",
  },
  {
    title: "Himachal Pradesh",
    image:
      "https://spiceholiday.in/wp-content/uploads/2023/09/Tour-of-Himachal-Pradesh.png",
    description:
      "Highlights: Manali, Shimla, Dharamshala, Kullu Valley, Spiti Valley.",
    price: "4700.00",
  },
  {
    title: "Tamil Nadu",
    image:
      "https://thumbs.dreamstime.com/b/photo-shot-sunrise-time-where-historical-buildings-mamallapuram-monuments-highlighted-mahabalipuram-123223294.jpg",
    description:
      "Highlights: Mahabalipuram, Madurai temples, Ooty, Pondicherry, Kanyakumari.",
    price: "5200.00",
  },
  {
    title: "Maharashtra",
    image:
      "https://im.whatshot.in/img/2019/Feb/gateway-of-india-4c-cropped-1549871731.jpg",
    description:
      "Highlights: Mumbai, Ajanta-Ellora Caves, Lonavala, Mahabaleshwar, Nashik vineyards.",
    price: "4900.00",
  },
  {
    title: "Karnataka",
    image: "https://www.indiaimagine.com/wp-content/uploads/2018/12/Mysore.jpg",
    description:
      "Highlights: Hampi, Mysore Palace, Coorg, Bangalore, Gokarna beaches.",
    price: "5300.00",
  },
  {
    title: "West Bengal",
    image:
      "https://th.bing.com/th/id/R.0b2a72bc3dd6c73bddca880b29148516?rik=4FVYc1crfk...",
    description:
      "Highlights: Kolkata, Darjeeling, Sundarbans, Toy Train, tea gardens.",
    price: "4700.00",
  },
];

const festivalPackages = [
  {
    title: "Diwali",
    description:
      "Festival of lights, celebrating the victory of good over evil.",
    image:
      "https://www.insightvacations.com/wp-content/uploads/2020/11/shutterstock_1536870122-1024x683.jpg",
    price: "5900",
  },
  {
    title: "Holi",
    description:
      "Colorful celebration of spring, love, and the triumph of good.",
    image: "https://www.gktoday.in/wp-content/uploads/2023/03/holi.jpg",
    price: "7900",
  },
  {
    title: "Durga Puja",
    description:
      "Hindu festival celebrating goddess Durga’s victory over demon Mahishasura.",
    image:
      "https://static.india.com/wp-content/uploads/2022/09/Durga-Puja-2022.jpg",
    price: "7800",
  },
  {
    title: "Navratri",
    description: "Nine-night festival dedicated to worship of goddess Durga.",
    image: "https://www.gosahin.com/go/p/e/1541272408_Garba-Dance2.jpg",
    price: "6290",
  },
  {
    title: "Eid al-Fitr",
    description: "Marks the end of Ramadan, a month of fasting.",
    image:
      "https://images.cnbctv18.com/wp-content/uploads/2019/06/NEW-1-Eid-prayer-in-progress-at-the17th-century-mosque-built-by-Mughal-Emperoe-Shahjahan.jpg",
    price: "8400",
  },
  {
    title: "Christmas",
    description: "Celebrates the birth of Jesus Christ with joy and gifts.",
    image:
      "https://www.goodfreephotos.com/albums/holidays/christmas/golden-tree-christmas-ornament.jpg",
    price: "9800",
  },
  {
    title: "Rann Utsav",
    description:
      "A vibrant festival celebrating the cultural heritage of Gujarat, held in the Rann of Kutch.",
    image: "https://www.tourmyindia.com/socialimg/kutch-rann-utsav-tour.jpg",
    price: "9900",
  },
  {
    title: "Ganesh Chaturthi",
    description:
      "Festival celebrating the birth of Lord Ganesha, with idol immersion.",
    image:
      "https://media-cdn.shreeganesh.com/wp-content/uploads/2022/06/ganesh-chaturthi1-1024x665.jpg",
    price: "5300",
  },
  {
    title: "Onam",
    description:
      "Harvest festival celebrated in Kerala, honoring King Mahabali.",
    image:
      "https://www.india.com/wp-content/uploads/2018/08/onam-celebrations.jpg",
    price: "3900",
  },
  {
    title: "Makar Sankranti",
    description:
      "Celebrated with kite flying and harvest festivals across India.",
    image:
      "https://imgeng.jagran.com/images/2023/jan/makarsankrantikites1673591360257.jpg",
    price: "4800",
  },
];

export default PackagesDetails;
