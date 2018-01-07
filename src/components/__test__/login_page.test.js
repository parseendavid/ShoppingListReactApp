import React from 'react';
import {mount, shallow} from 'enzyme';
import {LoginPage, mapDispatchToProps, mapStateToProps} from '../login_page';
import NavigationBar from '../nav';
import expect from "expect";

let handleLoginCalled = false;
describe('Test Login page', () => {
    function setup(loading, render_type) {
        const props = {
            actions: {
                request: () => {
                },
                Login_User: () => {
                    handleLoginCalled = true;
                }
            }, loading: loading,
            loggedIn: false,
            state: {
                token: ""
            },
            handleSubmit: () => {
            }
        };

        return render_type(<LoginPage {...props} />);
    }

    it('should render without errors.', () => {
        expect(setup(false, shallow).exists(<div className="badge"/>)).toBe(true);
    });
    it('should have nav bar.', () => {
        expect(setup(false, shallow).exists(<NavigationBar/>)).toBe(true);
    });
    it('should have a form.', () => {
        expect(setup(false, shallow).exists(<form/>)).toBe(true);
    });
    it('Login button calls Login_User action.', () => {
        const wrapper = setup(false, mount);
        expect(wrapper.find("#login-form").length).toEqual(1);
        wrapper.find("#login-form").simulate("submit");
        expect(handleLoginCalled).toBe(true);
    });
    it('correctly maps state to props', () => {
        const state = {
            token: '',
            loading: false,
            lists: {},
            items_details: {}
        };
        const expected = {
            "state": {
                token: '',
                loading: false,
                lists: {},
                items_details: {}
            }
        };
        expect(mapStateToProps(state)).toEqual(expected);
    });
    it('correctly maps dispatch to props', () => {
        const dispatch = {
            request: () => {
            },
            Login_User: () => {
            }
        };
        expect(mapDispatchToProps(dispatch)).toEqual(
            expect.objectContaining({
            actions:{
                request: expect.any(Function),
                Login_User: expect.any(Function),
            }
        })
        );
    });
});