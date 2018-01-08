import React from 'react';
import {Redirect} from 'react-router-dom';
import {shallow} from 'enzyme';
import Logout from '../logout';
import expect from "expect";

describe('Log Out page', () => {
    it('should render without errors.', () => {
        expect(shallow(<Logout/>).exists(<Redirect to="/"/>)).toBe(true);
    });
});