/**
 * @jest-environment jsdom
 */

const createForm = require('../form');

describe('the CreateForm function', () => {
    const returnForm = createForm();

    it('Should create a form element', () =>{
      expect(returnForm.tagName).toBe('FORM');
    });

    it('Should be deferent than null', () =>{
      expect(returnForm.tagName).not.toBeNull();
    });

    it('Should not be empty', () =>{
      expect(returnForm.tagName).not.toBe('');
    });

    it('Should not be an a div', () =>{
      expect(returnForm.tagName).not.toBe('div');
    });

    it('Should create a form element', () =>{
      expect(returnForm.tagName).toBe('FORM');
    });

    it('Should contain an input tag', () =>{
      expect(returnForm.innerHTML).toContain('input');
    });

    it('Should contain an button tag', () =>{
      expect(returnForm.innerHTML).toContain('button');
    });

    it('Should contain an element with id submit-name', () =>{
      expect(returnForm.innerHTML).toContain('submit-name');
    });

    it('Should contain an element with id name-input', () =>{
      expect(returnForm.innerHTML).toContain('name-input');
    });

    it('Should contain an element with type text', () =>{
      expect(returnForm.innerHTML).toContain('text');
    });

    it('Should contain an element with class btn', () =>{
      expect(returnForm.innerHTML).toContain('btn');
    });

    it('Should contain an element with class btn-primary', () =>{
      expect(returnForm.innerHTML).toContain('btn-primary');
    });
});