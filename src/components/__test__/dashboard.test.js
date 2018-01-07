import React from 'react';
import {shallow} from 'enzyme';
import {Dashboard} from '../dashboard';
import NavigationBar from '../nav';
import expect from "expect";

let handleDeleteCalled = false;

describe('Test Dashboard page', () => {
    function setup(loading, render_type) {
        const props = {
            lists: {
                5: {
                    date_modified: "Sat, 06 Jan 2018 07:22:52 GMT",
                    id: 5,
                    list_name: "test list"
                }
            },
            actions: {
                request: () => {
                },
                Fetch_Shopping_Lists: () => {
                },
                Delete_Shopping_List:()=>{
                    handleDeleteCalled = true;
                }
            },
            loading: loading,
            loggedIn: false,
            state: {
                token: "",
                edit_list:{
                    name:"",
                    id:""
                }
            },
            handleSubmit: () => {
            }
        };

        return render_type(<Dashboard {...props} />);
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
    it('delete list button calls Delete_Shopping_List action.', () => {
        expect(setup(false, shallow).find("#delete-list-button").length).toEqual(1);
        setup(false, shallow).find("#delete-list-button").simulate("click",{ preventDefault() {} });
        expect(handleDeleteCalled).toBe(true);
    });
    it('Edit list button calls Modal.', () => {
        const wrapper = setup(false, shallow);
        expect(wrapper.find("#edit-list-button").length).toEqual(1);
        wrapper.find("#edit-list-button").simulate("click");
        expect(wrapper.state('edit_list')).toEqual({
            id: 5,
            name: "test list"
        });
    });
});