// FAQAccordion.jsx
import React, { useState } from 'react';

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "How long does a custom PC build take?",
      answer: "Standard builds typically take 3-5 business days for assembly and testing. Complex water-cooled systems or specialty builds may take 7-10 days. We'll provide a detailed timeline after discussing your specific requirements."
    },
    {
      question: "Do you offer warranty on custom builds?",
      answer: "Yes! We provide a comprehensive 3-year labor warranty on all builds, plus the manufacturer warranties on individual components (typically 2-5 years). Our warranty covers assembly, testing, and ongoing support."
    },
    {
      question: "Can I upgrade my PC later?",
      answer: "Absolutely. We design all our systems with future upgrades in mind. We'll discuss your upgrade path during the consultation and ensure your build has room for additional RAM, storage, or GPU upgrades down the line."
    },
    {
      question: "What if a component fails after building?",
      answer: "We handle all component failures during the warranty period. Simply contact our support team, and we'll diagnose the issue, process RMA with manufacturers, and replace the component—usually within 3-5 business days."
    },
    {
      question: "Do you help with part selection for my budget?",
      answer: "Yes, this is our specialty! We'll work within your budget to maximize performance, focusing on the components that matter most for your specific use case (gaming, content creation, professional work, etc.)."
    },
    {
      question: "How do you ensure component compatibility?",
      answer: "We use advanced compatibility checking software combined with manual verification by our experienced builders. Every component is physically tested together before final assembly to ensure perfect compatibility."
    },
    {
      question: "What software comes pre-installed?",
      answer: "We install your chosen OS, all necessary drivers, and essential utilities. We can also install specific software you need. No bloatware—just a clean, optimized system ready for your use."
    },
    {
      question: "Do you provide build progress updates?",
      answer: "Yes! We send photo updates at key stages of the build process—component arrival, assembly, cable management, and final testing. You'll see exactly how your system is coming together."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about our custom PC building process
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={activeIndex === index}
              onToggle={() => toggleAccordion(index)}
              index={index}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 border border-gray-600 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-4">
              Our PC building experts are here to help you build the perfect system.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              Contact Our Experts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual FAQ Item Component with Dark Theme Animations
const FAQItem = ({ question, answer, isOpen, onToggle, index }) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-lg border border-gray-600 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-500">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-200 pr-4">
            {question}
          </h3>
          <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <svg 
              className="w-6 h-6 text-blue-400 flex-shrink-0 group-hover:text-blue-300 transition-colors duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>
      
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-5">
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4"></div>
          <p className="text-gray-300 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;