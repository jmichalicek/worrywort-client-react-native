import { connect } from 'react-redux';
import { loggingIn, loginSuccess, loginFailure } from '../actions';
import Login from '../components/login';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const LoginLink = connect(
  mapStateToProps
)(Login);

export default LoginLink;
