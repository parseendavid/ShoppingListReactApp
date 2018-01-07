import React from 'react';
import {shallow} from 'enzyme';
import {SignUp} from '../sign_up_page';
import NavigationBar from '../nav';
import expect from "expect";

describe('Test Sign Up page', () => {
    function setup(loading) {
        const props = {
            actions: {},
            loading: loading,
            loggedIn: false,
            state: {
                token: ""
            },
            handleSubmit: () => {
            }
        };

        return shallow(<SignUp {...props} />);
    }

    it('should render without errors.', () => {
        expect(setup(false).exists(<div className="badge"/>)).toBe(true);
    });
    it('should have nav bar.', () => {
        expect(setup(false).exists(<NavigationBar/>)).toBe(true);
    });
    it('should have a form.', () => {
        expect(setup(false).exists(<form/>)).toBe(true);
    });
});