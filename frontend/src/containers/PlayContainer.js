import Play from '../components/Play/Play';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Play);