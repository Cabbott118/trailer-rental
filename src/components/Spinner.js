import PulseLoader from 'react-spinners/PulseLoader';

const Spinner = ({ loading, color }) => {
  return (
    <PulseLoader
      color={color}
      loading={loading}
      size={30}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  );
};

export default Spinner;
