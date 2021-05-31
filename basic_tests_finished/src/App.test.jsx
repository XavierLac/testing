import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { replaceCamelWithSpaces } from './App';

test('button has correct initial color', () => {
    render(<App />);

    // Find an element with a role of button and text of "Change to blue"
    const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue' });

    // expect the background color to be red
    expect(colorButton).toHaveStyle({backgroundColor: 'MediumVioletRed'})

    // click the button
    fireEvent.click(colorButton);

    // expect the background color to be blue
    expect(colorButton).toHaveStyle({backgroundColor: 'MidnightBlue'});

    // expect the button text to be 'Change to red'
    expect(colorButton.textContent).toBe('Change to MediumVioletRed');
});

test('initial conditions', () => {
    render(<App />);

    // Check that the button starts out enabled
    const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue' });
    expect(colorButton).toBeEnabled();

    // Check that the checkbox starts out unchecked
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
});

test('Checkbox disables button on first click and enables on second click', () => {
    render(<App />);
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
    const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue' });

    fireEvent.click(checkbox);
    expect(colorButton).toBeDisabled();

    fireEvent.click(checkbox);
    expect(colorButton).toBeEnabled();
});

test('Disabled button has gray background and reverts to MediumVioletRed', () => {
    render(<App />);
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
    const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue' });

    // Disable button
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle({backgroundColor: 'gray'});

    // re-enable button
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle({backgroundColor: 'MediumVioletRed'});
});

test('Clicked disabled button has gray background and reverts to blue', () => {
    render(<App />);
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
    const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue' });

    // Change button to blue
    fireEvent.click(colorButton);

    // Disable button
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle({backgroundColor: 'gray'});

    // re-enable button
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle('background-color: MidnightBlue');
});

describe('spaces before camel-case capital letters', () => {
    test('Works for no inner capital letters', () => {
        expect(replaceCamelWithSpaces('Red')).toBe('Red');
    })
    test('Works for one inner capital letters', () => {
        expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
    })
    test('Works for multiple inner capital letters', () => {
        expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
    })
});
