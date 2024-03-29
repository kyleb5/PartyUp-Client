/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      <div className="text-center mb-4">
        <img src="/partyup_logo.jpg" alt="Website Logo" height={200} width={200} draggable="false" />
      </div>
      <h1>Hi there!</h1>
      <p>In order to use Party Up, Sign In below!</p>
      <div className="d-flex justify-content-center">
        <Button type="button" variant="danger" className="copy-btn" onClick={signIn} style={{ width: '25%' }}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
