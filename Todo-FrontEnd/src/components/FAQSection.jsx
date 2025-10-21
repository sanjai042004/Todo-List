import { useState } from "react";

export const faqs = [
  { question: "How do I add a new task?", answer: "Click the 'Add Task' button and enter your task details." },
  { question: "Can I mark tasks as completed?", answer: "Yes! Click the checkbox next to a task to mark it as done." },
  { question: "Can I delete tasks?", answer: "Absolutely. Click the delete icon next to a task to remove it." },
  { question: "Is the app mobile-friendly?", answer: "Yes, our design is fully responsive and works on all devices." },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-800 w-full text-white py-12 sm:py-16 px-4 sm:px-6 text-center">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-10 sm:mb-12">
        Frequently Asked Questions
      </h2>

      <div className="max-w-5xl mx-auto flex flex-col gap-4 sm:gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="p-5 sm:p-6 bg-gray-900 rounded-lg shadow hover:shadow-lg transition-all duration-300"
          >
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full flex justify-between items-center text-left focus:outline-none"
            >
              <h3 className="text-lg sm:text-xl font-semibold">
                {index + 1}. {faq.question}
              </h3>
              <span className="text-2xl sm:text-3xl font-bold cursor-pointer select-none">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <p className="text-gray-300 text-sm sm:text-base">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
