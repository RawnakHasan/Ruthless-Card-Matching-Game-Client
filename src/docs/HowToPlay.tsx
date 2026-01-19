const HowToPlay = () => {
  return (
    <>
      <h1 className="text-primary text-4xl font-bold">How To Play</h1>
      <ol className="list-decimal ml-16 text-xl leading-10">
        <li>We need to Create a game or join a game via room code</li>
        <li>
          If we created the Game we need to share the room Code to our Friends
          or wait for the host to start the game
        </li>
        <li>
          After Starting the We can see the players turn and that players card
          count on the top right
        </li>
        <li>
          Finish the Game until 3 players are victorious or all the players get
          eliminated
        </li>
      </ol>
    </>
  );
};
export default HowToPlay;
