import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";
import * as S from './styled';

// Chose the react-textarea-code-editor because its easier to code than similar ones

function CodeInput(props) {
  // Receives the setter for changing the code state that was passed to the Footer
  const { setter } = props;

  // Creates a state to keep code input
  const [inputText, setInputText] = useState(``);

  // On text change, change the text on the screen and sets the code state
  // Allows  vertical scrolling
  return (
    <S.Container>
      <h2>Type the commands here</h2>
      <CodeEditor
        id="code-editor"
        value={inputText}
        language="js"
        placeholder="PLEASE ENTER JS OBJECTS"
        onChange={(event) => {
          setInputText(event.target.value);
          setter(event.target.value);
        }}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "rgb(10,0,0)",
          fontFamily:
            "Source Code Pro",
          maxHeight: "25vh",
          overflowY: "scroll",
        }}
      />
    </S.Container>
  );
}

export default CodeInput;
