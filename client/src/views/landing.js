import { useDispatch } from 'react-redux';
import { login } from '../state/actions';

const Landing = () => {

  const dispatch = useDispatch();

  const handle = () => {
    dispatch(login());
  };

  return (
    <>
      <h1>Landing</h1>
      <button onClick={(handle)}>login</button>
    </>
  );
};

export default Landing;