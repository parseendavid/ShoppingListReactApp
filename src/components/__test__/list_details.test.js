import React from "react";
import {mount, shallow} from "enzyme";
import {Details, mapDispatchToProps, mapStateToProps} from "../details";
import NavigationBar from "../nav";
import expect from "expect";

let handleDeleteListItemCalled, handleAddListItemCalled, handleEditListItemCalled = false;

describe("Test Details page", () => {
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
                Fetch_Shopping_List_Items: () => {
                },
                Add_Shopping_List_Item: () => {
                    handleAddListItemCalled = true;
                },
                Edit_Shopping_List_Item: () => {
                    handleEditListItemCalled = true;
                },
                Delete_Shopping_List_Item: () => {
                    handleDeleteListItemCalled = true;
                }
            },
            match: {
                params: {
                    id: 11
                }
            },
            loading: loading,
            loggedIn: false,
            items_details: {
                items: {
                    '4': {
                        id: 4,
                        item_name: 'sugar',
                        quantity: 1
                    }
                },
                parent: {
                    list_id: 11,
                    list_name: 'nakumatt'
                }
            },
            state: {
                token: "",
                edit_item: {quantity: "", old_name: "", new_name: "", id: "", parent_id: ""}
            },
            handleSubmit: () => {
            }
        };

        return render_type(<Details {...props} />);
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
    it("delete item button calls Delete_Shopping_List_item action.", () => {
        expect(setup(false, shallow).find("#delete-item-button").length).toEqual(1);
        setup(false, shallow).find("#delete-item-button").simulate("click", {
            preventDefault() {
            }
        });
        expect(handleDeleteListItemCalled).toBe(true);
    });
    it("Add item form calls  action.", () => {
        const wrapper = setup(false, mount);
        expect(wrapper.find("#add-item-form").length).toEqual(1);
        wrapper.find("#add-item-form").simulate("submit");
        expect(handleAddListItemCalled).toBe(true);
    });
    it("Edit item form calls  action.", () => {
        const wrapper = setup(false, mount);
        expect(wrapper.find("#edit-item-form").length).toEqual(1);
        wrapper.find("#edit-item-form").simulate("submit");
        expect(handleEditListItemCalled).toBe(true);
    });
    it("correctly maps state to props", () => {
        const state = {
            token: "",
            loading: false,
            lists: {},
            items_details: {
                items: {
                    '4': {
                        id: 4,
                        item_name: 'sugar',
                        quantity: 1
                    }
                }
            }
        };
        const expected = {
            loading: false,
            items_details: {
                items: {
                    '4': {
                        id: 4,
                        item_name: 'sugar',
                        quantity: 1
                    }
                }
            }
        };
        expect(mapStateToProps(state)).toEqual(expected);
    });
    it("correctly maps dispatch to props", () => {
        const dispatch = {
            request: () => {
            },
            Fetch_Shopping_List_Items: () => {
            },
            Add_Shopping_List_Item: () => {
            },
            Edit_Shopping_List_Item: () => {
            },
            Delete_Shopping_List_Item: () => {
            }
        };
        expect(mapDispatchToProps(dispatch)).toEqual(
            expect.objectContaining({
                actions: {
                    request: expect.any(Function),
                    Fetch_Shopping_List_Items: expect.any(Function),
                    Add_Shopping_List_Item: expect.any(Function),
                    Edit_Shopping_List_Item: expect.any(Function),
                    Delete_Shopping_List_Item: expect.any(Function),
                }
            })
        );
    });
});
