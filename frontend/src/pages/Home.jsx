import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to Tic Tac Toe!</h1>
            <p style={styles.description}>
                Challenge your friends or test your skills against the computer in this classic game of strategy.
            </p>
            <div style={styles.buttonContainer}>
                <Link to="/login" style={styles.button}>Login</Link>
                <Link to="/signup" style={styles.button}>Sign Up</Link>
            </div>
            <div style={styles.gamePreview}>
                <div style={styles.row}>
                    <div style={styles.cell}>X</div>
                    <div style={styles.cell}>O</div>
                    <div style={styles.cell}>X</div>
                </div>
                <div style={styles.row}>
                    <div style={styles.cell}>O</div>
                    <div style={styles.cell}>X</div>
                    <div style={styles.cell}>O</div>
                </div>
                <div style={styles.row}>
                    <div style={styles.cell}>X</div>
                    <div style={styles.cell}>O</div>
                    <div style={styles.cell}>X</div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        color: '#333',
        fontSize: '2.5em',
        marginBottom: '20px',
    },
    description: {
        color: '#666',
        fontSize: '1.2em',
        marginBottom: '30px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '40px',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '1em',
        transition: 'background-color 0.3s',
    },
    gamePreview: {
        display: 'inline-block',
        border: '2px solid #333',
        borderRadius: '10px',
        overflow: 'hidden',
    },
    row: {
        display: 'flex',
    },
    cell: {
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.5em',
        fontWeight: 'bold',
        border: '1px solid #999',
    },
};

export default Home;