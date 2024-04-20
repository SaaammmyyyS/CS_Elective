import React from 'react';
import { render, fireEvent, queryAllByText } from '@testing-library/react';
import DeleteUser from '../../src/widgets/ui/deleteUser';

describe('DeleteUser Rendering', () => {
    const setShowDeleteModalMock = () => {};
  
    it('renders correctly', () => {
        const { container } = render(<DeleteUser setShowDeleteModal={setShowDeleteModalMock} />);
        const deleteAccountElements = queryAllByText(container, /Delete Account/);
        expect(deleteAccountElements.length).toBeGreaterThan(0);
    });
});

describe('DeleteUser Functionality', () => {
    const setShowDeleteModalMock = () => {};
  
    it('displays cancel message when "Cancel" button is clicked', async () => {
        const { getByText } = render(<DeleteUser setShowDeleteModal={setShowDeleteModalMock} />);
        fireEvent.click(getByText('Cancel'));
    });
});
