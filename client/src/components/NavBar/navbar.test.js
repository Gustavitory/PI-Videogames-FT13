import React from 'react';
import { NavLink} from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Navbar from './Navbar.jsx';

configure({adapter: new Adapter()});

describe('<Navbar />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Navbar />)
  })

  it('Deberia renderizar dos <NavLink />', () => {
    expect(wrapper.find(NavLink)).toHaveLength(2);
  });
  it('El primer Link debe tener el texto "HOME" y cambiar la ruta hacia "/home".', () => {
    //el orden donde declaran los Links es importante
    expect(wrapper.find(NavLink).at(0).prop('to')).toEqual('/home');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(NavLink).at(0).text()).toEqual('HOME');
  });
  it('El segundo Link debe tener el texto "ADD" y cambiar la ruta hacia "/home/add"', () => {
    expect(wrapper.find(NavLink).at(1).prop('to')).toEqual('/home/add');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(NavLink).at(1).text()).toEqual('ADD');
  });
})