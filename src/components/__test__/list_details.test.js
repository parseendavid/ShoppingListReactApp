import React from 'react';
import {shallow} from 'enzyme';
import {Details} from '../details';
import NavigationBar from '../nav';
import expect from "expect";

describe('Test List Details page', () => {
    function setup(loading) {
        const props = {
            match:{
                params:{
                    id:96
                }
            },
            items_details:{},
            actions: {
                request:()=>{},
                Fetch_Shopping_List_Items:()=>{}
            },
            loading: loading,
            loggedIn: false,
            state: {
                token: ""
            },
            handleSubmit: () => {
            }
        };

        return shallow(<Details {...props} />);
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