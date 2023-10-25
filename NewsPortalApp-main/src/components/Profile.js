import React, { useState } from 'react'
import { Grid, Image, Icon, Button, Modal, Input, Confirm, Form, Message } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, updateCurrentUser, removeRegesteredUser, removeCurrentUser } from '../shared/users/userSlice'
import avatar from '../assets/images/Avatar.png'


function Profile() {

    const dispatch = useDispatch();

    const currentUser = useSelector(getCurrentUser);
    const [editName, setEditName] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [confirmRemoveAccount, setConfirmRemoveAccount] = useState(false)
    const [newDisplayName, setnewDisplayName] = useState(currentUser.displayName)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('')
    const [isPasswordChanged, setIsPasswordChanged] = useState(false)

    const onChangeName = () => {
        setEditName(false)
        dispatch(updateCurrentUser({ userId: currentUser.userId, displayName: newDisplayName, email: currentUser.email, password: currentUser.password }));
    }

    const removeAccount = () => {
        dispatch(removeRegesteredUser(currentUser));
        dispatch(removeCurrentUser())
    }
    const passwordErrorCheck = (value) => {
        const passwordRegex = /^[a-zA-Z0-9]{1,20}$/;
        return (passwordRegex.test(value));
    }

    const onPasswordChange = () => {
        setIsPasswordChanged(false);
        if (currentUser.password !== oldPassword) {
            setPasswordErrorMsg('Incorrect password');
        }
        else if (newPassword1 !== newPassword2) {
            setPasswordErrorMsg("Password doesn't match");
        }
        else if (!passwordErrorCheck(newPassword1)) {
            setPasswordErrorMsg('Password contains invalid characters')
        }
        else {
            dispatch(updateCurrentUser({ userId: currentUser.userId, displayName: currentUser.displayName, email: currentUser.email, password: newPassword1 }));
            setPasswordErrorMsg('Password changes successfully');
            setIsPasswordChanged(true);
            setOldPassword('');
            setNewPassword1('');
            setNewPassword2('');
            document.getElementById('inputPswd').value = '';
            document.getElementById('inputPswd1').value = '';
            document.getElementById('inputPswd2').value = '';
        }
    }

    return (
        <>

            <Modal basic
                size='small'
                trigger={<a>{currentUser.displayName}</a>} closeIcon={true}>
                <Modal.Content>
                    <Image size='small' src={avatar}></Image>
                    <br />
                    <p>{currentUser.email}</p>
                    <br />
                    {editName === true ?
                        (<div><Input onChange={(e) => { setnewDisplayName(e.target.value) }} defaultValue={newDisplayName} ></Input> &nbsp;&nbsp;&nbsp;
                            <span className='btnLink' onClick={onChangeName}><Icon name='save'></Icon></span >&nbsp;&nbsp;&nbsp;<span className='btnLink' onClick={() => setEditName(false)}><Icon name='cancel'></Icon></span> </div>)
                        : (<div> <span>{currentUser.displayName}</span>&nbsp;&nbsp;&nbsp; <span className='btnLink' onClick={() => { setEditName(true) }}><Icon name='edit'></Icon></span></div>)}
                    <br />
                    <a className='btnLink' onClick={() => { setChangePassword(true) }}>Change password?</a>
                    <br />
                    <a className='btnLink' onClick={() => setConfirmRemoveAccount(true)}>Remove account?</a>
                    <Confirm basic
                        header='Please confirm'
                        content='This account will be removed permenently, are you sure?'
                        open={confirmRemoveAccount}
                        onConfirm={removeAccount}
                        onCancel={() => setConfirmRemoveAccount(false)}
                    >
                    </Confirm>
                </Modal.Content>
            </Modal>


            <Modal
                onOpen={()=>{setIsPasswordChanged(false); setPasswordErrorMsg('');}}
                size='small'
                open={changePassword}>
                <Modal.Content>
                    <Form >
                        <Form.Field>
                            <label>Current Password</label>
                            <input id='inputPswd' onChange={(e) => { setOldPassword(e.target.value) }} required type='password' placeholder='Enter current password' />
                        </Form.Field>
                        <Form.Field>
                            <label>New Password</label>
                            <input id='inputPswd1' onChange={(e) => { setNewPassword1(e.target.value) }} required type='password' placeholder='Enter New password' />
                        </Form.Field>
                        <Form.Field>
                            <label>Confirm New Password</label>
                            <input id='inputPswd2' onChange={(e) => { setNewPassword2(e.target.value) }} required type='password' placeholder='Enter New password' />
                        </Form.Field>
                        {
                            (passwordErrorMsg !== '' && !isPasswordChanged) &&
                            <Message negative>
                                <p>{passwordErrorMsg}</p>
                            </Message>
                        }
                        {
                            isPasswordChanged &&
                            <Message positive>
                                <p>{passwordErrorMsg}</p>
                            </Message>
                        }

                        <Button onClick={onPasswordChange} positive type='submit' >Change password</Button>
                        <Button color='red' onClick={() => { setChangePassword(false) }} >Cancel</Button>
                    </Form>
                </Modal.Content>

            </Modal>
        </>
    )
}

export default Profile
