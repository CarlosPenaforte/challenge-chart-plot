import * as S from "./styled";
import SplitPane from "react-split-pane";
import Header from "../Header";
import CodeInput from "../CodeInput";
import LineChart from "../LineChart";
import Footer from "../Footer";
import { useState } from "react";

// Opted for using split panes to have the resizing line as expected

// Creates an split page with resizable panes
function SplitPanes() {
  // State for share code input to the components
  const [code, setCode] = useState(``);

  // Style of the resizer line
  const styles = {
    background: "rgb(110,110,120)",
    width: "2px",
    cursor: "col-resize",
    margin: 0,
    padding: 0,
    height: "100vh",
  };

  // Split pane with limits to resize
  // Setter passed to the Code Input for setting code state
  // State passed to the Footer for calling the getData function
  return (
    <SplitPane
      split="vertical"
      minSize={(window.innerWidth * 2) / 3}
      maxSize={(window.innerWidth * 9) / 10}
      defaultSize={(window.innerWidth * 9) / 10}
      resizerStyle={styles}
    >
      <S.WrapperChart>
        <Header />
        <CodeInput setter={setCode} />
        <LineChart />
        <Footer code={code} />
      </S.WrapperChart>
      <S.WrapperSideBar>side bar</S.WrapperSideBar>
    </SplitPane>
  );
}

export default SplitPanes;
