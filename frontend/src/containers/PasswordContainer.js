import { connect } from 'react-redux';
import Password from '../components/PrivateRoute/Password/Password';

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Password);