import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { styles } from "../constants/Styles";
import { nameToPic } from "../constants/Constants";
import { useEffect } from "react";
import { shuffle } from "../utils/ArrayUtils";

//this file contains the GameScreen, which is where the game is played.

//array of names
const names = Object.keys(nameToPic);

export default function GameScreen() {
  // TODO: Declare and initialize state variables here, using "useState".

  //score is set to 0 for beginning of game 
  //setScore will update score
  const [currentScore, setCurrentScore] = useState(0);

  //total questions to keep track of # of questions asked
  //setTotalQuestions will update score
  const [totalQuestions, setTotalQuestions] = useState(0);

  //intializes nameOptions to be an empty array 
  //set NameOptions will update nameOptions
  const [nameOptions, setNameOptions] = useState([]);

  const [correctName, setCorrectName] = useState("");
  //initializes memberName with initial value of empty string ""
  //setMemberName will update memberName 

  const [correctPicture, setCorrectPicture] = useState("");
  //initializes correctPicture with initial value of empty string ""
  //setCorrectPicture will update correctPicture

  // State for the timer is handled for you.
  // 5 second timer 
  const [timeLeft, setTimeLeft] = useState(5000); //5000 milliseconds aka 5 seconds
  //setTimeLeft updates the timeLeft variable with new value 
  //component rerenders with the updated state

  //Functional component called countDown 
  // Called by the timer every 10 seconds
  const countDown = () => {
    if (timeLeft > 0) {
      // Time still left, so decrement time state variable
      setTimeLeft(timeLeft - 10);
    } else {
      // Time has expired
      // TODO: update appropriate state variables
      setTimeLeft(5000);
    }
  };

  // This is used in the useEffect(...) hook bound on a specific STATE variable.
  // It updates state to present a new member & name options.
  const getNextRound = () => {
    // Fetches the next member name to guess.
    let correct = names[Math.floor(Math.random() * names.length)];
    let correctName = nameToPic[correct][0];
    let correctImage = nameToPic[correct][1];

    // Generate 3 more wrong answers.
    let nameOptions = [correctName];
    while (nameOptions.length < 4) {
      let wrong = names[Math.floor(Math.random() * names.length)];
      let wrongName = nameToPic[wrong][0];
      if (!nameOptions.includes(wrongName)) {
        nameOptions.push(wrongName);
      }
    }
    nameOptions = shuffle(nameOptions);

    // TODO: Update state here.

    setCorrectName(correctName);
    setCorrectPicture(correctImage);
    setNameOptions(nameOptions);
    setTimeLeft(5000);
  };

  // Called when user taps a name option.
  // TODO: Update correct # and total # state values.
  const selectedNameChoice = (index) => {
  if (nameOptions[index] === correctName) {
    setCurrentScore(currentScore + 1);
  }
  setTotalQuestions(totalQuestions + 1)
};
  // Call the countDown() method every 10 milliseconds.
  useEffect(() => {
    const timer = setInterval(() => countDown(), 10);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  // TODO: Finish this useEffect() hook such that we automatically
  // get the next round when the appropriate state variable changes.
  useEffect(
    () => {
      getNextRound();
    },
    [
      /* TODO: Your State Variable Goes Here */
      totalQuestions
      //what this useEffect does is that it it's triggered whenever this variable changes 
      //and when totalQuestions changes, is when we want to move on to the next round


    ]
  );

  // Set up four name button components
  const nameButtons = [];
  for (let i = 0; i < 4; i++) {
    const j = i;

    //adding to nameButtons
    nameButtons.push(
      // A button is just a Text component wrapped in a TouchableOpacity component.
      <TouchableOpacity
        key={j}
        style={styles.button}
        onPress={() => selectedNameChoice(j)}
      >
        <Text style={styles.buttonText}>
          {/* TODO: Use something from state here. */}
          {nameOptions[i]}

        </Text>
      </TouchableOpacity>
    );
  }

  const timeRemainingStr = (timeLeft / 1000).toFixed(2);
//{nameButtons.map((item)=>{return item
  // Style & return the view.
  {/* TODO: Build out your UI using Text and Image components. */}
      {/* Hint: What does the nameButtons list above hold? 
          What types of objects is this list storing?
          Try to get a sense of what's going on in the for loop above. */}
  return (
    <View style = {styles.container}>
      <View>
      <Text style={styles.scoreText}>Current Score: {currentScore}/{totalQuestions}</Text>
      <Text style={styles.timerText}>Time Remaining: {timeLeft/1000} </Text>
    </View>
    <Image style = {styles.image} source = {correctPicture}/>
        <View>
          {nameButtons[0]}
          {nameButtons[1]}
          {nameButtons[2]}
          {nameButtons[3]}
        </View>
    </View>
  );
}