import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ currentUser, children, ...rest }) {
    if (currentUser != null)
        return children
    else
    return <Navigate to="/"></Navigate>    
}
export default ProtectedRoute