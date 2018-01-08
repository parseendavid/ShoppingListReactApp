import React from 'react';
import {mount, shallow} from 'enzyme';
import HomePage from '../home_page';
import NavigationBar from '../nav';
import expect from "expect";

describe('Home page', () => {
    it('should render without errors.', () => {
        expect(shallow(<HomePage/>).exists(<div className="badge"/>)).toBe(true);
    });
    it('should have nav bar.', () => {
        expect(mount(<HomePage/>).exists(<NavigationBar/>)).toBe(true);
    });
});