import React from "react";
import { useState, useEffect, useRef} from "react"
import "../style/AboutUs.css"
import { ChevronDown } from "lucide-react"
import AboutBackground from '../assets/background-landing-baru.jpg'
import { Link } from "react-router-dom";
import GearIcon from '../assets/gearicon.png'
import AboutFooter from "@/pages/Footer";
import Navbar from "./Navbar";


const AboutUs = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqItems = [
    {
      question: "What is smart contract?",
      answer:
        "A smart contract is a self-executing contract with the terms of the agreement directly written into code. It automatically enforces and executes the terms when predetermined conditions are met, without the need for intermediaries.",
    },
    {
      question: "How our bidding works?",
      answer:
        "Our bidding system uses blockchain technology to ensure transparency and security. When you place a bid, it's recorded on the blockchain and cannot be altered. The highest bid automatically wins when the auction ends, and payment is processed securely through smart contracts.",
    },
    {
      question: "How blockchain works?",
      answer:
        "Blockchain is a distributed ledger technology that records transactions across multiple computers. Each block contains a number of transactions, and once completed, it's added to the chain of previous blocks, creating an immutable record that cannot be altered without consensus from the network.",
    },
    {
      question: "What is NFT?",
      answer:
        "NFT stands for Non-Fungible Token. It's a digital asset that represents ownership of a unique item or piece of content on the blockchain. Unlike cryptocurrencies, NFTs are not interchangeable, making them ideal for representing ownership of unique items like luxury goods.",
    },
    {
      question: "How to use my crypto?",
      answer:
        "To use your cryptocurrency on our platform, you'll need to connect your wallet (like MetaMask) to our site. Once connected, you can place bids, make purchases, and receive payments directly through your wallet. We support major cryptocurrencies including Ethereum and selected ERC-20 tokens.",
    },
  ]
  return (
    <div className="About-Wrapper">
      
      <div className="About-Content">
      <div className="Header-Collection">
        <Navbar/>
      <div className="About-Image">
        {/* <img src={AboutBackground} alt="" /> */}
        <h1 className="about-title">About</h1>
      </div>
      </div>
      <section className="benefits-section">
        <h2 className="benefits-title">Benefits</h2>
        <div className="benefits-container">
          <div className="benefits-item-1">
            <img src={GearIcon} alt="" />
            <h3 className="benefit-title">USING SMART CONTRACTS</h3>
            <p className="benefit-text">
                Smart contracts are programs in a blockchain that execute when predetermined conditions are met. They
                automate transactions without intermediaries, reducing costs and increasing transparency.
            </p>
          </div>
          <div className="benefits-item-2">
            <img src={GearIcon} alt="" />
            <h3 className="benefit-title">USING SMART CONTRACTS</h3>
            <p className="benefit-text">
                Smart contracts are programs in a blockchain that execute when predetermined conditions are met. They
                automate transactions without intermediaries, reducing costs and increasing transparency.
            </p>
          </div>
          <div className="benefits-item-3">
            <img src={GearIcon} alt="" />
            <h3 className="benefit-title">USING SMART CONTRACTS</h3>
            <p className="benefit-text">
                Smart contracts are programs in a blockchain that execute when predetermined conditions are met. They
                automate transactions without intermediaries, reducing costs and increasing transparency.
            </p>
          </div>
        </div>
      </section>
      <section className="Questioner">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-container">
            {faqItems.map((item, index) => (
              <div key={index} className={`faq-item ${openFaq === index ? "open" : ""}`}>
                <button className="faq-question" onClick={() => toggleFaq(index)} aria-expanded={openFaq === index}>
                  {item.question}
                  <ChevronDown className={`faq-icon ${openFaq === index ? "rotate" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
      </section>
      <AboutFooter/>
    </div>
  </div>
  );
};

export default AboutUs;