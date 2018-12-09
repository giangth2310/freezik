import { connect } from 'react-redux';
import Favorite from '../components/PrivateRoute/Favorite/Favorite';

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Favorite);