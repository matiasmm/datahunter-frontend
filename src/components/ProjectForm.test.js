import React from "react";
import { ProjectForm } from "./ProjectForm";
import { shallow } from 'enzyme';

describe("ProjectForm", ()=> {
    it("renders without crashing", () => {
        let project = {id:'', name:'', description:'', code:''}
        const wrapper = shallow(<ProjectForm project={project} onSubmit={()=>{}}/>);
    });
});