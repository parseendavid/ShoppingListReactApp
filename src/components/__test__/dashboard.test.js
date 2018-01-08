import React from "react";
import {mount, shallow} from "enzyme";
import {Dashboard, mapDispatchToProps, mapStateToProps} from "../dashboard";
import NavigationBar from "../nav";
import expect from "expect";

let handleDeleteCalled, handleAddListCalled, handleEditListCalled = false;

describe("Test Dashboard page", () => {
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
                Add_Shopping_List: () => {
                    handleAddListCalled = true;
                },
                Edit_Shopping_List: () => {
                    handleEditListCalled = true;
                },
                Delete_Shopping_List: () => {
                    handleDeleteCalled = true;
                }
            },
            loading: loading,
            loggedIn: false,
            state: {
                token: "",
                edit_list: {
                    name: "",
                    id: ""
                }
            },
            handleSubmit: () => {
            }
        };

        return render_type(<Dashboard {...props} />);
    }

    it("should render without errors.", () => {
        expect(setup(false, shallow).exists(<div className="badge"/>)).toBe(true);
    });
    it("should have nav bar.", () => {
        expect(setup(false, shallow).exists(<NavigationBar/>)).toBe(true);
    });
    it("should have a form.", () => {
        expect(setup(false, shallow).exists(<form/>)).toBe(true);
    });
    it("delete list button calls Delete_Shopping_List action.", () => {
        expect(setup(false, shallow).find("#delete-list-button").length).toEqual(1);
        setup(false, shallow).find("#delete-list-button").simulate("click", {
            preventDefault() {
            }
        });
        expect(handleDeleteCalled).toBe(true);
    });
    it("Edit list button calls Modal.", () => {
        const wrapper = setup(false, shallow);
        expect(wrapper.find("#edit-list-button").length).toEqual(1);
        wrapper.find("#edit-list-button").simulate("click");
        expect(wrapper.state("edit_list")).toEqual({
            id: 5,
            name: "test list"
        });
    });
    it("Add list form calls  action.", () => {
        const wrapper = setup(false, mount);
        expect(wrapper.find("#add-list-form").length).toEqual(1);
        wrapper.find("#add-list-form").simulate("submit");
        expect(handleAddListCalled).toBe(true);
    });
    it("Edit list form calls  action.", () => {
        const wrapper = setup(false, mount);
        expect(wrapper.find("#edit-list-form").length).toEqual(1);
        wrapper.find("#edit-list-form").simulate("submit");
        expect(handleEditListCalled).toBe(true);
    });
    it("Edit new name change affects state form calls  action.", () => {
        const wrapper = setup(false, mount);
        expect(wrapper.find("#new-list-name").length).toEqual(1);
        wrapper.find("#new-list-name").simulate(
            "change", {target: { value: "Test New Name" } });
        expect(wrapper.state("edit_list")).toEqual({
            id:"",
            name:"",
            new_name: "Test New Name"
        });
    });
    it("correctly maps state to props", () => {
    const state = {
        token: "",
        loading: false,
        lists: {},
        items_details: {}
    };
    const expected = {
        loading: false,
        lists: {},
    };
    expect(mapStateToProps(state)).toEqual(expected);
});
it("correctly maps dispatch to props", () => {
    const dispatch = {
            request: () => {
            },
            Login_User: () => {
            },
            Fetch_Shopping_Lists: () => {
            },
            Add_Shopping_List: () => {
            },
            Edit_Shopping_List: () => {
            },
            Delete_Shopping_List: () => {
            }
        };
    expect(mapDispatchToProps(dispatch)).toEqual(
        expect.objectContaining({
            actions: {
                request: expect.any(Function),
                Fetch_Shopping_Lists: expect.any(Function),
                Add_Shopping_List: expect.any(Function),
                Edit_Shopping_List: expect.any(Function),
                Delete_Shopping_List: expect.any(Function),
            }
        })
    );
});
});
