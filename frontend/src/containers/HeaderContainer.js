import Header from '../components/Header/Header';
import { connect } from 'react-redux';
import * as authActions from '../actions/authActions';

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, {
  ...authActions
})(Header);