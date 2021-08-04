import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import CenteredContainer from './CenteredContainer'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, logout } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setMessage('')

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match.')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value).then((res) => {
                res.user.sendEmailVerification().then(() => {
                    setMessage('Account created. Please verify your email and login.')
                })
            })
            await logout()
        } catch (error) {
            setError(error.message || 'Error setting up user.')
        }
        setLoading(false)
    }
    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4"> Sign Up</h2>
                    { error && <Alert variant='danger'>{error}</Alert>}
                    { message && <Alert variant='success'>{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password" className="mb-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="passwordConfirm" className="mb-2">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Sign up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </CenteredContainer>
    )
}
