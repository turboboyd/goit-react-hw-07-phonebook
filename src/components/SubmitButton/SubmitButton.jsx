import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import css from './SubmitButton.module.css';
import { BiPlus } from 'react-icons/bi';

const SubmitButton = () => {
  const pinkRef = useRef(null);
  const linkRef = useRef(null);
  const hoverTL = useRef(null);

  useEffect(() => {
    const pink = pinkRef.current;
    const link = linkRef.current;

    hoverTL.current = gsap.timeline({ paused: true });

    hoverTL.current.to(pink, { width: "calc(100% + 1.3em)", ease: "elastic.out(0.25)", duration: 0.4 });
    hoverTL.current.to(pink, { width: "2em", left: "calc(100% - 2em)", ease: "elastic.out(0.4)", duration: 0.6 });

    const handleMouseEnter = () => {
      hoverTL.current.play();
    };

    const handleMouseLeave = () => {
      hoverTL.current.reverse();
    };

    link.addEventListener("mouseenter", handleMouseEnter);
    link.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      link.removeEventListener("mouseenter", handleMouseEnter);
      link.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={`${css.wrapper}`}>
      <button ref={linkRef} className={`${css.link}`}>
        <div ref={pinkRef} className={css.pink}></div>
        <span>Add contact</span>
          <BiPlus className={css.svg} />  
      </button>
    </div>
  );
};


export default SubmitButton;
