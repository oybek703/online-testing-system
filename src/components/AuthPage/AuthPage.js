import React, {Component} from 'react';
import is  from 'is_js'
import Button from "@components/UI/Button";
import Input from "@components/UI/Input";
import {connect} from "react-redux";
import {auth, authError} from "@src/redux/actions";

const createFormControlsState = () => {
    return {
        emailValidation: {
            emailValue:'',
            isEmailValid: false,
            emailValidityMessage: 'Valid email address.',
            emailInValidityMessage: 'Email must be valid email address!'
        },
        passwordValidation: {
            passwordValue:'',
            isPasswordValid: false,
            passwordValidityMessage: 'Robust password.',
            passwordInValidityMessage: 'Password must include at least 6 characters!'
        }
    }
}

class AuthPage extends Component {

    state = {
        isFormValidating: false,
        isPasswordValidation: false,
        isEmailValidation: false,
        ...createFormControlsState()
    }

    componentWillUnmount() {
        const {authError} = this.props;
        authError();
    }

    handleLogin =  (event) => {
        event.preventDefault();
        const {auth}= this.props;
        const  {
            emailValidation: {emailValue: email},
            passwordValidation: {passwordValue: password}
        } = this.state;
        auth(email, password, true);
    }

    handleRegister =  () => {
        const {auth}= this.props;
        const  {
            emailValidation: {emailValue: email},
            passwordValidation: {passwordValue: password}
        } = this.state;
        auth(email, password, false);
    }

    handleEmailChange = (event) => {
        const { value } = event.target;
        const { emailValidation } = this.state;
        this.setState({
            isFormValidating: true,
            isEmailValidation: true,
            emailValidation: {
                ... emailValidation,
                isEmailValid: is.email(value),
                emailValue: value
            }
        })
    }

    handlePasswordChange = (event) => {
        const { value } = event.target;
        const { passwordValidation } = this.state;
        this.setState({
            isFormValidating: true,
            isPasswordValidation: true,
            passwordValidation: {
                ... passwordValidation,
                isPasswordValid: value.length >= 6,
                passwordValue: value
            }
        })
    }

    render() {
        const {
            isFormValidating,
            emailValidation,
            passwordValidation,
            isEmailValidation,
            isPasswordValidation
        } = this.state;

        const {error} = this.props;
        const btnDisableState = !(emailValidation.isEmailValid && passwordValidation.isPasswordValid);
        return (
            <div className='mt-5'>
                <h4 className='text-white text-center'>Authentication</h4>
                <form className='bg-white border border-light p-3 mt-3 rounded' noValidate onSubmit={this.handleLogin}>
                    <Input
                        labelText='Email'
                        placeholder='Enter your email...'
                        type='email'
                        isRequired={true}
                        isValidating={isFormValidating}
                        isValid={emailValidation.isEmailValid}
                        onChange={this.handleEmailChange}
                        isExactValidation={isEmailValidation}
                        validityMessage={emailValidation.emailValidityMessage}
                        invalidityMessage={emailValidation.emailInValidityMessage}
                        value={emailValidation.emailValue}/>
                    <Input
                        labelText='Password'
                        placeholder='Enter your password...'
                        type='password'
                        isRequired={true}
                        isValidating={isFormValidating}
                        isValid={passwordValidation.isPasswordValid}
                        onChange={this.handlePasswordChange}
                        isExactValidation={isPasswordValidation}
                        validityMessage={passwordValidation.passwordValidityMessage}
                        invalidityMessage={passwordValidation.passwordInValidityMessage}
                        value={passwordValidation.passwordValue}/>
                    {
                        error && <p className='text-danger mb-3 mt-n3 fon-italic'>{error}</p>
                    }
                    <Button
                        text='Sign In'
                        btnType='primary'
                        type='submit'
                        disabled={btnDisableState}
                        onClick={this.handleLogin}/>
                    <Button
                        text='Sign Up'
                        btnType='info'
                        type='button'
                        disabled={btnDisableState}
                        onClick={this.handleRegister}/>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
       authError: () => dispatch(authError(''))
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);