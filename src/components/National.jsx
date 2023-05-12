import React, { useRef, useState } from "react";
import Mcdonalds from "../assets/restaurants/mcdonalds.jpeg";
import Tacobell from "../assets/restaurants/tacobell.jpeg";
import Starbucks from "../assets/restaurants/starbucks.jpeg";
import Chickfila from "../assets/restaurants/chickfila.png";
import Wendys from "../assets/restaurants/wendys.jpeg";
import Burgerking from "../assets/restaurants/burgerking.jpeg";
import Jackinthebox from "../assets/restaurants/jackinthebox.jpeg";
import Panerabread from "../assets/restaurants/panerabread.jpeg";
import Meltdown from "../assets/restaurants/themeltdown.jpeg";
import DashIcon from "../assets/restaurants/doordashicon.png";
import { TbHeart } from "react-icons/Tb";
import { AiOutlineStar } from "react-icons/Ai";
import { TbChevronLeft, TbChevronRight } from "react-icons/Tb";

// INSTADASH

const Recomendation = () => {
  const ref = useRef(null);
  const [disableButton, setDisableButton] = useState("left");

  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Starbucks",
      src: Starbucks,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 2,
      name: "Mcdonald's",
      src: Mcdonalds,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 3,
      name: "Taco Bell",
      src: Tacobell,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 4,
      name: "Chick-fil-A",
      src: Chickfila,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 5,
      name: "Wendy's",
      src: Wendys,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 6,
      name: "Burger King",
      src: Burgerking,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 7,
      name: "Jack in the Box",
      src: Jackinthebox,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 8,
      name: "Panera Bread",
      src: Panerabread,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 9,
      name: "The Meltdown",
      src: Meltdown,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
  ]);

  const handleSave = (id) => {
    console.log(id);

    const newState = favorites.map((favorite) => {
      if (favorite.id === id) {
        favorite.save ? (favorite.save = false) : (favorite.save = true);
      }
      return favorite;
    });
    setFavorites(newState);
  };

  function scrollTabbar(element, left) {
    element.scrollTo({
      left,
    });
  }
  function adjustView(position) {
    console.log("adjust view", ref.current.scrollWidth);
    if (position === "left") {
      scrollTabbar(ref?.current, ref.current.scrollLeft - 1224);
    } else {
      scrollTabbar(ref?.current, ref.current.scrollLeft + 1224);
    }
  }
  const handleScroll = () => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      switch (scrollLeft + clientWidth) {
        case clientWidth:
          setDisableButton("left");
          break;
        case scrollWidth:
          setDisableButton("right");
          break;
        default:
          setDisableButton("none");
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="top-[12rem] pr-[62rem] justify-center flex mx-auto">
        <h2 className="font-semibold text-2xl truncate">National Favorites</h2>
      </div>
      <div className="flex flex-row justify-center space-x-3 space-y-3">
        <div
          className="flex flex-row w-[75.5rem] overscroll-x-contain overflow-x-scroll
            top-[9rem] container-snap scroll-smooth space-x-[1rem]"
          ref={ref}
          onScroll={handleScroll}
        >
          {favorites.map(
            ({ id, name, src, save, distance, time, fee, rate, reviews }) => (
              <div
                key={id}
                className="rounded-lg flex flex-col space-y-[-1rem]"
              >
                <div className="h-[14rem] w-[24.5rem]">
                  <img
                    alt=""
                    src={src}
                    className="rounded-md relative w-[30rem] h-[12rem]"
                  />
                </div>
                <div className="font-semibold relative flex flex-row pb-1">
                  {/* <img alt="" src={DashIcon} className="pt-1 w-6 h-5" /> */}
                  <div className="">{name}</div>
                  <button
                    className="absolute right-[.6rem] z-20"
                    onClick={async () => handleSave(id)}
                  >
                    <TbHeart size={26} className={save ? "fill-red-400" : ""} />
                  </button>
                </div>
                <div className="text-sm pt-[1rem] text-gray-500 relative flex flex-row">
                  {distance} • {time} • {fee}
                </div>
                <div className="text-sm pt-[1rem] text-gray-500 relative flex flex-row">
                  {rate}
                  <div className="pr-[.4rem]">
                    <AiOutlineStar className="top-[.2rem] relative fill-gray-500" />
                  </div>
                  {reviews}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="flex flex-row justify-center bottom-1">
        {disableButton !== "left" && (
          <div className="bottom-[2.2rem] ">
            <div
              className="rounded-full h-8 w-8 border-solid border-2
                  border-gray-100 bg-gray-300"
            >
              <button
                className="pl-[.1rem] pt-[.2rem]"
                onClick={() => adjustView("left")}
              >
                <TbChevronLeft size={23} />
              </button>
            </div>
          </div>
        )}
        {disableButton === "left" && (
          <div className="bottom-[2.2rem] f">
            <div
              className="rounded-full h-8 w-8 border-solid border-2
                  border-gray-100 bg-gray-100"
            >
              <button
                className="pl-[.1rem] pt-[.2rem]"
                onClick={() => adjustView("left")}
              >
                <TbChevronLeft size={23} className="text-gray-300" />
              </button>
            </div>
          </div>
        )}
        {disableButton !== "right" && (
          <div className="bottom-[2.2rem] ">
            <div
              className="rounded-full h-8 w-8 border-solid border-2
                  border-gray-100 bg-gray-300"
            >
              <button
                className="pl-[.2rem] pt-[.2rem]"
                onClick={() => adjustView("right")}
              >
                <TbChevronRight size={23} />
              </button>
            </div>
          </div>
        )}
        {disableButton === "right" && (
          <div className="bottom-[2.2rem] ">
            <div
              className="rounded-full h-8 w-8 border-solid border-2
                  border-gray-100 bg-gray-100"
            >
              <button
                className="pl-[.2rem] pt-[.2rem]"
                onClick={() => adjustView("right")}
              >
                <TbChevronRight size={23} className="text-gray-300" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recomendation;