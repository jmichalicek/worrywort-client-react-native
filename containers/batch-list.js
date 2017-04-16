import { connect } from 'react-redux';
import { loggingIn, loginSuccess, loginFailure } from '../actions';
import BatchList from '../components/scenes/batch-list';

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    //batchList: state.batchList
  }
}

const BatchListLink = connect(
  mapStateToProps
)(BatchList);

export default BatchListLink;
