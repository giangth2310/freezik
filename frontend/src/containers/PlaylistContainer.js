import { connect } from 'react-redux';
import Playlist from '../components/PrivateRoute/Playlist/Playlist';

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Playlist);