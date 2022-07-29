import useData from "../../hooks/DataHooks";
import * as S from "./styled";

function Footer(props) {

  // Acquire, through useData custom hook, the function to manipulate data
  const { getData } = useData();

  // Receives the code input using the props
  const { code } = props;

  // Get data by clicking the button
  return (
    <S.Container>
      <S.Button onClick={() => getData(code)}>
        <p>GENERATE CHART</p>
      </S.Button>
    </S.Container>
  );
}

export default Footer;
