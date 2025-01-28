import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDE_DURATION = 5000;
const PROGRESS_UPDATE_INTERVAL = 100;

export default function TestimonialCarousel({ projects }) {
  // Filter out projects with isFeature true, and limit to 3 items
  const featuredProjects = projects.filter(project => project.isFeature).slice(0, 3);
  console.log(featuredProjects);
  

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    let progressTimer;

    const startTimers = () => {
      setProgress(0);

      progressTimer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(progressTimer);
            return 100;
          }
          return (
            prevProgress + (PROGRESS_UPDATE_INTERVAL / SLIDE_DURATION) * 100
          );
        });
      }, PROGRESS_UPDATE_INTERVAL);

      timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProjects.length);
      }, SLIDE_DURATION);
    };

    startTimers();

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [currentIndex, featuredProjects.length]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-gray-100 rounded-3xl border border-gray-300 bg-card text-card-">
        <div className="grid md:grid-cols-2 gap-2 md:gap-6">
          <div className="space-y-4 p-4 pt-8 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="h-72 md:h-96 space-y-2"
              >
                <h3 className="text-2xl font-semibold">
                  {featuredProjects[currentIndex].title}
                </h3>
                <p className="text-gray-600 pb-4 md:pb-8">
                  "{featuredProjects[currentIndex].shortDescription}"
                </p>
                <a
                  className="flex items-center justify-center font-medium bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-950 space-x-2 group w-fit"
                  href={`/projects/${featuredProjects[currentIndex].slug}`}
                >
                  <span>Learn More</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    className="w-4 h-4 group-hover:-rotate-45 transition-all duration-100"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                  </svg>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="aspect-video md:aspect-square p-2">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={featuredProjects[currentIndex].image}
                alt={featuredProjects[currentIndex].title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="object-cover w-full h-full rounded-2xl"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4 md:w-3/4 m-auto mt-5">
        {featuredProjects
          .map((projects) => projects.projectType)
          .map((label, index) => (
            <div key={index} className="flex-1 space-y-2">
              <div className="h-1 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-blue-900 transition-all duration-100 ease-linear"
                  style={{
                    width: index === currentIndex ? `${progress}%` : "0%",
                  }}
                />
              </div>
              <span
                className={`flex items-center justify-center text-center text-sm transition-colors m-auto w-fit ${
                  index === currentIndex
                    ? "text-blue-900 font-medium"
                    : "text-gray-400 "
                }`}
              >
                {label}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
