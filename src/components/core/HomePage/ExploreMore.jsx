import React from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText'
import { useState } from 'react'
import CourseCard  from './CourseCard'
const tabsName = [
   "Free",
   "New to Coding",
   "Most Popular",
   "Skill Paths",
   "Career Paths",
]

const ExploreMore = () => {

   const [currentTab , setCurrentTab] = useState(tabsName[0]);
   const [courses , setCourses] = useState(HomePageExplore[0].courses);
   const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

   const setMyCards = (value)=>{
      setCurrentTab(value);
      const result = HomePageExplore.filter((course)=> course.tag === value)
      setCurrentCard(result[0].courses[0].heading)
      setCourses(result[0].courses);

   }
  return (
    <div className='relative'>
      <div className='text-4xl font-semibold text-center'>
         Unlock the
         <HighlightText text={"Power of COde"}/>
      </div>

      <p className='text-center text-richblack-300 text-sm text-[16px] mt-3'>
         Learn to build anything you can <HighlightText text={"Imagine"}/>
      </p>

      <div className='mt-5 flex flex-row rounded-full bg-richblack-800 mb-5 border-richblack-100 px-1 py-1'>
         {
            tabsName.map((element , index)=>{
               return(
                  <div
                     key={index}
                     className={`text-[16px] flex flex-row items-center gap-2
                         ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium"
                           :"text-richblack-200"}
                           rounded-full transition-all duration-200 cursor-pointer
                           hover:bg-richblack-900 hover:text-richblack-50 px-7 py-2`}
                           onClick={()=> setMyCards(element)}
                  >
                     {element}
                  </div>
               )
            })
         }
      </div>

      <div className='lg:h-[200px]'></div>

      {/* courses ke cards' */}

      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-10 lg:px-0 px-3">
         {
            courses.map((element,index)=>{
               return(
                  <CourseCard
                     key={index}
                     cardData={element}
                     currentCard={currentCard}
                     setCurrentCard = {setCurrentCard}
                  />
               )
            })
         }
      </div>
    </div>
  )
}

export default ExploreMore
