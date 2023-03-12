const MediaPlayerProgress = () => {
  return (
    <>
      <input
        type="range"
        min="1"
        max="100"
        value="50"
        id="myRange"
        style={{ width: "100%" }}
      />
      <div></div>
    </>
  );
};

export default MediaPlayerProgress;
