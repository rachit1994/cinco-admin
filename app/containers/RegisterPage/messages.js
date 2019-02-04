/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.HomePage';

export default defineMessages({
    email: {
        id: `${scope}.login.email`,
        defaultMessage: 'Email',
    },
    password: {
        id: `${scope}.login.password`,
        defaultMessage: 'Password',
    },
});
