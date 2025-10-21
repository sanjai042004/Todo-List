import { Navbar } from "../components/Navbar";
import { TiTickOutline } from "react-icons/ti";
import { motion } from "framer-motion";
import task from "../assets/task.jpeg";
import organize from "../assets/organized.jpeg";
import productivity from "../assets/productivity.jpeg";
import time from "../assets/time.jpeg";
import progress from "../assets/progress.jpeg";
import { faqs, FAQSection } from "../components/FAQSection";
import { Footer } from "../components/Footer";

const whyChoose = [
  {
    img: organize,
    title: "Stay Organized",
    desc: "Manage all your tasks easily in one place and stay on top of your goals.",
  },
  {
    img: productivity,
    title: "Boost Productivity",
    desc: "Focus better and get more done with a simple, distraction-free layout.",
  },
  {
    img: time,
    title: "Time Management",
    desc: "Plan your day, prioritize tasks, and meet your deadlines efficiently.",
  },
  {
    img: progress,
    title: "Simple & Beautiful",
    desc: "Enjoy a clean, responsive, and visually engaging experience anywhere.",
  },
];

// Framer Motion Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
};

export const LandingPage = () => {
  return (
    <div
      className="flex flex-col font-serif bg-blue-50 shadow-lg min-h-[80vh] sm:min-h-[90vh] md:min-h-screen"
      style={{ minHeight: "100dvh" }} // ensures mobile viewport accounts for browser UI
    >
      <Navbar />

      {/* Main Section */}
      <main className="grid sm:grid-cols-1 md:grid-cols-2 items-center px-4 sm:px-6 md:px-10 py-12 sm:py-16 gap-8 max-w-7xl mx-auto">
        {/* Left Side - Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInLeft}
          className="flex flex-col justify-center items-start gap-6 sm:gap-8"
        >
          <h3 className="flex items-center gap-2 w-max bg-white border border-gray-200 px-3 py-1 rounded-2xl text-gray-700 text-sm sm:text-sm">
            <TiTickOutline className="text-purple-600 size-6" />
            Organize your life effortlessly
          </h3>

          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold text-gray-800 leading-snug sm:leading-tight md:leading-tight">
            Your tasks, <br />
            <span className="text-purple-600">Simplified</span>
          </h1>

          <p className="text-gray-500 max-w-xl text-base sm:text-lg">
            Stay organized, focused, and productive with our intuitive To-Do
            List app. Manage your tasks seamlessly and achieve your goals
            faster.
          </p>

          <button className="w-50 sm:w-40 md:w-40 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg text-base sm:text-lg hover:from-purple-600 hover:to-pink-600 shadow-md mt-5 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all">
            Get Started
          </button>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          className="flex justify-center"
        >
          <img
            src={task}
            alt="Illustration showing organized task management"
            className="rounded-lg shadow-md max-w-full hidden md:block h-auto"
            loading="lazy"
          />
        </motion.div>
      </main>

      {/* Why Choose Section */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 text-center">
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-semibold mb-12 text-gray-800"
        >
          Why Choose <span className="text-purple-600">TaskFlow?</span>
        </motion.h3>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {whyChoose.map((card, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              custom={index * 0.1}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-between w-full bg-white rounded-xl shadow-sm hover:shadow-lg transition-all"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-55 rounded mb-4"
                loading="lazy"
              />
              <h4 className="text-xl font-semibold mb-2 text-purple-600">
                {card.title}
              </h4>
              <p className="text-gray-600 text-sm p-4">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* Footer */}
      <Footer />
    </div>
  );
};
