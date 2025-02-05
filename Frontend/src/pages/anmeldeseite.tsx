import React, { useState } from 'react';

export function Anmeldeseite() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const anmeldung = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };
  
  return(
    <div style={{ maxWidth: '400px', margin: 'auto'}}>
      <h2>Login</h2>
      <form onSubmit={anmeldung}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Login</button>
      </form>
    </div>
  );
};

export default Anmeldeseite;
  