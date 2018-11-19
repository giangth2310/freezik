import { connect } from 'react-redux';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(PrivateRoute);