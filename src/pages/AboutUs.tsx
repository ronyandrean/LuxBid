import React from "react";
import { useState, useEffect, useRef} from "react"
import "../style/AboutUs.css"
import { ChevronDown } from "lucide-react"
import AboutBackground from '../assets/background-landing-baru.jpg'
import { Link } from "react-router-dom";
import GearIcon from '../assets/gearicon.png'
import AboutFooter from "@/pages/Footer";
import Navbar from "./Navbar";
import MiddleImage from '../assets/chanel.png'
import logo from '../assets/LXRe.png'


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
        {/* <h1 className="about-title">About</h1> */}
      </div>
      </div>

      <section className="MiddlePart">
          <div className="Middle-left">
              <img src={MiddleImage} alt="" />
          </div>
          <div className="Middle-Right">
              {/* <h2 className="About-Us-Text-1">About</h2> */}
                <p className="About-Us-Text-1">
              {'About'
                .split(' ')
                .map((word, i) => (
                  <span
                    key={i}
                    className="blur-word"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {word}&nbsp;
                  </span>
                ))}
            </p>
            
            <h1 className="blur-animate">
              <img src={logo} alt="" />
            </h1>
          <div className="desc">
            <p className="Text-Landing-1">
                {'Experience auction through the power of decentralized technology. Built on Web3'
                  .split(' ')
                  .map((word, i) => (
                    <span
                      key={i}
                      className="blur-word"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
              </p>
              <p className="Text-Landing-1">
                {'infrastructure and secured with blockchain and smart contracts, LXRe ensures'
                  .split(' ')
                  .map((word, i) => (
                    <span
                      key={i}
                      className="blur-word"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
              </p><p className="Text-Landing-1">
                {'transparency, trust, and fairness in every transaction. We believe that privacy and'
                  .split(' ')
                  .map((word, i) => (
                    <span
                      key={i}
                      className="blur-word"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
              </p>
              <p className="Text-Landing-1">
                {'security are fundamental rights. That is why we have integrated Internet Identity—giving'
                  .split(' ')
                  .map((word, i) => (
                    <span
                      key={i}
                      className="blur-word"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
              </p>
              <p className="Text-Landing-1">
                {'users a seamless and secure login experience without compromising personal data.'
                  .split(' ')
                  .map((word, i) => (
                    <span
                      key={i}
                      className="blur-word"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
              </p>
              <p className="Text-Landing-1">
                {'Whether you are a collector, creator, or bidder, our mission is to empower you with'
                  .split(' ')
                  .map((word, i) => (
                    <span
                      key={i}
                      className="blur-word"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
              </p>
              <p className="Text-Landing-1">
                {'full control over your assets and bids in a truly borderless marketplace.'
                  .split(' ')
                  .map((word, i) => (
                    <span
                      key={i}
                      className="blur-word"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
              </p>

                <br />
                
                <p className="Text-Landing-1">
                {'Join us in building the future of auctions—open, decentralized, and made for everyone.'
                  .split(' ')
                  .map((word, i) => (
                    <span
                      key={i}
                      className="blur-word"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
              </p>
              </div>
          </div>
      </section>


      <section className="SoldPart">
        <div className="Sold-Left">
          <div className="solds-container">
            <div className="sold">
              <span>Video Editing</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div className="sold">
              <span>Videography</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "90%" }}></div>
              </div>
            </div>
            <div className="sold">
              <span>Branding</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "77%" }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="Sold-Right">
          <div className="sate">
            <div className="sate-kiri">
              <div><strong>5+</strong><p>Year Of Experience</p></div>
              <div><strong>1,000+</strong><p>Items Sold</p></div>
            </div>
            <div className="sate-kanan">
              <div><strong>800+</strong><p>Satisfied Client</p></div>
              <div><strong>64</strong><p>Certified Award</p></div>
            </div>
            </div>
        </div>
      </section>

      {/* <section className="CallToAction">
        <div className="cta-overlay">
          <h3>Hire Us Now</h3>
          <h2>We Are Always Ready To Take A Perfect Shot</h2>
          <button>Get Started</button>
        </div>
      </section> */}

      {/* <footer className="Footer">
        <div className="footer-columns">
          <div className="footer-logo">
            <img src={logo} alt="Logo" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="footer-links">
            <h4>Our Store</h4>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Service</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Get In Touch</h4>
            <p>2443 Oak Ridge Omaha, OA 45065</p>
            <p>207-8967-452</p>
            <p>092-245-7232</p>
            <p>support@site.com</p>
          </div>
        </div>
        <p className="copyright">
          Copyright © 2023 LXRe | Powered by LXRe
        </p>
      </footer> */}



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