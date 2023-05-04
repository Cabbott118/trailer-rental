import {
  BarLoader,
  BeatLoader,
  BounceLoader,
  ClipLoader,
  MoonLoader,
  PulseLoader,
} from 'react-spinners';

const Spinner = ({ loading, color, size, type }) => {
  let SpinnerComponent;

  switch (type) {
    case 'bar':
      SpinnerComponent = BarLoader;
      break;
    case 'beat':
      SpinnerComponent = BeatLoader;
      break;
    case 'bounce':
      SpinnerComponent = BounceLoader;
      break;
    case 'clip':
      SpinnerComponent = ClipLoader;
      break;
    case 'moon':
      SpinnerComponent = MoonLoader;
      break;
    case 'pulse':
    default:
      SpinnerComponent = PulseLoader;
      break;
  }
  return (
    <SpinnerComponent
      color={color}
      loading={loading}
      size={size}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  );
};

export default Spinner;
