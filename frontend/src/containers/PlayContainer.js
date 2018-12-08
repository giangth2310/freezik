import Play from '../components/Play/Play';
import { connect } from 'react-redux';
import * as authActions from '../actions/authActions';

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, {
  ...authActions
})(Play);