import React from 'react';
import {shallow, mount} from 'enzyme';
import {SignUp,mapStateToProps,mapDispatchToProps} from '../sign_up_page';
import NavigationBar from '../nav';
import expect from "expect";

let handleSignUpCalled = false;
describe('Test Sign Up page', () => {
    function setup(loading,render_type) {
        const props = {
            actions: {
                request: () => {
                },
                SignUp_User: () => {
                    handleSignUpCalled = true;
                }
            },
            loading: loading,
            loggedIn: false,
            state: {
                token: ""
            },
            handleSubmit: () => {
            }
        };

        return render_type(<SignUp {...props} />);
    }

    it('should render without errors.', () => {
        expect(setup(false,shallow).exists(<div className="badge"/>)).toBe(true);
    });
    it('should have nav bar.', () => {
        expect(setup(false,shallow).exists(<NavigationBar/>)).toBe(true);
    });
    it('should have a form.', () => {
        expect(setup(false,shallow).exists(<form/>)).toBe(true);
    });
    it('Sign Up button calls Login_User action.', () => {
        const wrapper = setup(false, mount);
        expect(wrapper.find("#sign-up-form").length).toEqual(1);
        wrapper.find("#sign-up-form").simulate("submit");
        expect(handleSignUpCalled).toBe(true);
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
            SignUp_User: () => {
            }
        };
        expect(mapDispatchToProps(dispatch)).toEqual(
            expect.objectContaining({
                actions:{
                    request: expect.any(Function),
                    SignUp_User: expect.any(Function),
                }
            })
        );
    });
});