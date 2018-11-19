import { connect } from 'react-redux';
import Profile from '../components/PrivateRoute/Profile/Profile';
import * as profileActions from '../actions/profileActions';

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, {
  ...profileActions
})(Profile);