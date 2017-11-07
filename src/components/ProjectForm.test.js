import React from "react";
import { ProjectForm } from "./ProjectForm";
import { shallow } from 'enzyme';

describe("ProjectForm", ()=> {
    it("renders without crashing", () => {
        let project = {id:'', name:'', description:'', code:''};
        const wrapper = shallow(<ProjectForm project={project} onSubmit={()=>{}}/>);
        expect(wrapper.containsMatchingElement(<label>Name</label>)).toBe(true);
    });

    describe("asserts status initial", () => {
        let wrapper;

        beforeEach(() => {
            let project = {id:'id', name:'projectName', description:'projectDsc', code:'projectCode'};
            wrapper = shallow(<ProjectForm project={project} onSubmit={()=>{}}/>);
        });

        it("id", () => {
            expect(wrapper.state().fields.id).toEqual("id");
        });

        it("name", () => {
            expect(wrapper.state().fields.name).toEqual("projectName");
        });

        it("description", () => {
            expect(wrapper.state().fields.description).toEqual("projectDsc");
        });

        it("code", () => {
            expect(wrapper.state().fields.code).toEqual("projectCode");
        });
    });

    describe("asserts input changes", () => {
        let wrapper;

        beforeEach(() => {
            let project = {id:'id', name:'', description:'', code:''};
            wrapper = shallow(<ProjectForm project={project} onSubmit={()=>{}}/>);

            const inputName = wrapper.find({name: "name"}).first();
            inputName.simulate('change', { target: { value: 'projectName' } });

            const inputDescription = wrapper.find({name: "description"}).first();
            inputDescription.simulate('change', { target: { value: 'projectDsc' } });

            const inputCode = wrapper.find({name: "code"}).first();
            inputCode.simulate('change', { target: { value: 'projectCode' } });

        });


        it("name", () => {
            expect(wrapper.state().fields.name).toEqual("projectName");
        });

        it("description", () => {
            expect(wrapper.state().fields.description).toEqual("projectDsc");
        });

        it("code", () => {
            expect(wrapper.state().fields.code).toEqual("projectCode");
        });
    });
});