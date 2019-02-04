import {expect} from 'chai';
import {mount} from 'enzyme';
import {head, noop} from 'lodash';
import React from 'react';

import TypeaheadInnerManager from '../../src/base/TypeaheadInnerManager';
import TypeaheadInputSingle from '../../src/TypeaheadInputSingle.react';

import options from '../../example/exampleData';
import {context, getHint, getInput} from '../helpers';

describe('<TypeaheadInputSingle>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <TypeaheadInnerManager
        {...context}
        inputProps={{}}
        labelKey="name"
        options={options}
        selected={[]}
        selectHintOnEnter={false}
        text="">
        {(props) => (
          <TypeaheadInputSingle
            {...props}
            inputRef={noop}
            onAdd={noop}
            onChange={noop}
            onClear={noop}
            onFocus={noop}
          />
        )}
      </TypeaheadInnerManager>
    );
  });

  it('renders a single-select input', () => {
    const input = wrapper.find('.form-control');

    expect(input.length).to.equal(1);
    expect(input.hasClass('rbt-input')).to.equal(true);
    expect(input.hasClass('rbt-input-main')).to.equal(true);
  });

  it('displays the selected text', () => {
    const text = 'text';

    wrapper.setProps({text});

    expect(getInput(wrapper).prop('value')).to.equal(text);
  });

  it('displays a hint', () => {
    const initialItem = head(options);

    wrapper.setProps({
      initialItem,
      isFocused: true,
      isMenuShown: true,
      text: 'Al',
    });

    expect(getHint(wrapper)).to.equal(initialItem.name);
  });

  it('renders with validation classnames', () => {
    wrapper.setProps({
      isInvalid: true,
      isValid: true,
    });

    const input = wrapper.find('.form-control');

    expect(input.hasClass('is-invalid')).to.equal(true);
    expect(input.hasClass('is-valid')).to.equal(true);
  });
});
