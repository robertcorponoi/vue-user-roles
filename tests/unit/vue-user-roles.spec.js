'use strict'

import { mount, createLocalVue } from '@vue/test-utils';

import VueUserRoles from '../../index';
import ExampleComponent from './example-component.vue';

let localVue;

describe('Plugin initialization', () => {

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueUserRoles);
  });

  afterEach(() => localVue = null);

  it('should add the $user property to the Vue prototype', () => {

    expect(typeof localVue.prototype.$userRole).toBe('string');

  });

  it('should add the $can method to the Vue prototype', () => {

    expect(typeof localVue.prototype.$can).toBe('function');

  });

  it('should add an admin role to the plugin', () => {

    const admin = {
      users: ['edit', 'view'],
      pages: ['delete']
    };

    VueUserRoles.add('admin', admin);

    expect(VueUserRoles.roles.admin).toEqual(admin);

  });

});

describe('Using $can outside of templates', () => {

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueUserRoles);
  });

  afterEach(() => localVue = null);

  it('should return true that the user can perform the action because the user has * permissions for that type', () => {

    const admin = {
      users: ['edit', 'view'],
      pages: '*'
    };

    VueUserRoles.add('admin', admin);

    localVue.prototype.$userRole = 'admin';

    const can = localVue.prototype.$can('edit', 'pages');

    expect(can).toBe(true);

  });

  it('should return true that the user can perform the action because the user has the specified permissions for any type', () => {

    const admin = {
      '*': ['delete', 'edit']
    };

    VueUserRoles.add('admin', admin);

    localVue.prototype.$userRole = 'admin';

    const can = localVue.prototype.$can('edit', 'pages');

    expect(can).toBe(true);

  });

  it('should return true that the user can perform the action because the user has the specified permissions for that type', () => {

    const admin = {
      'users': ['modify', 'arrange'],
      'pages': ['delete', 'edit']
    };

    VueUserRoles.add('admin', admin);

    localVue.prototype.$userRole = 'admin';

    const can = localVue.prototype.$can('edit', 'pages');

    expect(can).toBe(true);

  });

  it('should return true that the user can perform the action because the user has * permissions for * type', () => {

    const admin = {
      '*': '*'
    };

    VueUserRoles.add('admin', admin);

    localVue.prototype.$userRole = 'admin';

    const can = localVue.prototype.$can('edit', 'pages');

    expect(can).toBe(true);

  });

  it('should return false that the user cannot perform the action because the user does not have the specified permissions for any type', () => {

    const admin = {
      '*': ['modify', 'arrange'],
    };

    VueUserRoles.add('admin', admin);

    localVue.prototype.$userRole = 'admin';

    const can = localVue.prototype.$can('organize', 'users');

    expect(can).toBe(false);

  });

  it('should return false that the user cannot perform the action because the user does not have the specified permissions for that type', () => {

    const admin = {
      'users': ['modify', 'arrange'],
      'pages': ['delete', 'edit']
    };

    VueUserRoles.add('admin', admin);

    localVue.prototype.$userRole = 'admin';

    const can = localVue.prototype.$can('organize', 'users');

    expect(can).toBe(false);

  });

  it('should return false that the user cannot perform the action because the user does not have the specified permissions for that type because that type doesnt exist', () => {

    const admin = {
      'users': ['modify', 'arrange'],
      'pages': ['delete', 'edit']
    };

    VueUserRoles.add('admin', admin);

    localVue.prototype.$userRole = 'admin';

    const can = localVue.prototype.$can('modify', 'posts');

    expect(can).toBe(false);

  });

});

describe('Using $can in templates', () => {

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueUserRoles);
  });

  afterEach(() => localVue = null);

  it('should show the span because the user has * permissions for that type', () => {

    const admin = {
      users: ['edit', 'view'],
      pages: '*'
    };

    VueUserRoles.add('admin', admin);

    localVue.prototype.$userRole = 'admin';

    const wrapper = mount(ExampleComponent, {
      localVue
    });

    expect(wrapper.find('#t1').exists()).toBe(true);

  });

  it('should show the span because the user has the permissions for any type', () => {

    const admin = {
      '*': ['delete', 'edit']
    };

    VueUserRoles.add('admin', admin);

    localVue.prototype.$userRole = 'admin';

    const wrapper = mount(ExampleComponent, {
      localVue
    });

    expect(wrapper.find('#t2').exists()).toBe(true);

  });

  it('should show the span because the user has the permissions for that type', () => {

    const admin = {
      'users': ['modify', 'arrange'],
      'pages': ['delete', 'edit']
    };

    VueUserRoles.add('admin', admin);

    localVue.prototype.$userRole = 'admin';

    const wrapper = mount(ExampleComponent, {
      localVue
    });

    expect(wrapper.find('#t3').exists()).toBe(true);

  });

  it('should show the span because the user has * permissions for * type', () => {

    const admin = {
      '*': '*'
    };

    VueUserRoles.add('admin', admin);

    localVue.prototype.$userRole = 'admin';

    const wrapper = mount(ExampleComponent, {
      localVue
    });

    expect(wrapper.find('#t4').exists()).toBe(true);

  });

  it('should not show the span because the user doesnt not have the permissions for any type', () => {

    const admin = {
      '*': ['modify', 'arrange'],
    };

    VueUserRoles.add('admin', admin);

    localVue.prototype.$userRole = 'admin';

    const wrapper = mount(ExampleComponent, {
      localVue
    });

    expect(wrapper.find('#t5').exists()).toBe(false);

  });

  it('should not show the span because the user doesnt have the permissions for that type', () => {

    const admin = {
      'users': ['modify', 'arrange'],
      'pages': ['delete', 'edit']
    };

    VueUserRoles.add('admin', admin);

    localVue.prototype.$userRole = 'admin';

    const wrapper = mount(ExampleComponent, {
      localVue
    });

    expect(wrapper.find('#t6').exists()).toBe(false);

  });

  it('should not show the span because the user doesnt have the permissions for a type that doesnt exist', () => {

    const admin = {
      'users': ['modify', 'arrange'],
      'pages': ['delete', 'edit']
    };

    VueUserRoles.add('admin', admin);

    localVue.prototype.$userRole = 'admin';

    const wrapper = mount(ExampleComponent, {
      localVue
    });

    expect(wrapper.find('#t7').exists()).toBe(false);

  });

});