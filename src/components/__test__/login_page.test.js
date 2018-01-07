import React from 'react';
import {shallow} from 'enzyme';
import {LoginPage} from '../login_page';
import NavigationBar from '../nav';
import expect from "expect";

describe('Test Login page', () => {
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

        return shallow(<LoginPage {...props} />);
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