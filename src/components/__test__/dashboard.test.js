import React from 'react';
import {shallow} from 'enzyme';
import {Dashboard} from '../dashboard';
import NavigationBar from '../nav';
import expect from "expect";

describe('Test Dashboard page', () => {
    function setup(loading) {
        const props = {
            lists:{},
            actions: {
                request:()=>{},
                Fetch_Shopping_Lists:()=>{}
            },
            loading: loading,
            loggedIn: false,
            state: {
                token: ""
            },
            handleSubmit: () => {
            }
        };

        return shallow(<Dashboard {...props} />);
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