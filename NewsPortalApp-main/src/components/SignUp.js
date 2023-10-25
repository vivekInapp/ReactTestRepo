import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, Message } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import { registerNewUser, getAllUsers, setCurrentUser } from '../shared/users/userSlice'

function SignUp() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [displayNameError, setdisplayNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [password1Error, setPassword1Error] = useState(null);
    const [password2Error, setPassword2Error] = useState(null);
    const [disableForm, setdisableForm] = useState(true);
    const [userId, setUserId] = useState(1);

    const allUsers = useSelector(getAllUsers);


    const onSignUp = () => {
        let existingUsers = allUsers.filter(x => { return (x.email === email) })

        if (existingUsers.length == 0) {
            dispatch(registerNewUser({ userId, displayName, email, password:password1, articles : [] }));
            dispatch(setCurrentUser({ userId, displayName, email, password:password1 }));
            setUserId(userId + 1);

            navigate('/home')
        }
        else {
            setEmailError({ content: 'Email address already exists, Please try different one.' })
            setdisableForm(true);
        }


    }

    const displayNameErrorCheck = (value) => {

        const displayNameRegex = /^[a-zA-Z0-9 ]*$/;
        return (displayNameRegex.test(value));
    }

    const emailErrorCheck = (value) => {

        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        return (emailRegex.test(value));
    }

    const passwordErrorCheck = (value) => {
        const passwordRegex = /^[a-zA-Z0-9]{1,20}$/;
        return (passwordRegex.test(value));
    }

    const onFieldChange = (field, value) => {
        if (value.trim() != '') {
            switch (field) {
                case 'displayName':
                    setDisplayName(value.trim());
                    if (!displayNameErrorCheck(value)) {
                        setdisplayNameError({ content: 'Please enter a valid display name, cannot contain any special character.' })
                        setdisableForm(true);
                    }
                    else {
                        setdisplayNameError(null);
                        setdisableForm(false);
                    }
                    break;
                case 'email':
                    setEmail(value.trim())
                    if (!emailErrorCheck(value)) {
                        setEmailError({ content: 'Please enter a valid mail address.' })
                        setdisableForm(true);
                    }
                    else {
                        setEmailError(null);
                        setdisableForm(false);
                    }
                    break;
                case 'password1':
                    setPassword1(value.trim());
                    if (!passwordErrorCheck(value)) {
                        setPassword1Error(true);
                        setdisableForm(true);
                    }
                    else {
                        setPassword1Error(null)
                        setdisableForm(false);
                    }
                    break;
                case 'password2':
                    setPassword2(value.trim());
                    if (password1 !== value.trim()) {
                        setPassword2Error({ content: 'Password does not match.' });
                        setdisableForm(true);
                    }
                    else {
                        setPassword2Error(null)
                        setdisableForm(false);
                    }
                    break;
                default:
                    break;
            }
        }
        else {
            document.getElementById(`input_${field}`).value = '';
        }

    }
    return (
        <>
            <Form onSubmit={onSignUp}>
                <Form.Input
                    required={true}
                    label='Display Name'
                    placeholder='Full Name'
                    type='text'
                    onChange={(e) => { onFieldChange('displayName', e.target.value) }}
                    error={displayNameError}
                    id='input_displayName'
                />
                <Form.Input
                    required={true}
                    label='Email'
                    placeholder='Email'
                    type='email'
                    onChange={(e) => { onFieldChange('email', e.target.value) }}
                    error={emailError}
                    id='input_email'
                />
                <Form.Input
                    required={true}
                    label='Password'
                    placeholder='Password'
                    type='password'
                    onChange={(e) => { onFieldChange('password1', e.target.value) }}
                    id='input_password1'
                    error={password1Error}
                /><Form.Input
                    required={true}
                    label='Confirm Password'
                    placeholder='Password'
                    type='password'
                    onChange={(e) => { onFieldChange('password2', e.target.value) }}
                    id='input_password2'
                    error={password2Error}
                />

                <Message info>
                    <p>Password cannot contain any special characters and exceed 20 characters</p>
                </Message>

                <Button content='SignUp' primary disabled={disableForm} />
            </Form>
        </>
    )
}

export default SignUp
