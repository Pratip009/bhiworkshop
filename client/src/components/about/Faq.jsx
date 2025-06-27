import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const faqData = [
  
  {
    question: "Where is the school located?",
    answer: "910 Bergen Ave, Floor 3, Jersey City, NJ 07306",
  },
  {
    question: "Do I need a high school diploma to enroll?",
    answer: `Yes — students must have a high school diploma or GED.

We offer a GED course that can be taken alongside the cosmetology program for eligible students.`,
  },
  {
    question: "When can I start?",
    answer: `New classes begin on the first Monday of every month.

Students are expected to enroll at least two weeks in advance of their desired start date to complete orientation and required documentation.`,
  },
  {
    question: "Is the program in-person or online?",
    answer: `We offer both:

- Hybrid format (online theory + in-person hands-on training)
- Fully online theory-based training (practical components must still be completed in person to meet state board requirements)

We are Jersey City’s only hybrid cosmetology school.`,
  },
  {
    question: "How long are the programs?",
    answer: `Based on NJ State Board standards:

- Cosmetology & Hairstyling: 1,200 hours
- Nail Technology: 300 hours

Program duration may vary based on your chosen schedule (full-time or part-time).`,
  },
  {
    question: "What’s included in the tuition?",
    answer: `- Full cosmetology or nail kit
- Uniform
- Books and learning materials
- Laptop
- Access to our online learning platform
- State Board exam prep`,
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes! We offer flexible installment plans to make tuition more manageable and accessible.",
  },
  {
    question: "What class schedules are available?",
    answer: "We offer both day and evening classes to accommodate your availability.\n\n[Ask our admissions team for the current schedule.]",
  },
  {
    question: "Do students get hands-on experience?",
    answer: "Yes — students practice on real clients in our student salon/clinic under instructor supervision. This hands-on experience is required by the NJ State Board.",
  },
  {
    question: "Will I be licensed after completing the course?",
    answer: "Yes. Once you complete the required hours and pass the New Jersey State Board Exam, you’ll be eligible for professional licensure.",
  },
  {
    question: "Do you help students find jobs after graduation?",
    answer: `Yes! All graduates receive lifetime alumni support, including:

- Job placement assistance
- Resume and interview support
- Ongoing career coaching

You’re always welcome to come back for help — even years after graduation.`,
  },
  {
    question: "What is the minimum age to apply?",
    answer: "You must be at least 17 years old to enroll in a New Jersey State Board-approved cosmetology program.",
  },
  {
    question: "Can I visit the school before enrolling?",
    answer: "Yes! Walk-in visits are welcome.\n\nTour our campus, meet our staff, ask questions, and even enroll on the spot — no appointment needed.",
  },
  {
    question: "Are there any school policies I should know about?",
    answer: `Yes. As a licensed institution, we follow all NJ State Board rules, including:

- Mandatory attendance and time tracking
- Uniform dress code during class and salon work
- Professional conduct expectations

Students receive a full policy handbook at orientation.`,
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border rounded-xl shadow-sm overflow-hidden">
            <button
              className="w-full text-left px-5 py-4 flex justify-between items-center"
              onClick={() => toggle(index)}
            >
              <span className="font-medium text-lg">{faq.question}</span>
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="px-5 pb-4 text-gray-700 overflow-hidden"
                >
                  <div className="whitespace-pre-wrap">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
