import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {

    render(<ContactForm/>);

});

test('renders the contact form header', () => {
    render(<ContactForm/>);

    const headerElement = screen.queryByText(/Contact Form/);

    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toBeTruthy();
    expect(headerElement).toHaveTextContent(/Contact Form/);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.queryByLabelText(/First Name*/i);
    userEvent.type(firstNameField, 'bob');

    const errorMessage = await screen.findAllByTestId('error');
    expect(errorMessage).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const submitButton = screen.queryByText(/Submit/);
    userEvent.click(submitButton);

    const errorMessage = await screen.findAllByTestId('error');
    expect(errorMessage).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.queryByLabelText(/First Name*/i);
    userEvent.type(firstNameField, 'Jason');

    const emailField = screen.queryByLabelText(/Email*/i);
    userEvent.type(emailField, 'jasemgreer@gmail.com');

    const submitButton = screen.queryByText(/Submit/);
    userEvent.click(submitButton);

    const errorMessage = await screen.findAllByTestId('error');
    expect(errorMessage).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const emailField = screen.queryByLabelText(/Email*/i);
    userEvent.type(emailField, 'jase');

    const errorMessage = await screen.findByText(/email must be a valid email address./);
    expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const submitButton = screen.queryByText(/Submit/);
    userEvent.click(submitButton);

    const errorMessage = await screen.findByText(/lastName is a required field/);
    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.queryByLabelText(/First Name*/i);
    userEvent.type(firstNameField, 'Jason');

    const lastNameField = screen.queryByLabelText(/Last Name*/i);
    userEvent.type(lastNameField, 'Greer');

    const emailField = screen.queryByLabelText(/Email*/i);
    userEvent.type(emailField, 'jasemgreer@gmail.com');

    const submitButton = screen.queryByText(/Submit/);
    userEvent.click(submitButton);

    await waitFor(() => {
        const firstName = screen.queryByText('Jason');
        const lastName = screen.queryByText('Greer');
        const email = screen.queryByText('jasemgreer@gmail.com');
        const message = screen.queryByTestId('messageDisplay');

        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(message).not.toBeInTheDocument();
    });


});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.queryByLabelText(/First Name*/i);
    userEvent.type(firstNameField, 'Jason');

    const lastNameField = screen.queryByLabelText(/Last Name*/i);
    userEvent.type(lastNameField, 'Greer');

    const emailField = screen.queryByLabelText(/Email*/i);
    userEvent.type(emailField, 'jasemgreer@gmail.com');

    const messageField = screen.queryByLabelText(/Message/i);
    userEvent.type(messageField, 'whatever');

    const submitButton = screen.queryByText(/Submit/);
    userEvent.click(submitButton);

    await waitFor(() => {
        const firstName = screen.queryByText('Jason');
        const lastName = screen.queryByText('Greer');
        const email = screen.queryByText('jasemgreer@gmail.com');
        const message = screen.queryByText('whatever');

        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(message).toBeInTheDocument();
    });
});
