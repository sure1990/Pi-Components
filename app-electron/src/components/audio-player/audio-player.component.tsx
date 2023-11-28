import React from "react";
import "./audio-player.component.scss"

const AudioPlayer =()=>{
    return(
        <>
<div className="ap" id="ap">
  <div className="ap__inner">
      <div className="ap__item ap__item--playback">
        <button className="ap__controls ap__controls--prev">
        <span className="icon-backward2"></span>
        </button>
        <button className="ap__controls ap__controls--toggle">
        <span className="icon-play3"></span>
        </button>
        <button className="ap__controls ap__controls--next">
        <span className="icon-forward3"></span>
        </button>
      </div>
      <div className="ap__item ap__item--track">
        <div className="track">
          <div className="track__title">Queue is empty</div>
          <div className="track__time">
            <span className="track__time--current">--</span>
            <span> / </span>
            <span className="track__time--duration">--</span>
          </div>

          <div className="progress-container">
            <div className="progress">
              <div className="progress__bar"></div>
              <div className="progress__preload"></div>
            </div>
          </div>

        </div>
      </div>
      <div className="ap__item ap__item--settings">
        <div className="ap__controls volume-container">
          <button className="volume-btn">
          <span className="icon-volume-medium"></span>
          <span className="icon-volume-mute2"></span>
          </button>
          <div className="volume">
            <div className="volume__track">
              <div className="volume__bar"></div>
            </div>
          </div>
        </div>
        <button className="ap__controls ap__controls--repeat">
        <span className="icon-loop"></span>
        </button>
        {/* <button className="ap__controls ap__controls--playlist">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#333" width="24" height="24" viewBox="0 0 24 24">
            <path d="M17.016 12.984l4.969 3-4.969 3v-6zM2.016 15v-2.016h12.984v2.016h-12.984zM18.984 5.016v1.969h-16.969v-1.969h16.969zM18.984 9v2.016h-16.969v-2.016h16.969z"></path>
          </svg>
        </button> */}
      </div>
  </div>
</div>
        </>
    )
}

export default AudioPlayer;