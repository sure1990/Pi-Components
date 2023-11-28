import React from "react";
import "./progress-player.component.scss";



const ProgressPlayer =()=>{
    return(
        <>
        <div className="content">
  <div className="audio-player__container" data-audio-src="https://raw.githubusercontent.com/ahmednooor/textonome/master/media/gotViolin.mp3">
    <div className="file-path">
    </div>
    <div className="play-btn__container">
      <div className="text">
        <p className="stop">Stop</p>
        <p className="play">Play</p>
      </div>
      <div className="toggle">
        <div className="rectangle"></div>
      </div>
    </div>
    <div className="scrubber__container">
      <p className="time-start hide" id="0">0:00</p>
      <p className="time-end hide" id="0">0:00</p>
      <div className="dial">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="107">
          <defs>
            <filter id="a" width="310%" height="122.1%" x="-105%" y="-7.9%" filterUnits="objectBoundingBox">
              <feOffset dy="3" in="SourceAlpha" result="shadowOffsetOuter1"/>
              <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="3"/>
              <feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
              <feMerge><feMergeNode in="shadowMatrixOuter1"/><feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g fill="none" fill-rule="evenodd" filter="url(#a)" transform="translate(6.183 3)"><path fill="#B84546" d="M2 0h3v91H0z"/>
            <path fill="#802F2D" d="M8 0H5v91H0l5 4 5-4z"/>
          </g>
        </svg>
      </div>
      <div className="scrubber__time--top">
        <p className="hide" id="10">10</p>
        <p id="20">20</p>
        <p className="hide" id="30">30</p>
        <p id="40">40</p>
        <p className="hide" id="50">50</p>
        <p id="60">60</p>
        <p className="hide" id="70">70</p>
        <p id="80">80</p>
        <p className="hide" id="90">90</p>
      </div>
      <div className="scrubber__scrubber--outer">
        <div className="scrubber__scrubber">
          <div className="scrubber__scrubber--start">
          </div>
          <div className="scrubber__scrubber--end">
          </div>
        </div>
      </div>
      <div className="scrubber__time--bottom">
        <div className="desktop">
          <p>15</p>
          <p>25</p>
          <p>35</p>
          <p>45</p>
          <p>55</p>
          <p>65</p>
          <p>75</p>
          <p>85</p>
        </div>
        <div className="mobile">
          <p>30</p>
          <p>50</p>
          <p>70</p>
        </div>
      </div>
    </div>
  </div>
 
</div>
        </>
    )
}

export default ProgressPlayer;