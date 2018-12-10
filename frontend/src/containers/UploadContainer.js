import { connect } from 'react-redux';
import Upload from '../components/PrivateRoute/Upload/Upload';

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Upload);