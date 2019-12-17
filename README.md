<div align="center">

# Vue User Roles

</div>

<div align="center">

A simple way to add and check for user permissions in your Vue app.

</div>

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/vue-user-roles.svg?style=flat)](https://www.npmjs.com/package/vue-user-roles)
  [![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/vue-user-roles/badge.svg)](https://snyk.io/test/github/robertcorponoi/vue-user-roles)
  ![npm](https://img.shields.io/npm/dt/vue-user-roles)
  [![NPM downloads](https://img.shields.io/npm/dm/vue-user-roles.svg?style=flat)](https://www.npmjs.com/package/vue-user-roles)
  <a href="https://badge.fury.io/js/vue-user-roles"><img src="https://img.shields.io/github/issues/robertcorponoi/vue-user-roles.svg" alt="issues" height="18"></a>
  <a href="https://badge.fury.io/js/vue-user-roles"><img src="https://img.shields.io/github/license/robertcorponoi/vue-user-roles.svg" alt="license" height="18"></a>
  [![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

**Table of Contents**

- [Installation](#installation)
- [Initialization](#initialization)
- [Creating Roles](#creating-roles)
- [Setting The User's Role](#setting-the-users-role)
- [Checking Permissions](#checking-permissions);
- [Tests]

## **Installation**

To install Vue User Roles, use:

```bash
$ npm install vue-user-roles
```

## **Initialization**

To use Vue User Roles in your Vue app, you have to import it in your `main.js` file and add it to Vue like so:

```js
import Vue from 'vue';
import VueUserRoles from 'vue-user-roles';

Vue.use(VueUserRoles);
```

## **Creating Roles**

First things first, you have to create the roles you want Vue User Roles to use. A user role is an Object that consists of one or more key value pairs with the keys defining the type of permission and the values being an array of actions that can be performed for that type by that role.

You can think of a type as something like users, pages, posts and actions like edit, view, manage.

**Note:** Types and actions can be whatever you want.

Here is an example of a role:

```js
const editor = {
  posts: ['edit', 'delete'],
  pages: ['create']
};
```

This defines an editor role that can edit or delete posts and it can create pages. Now to add it to Vue User Roles, simply do:

```js
VueUserRoles.add('editor', editor);
```

This adds a role named 'editor' with the Object we created above.

**Bonus**

Types and actions can also be wildcards. Here is an example of a type wildcard:

```js
const editor = {
  '*': ['edit', 'delete']
};
```

This gives the role the edit and delete permission on any type. Note that if you add any other types they will be ignored since the wildcard type was used.

You can also use a wildcard as the action. This is helpful for creating admin roles.

```js
const admin = {
  posts: '*',
  pages: '*'
};
```

Which would give that role permission to perform any actions on posts and pages.

You can even take it one step further and have a wildcard type and a wildcard action.

```js
const admin = {
  '*': '*'
};
```

Now the admin can do anything and everything.

## **Setting the Users Role**

Before you can check for permissions you have to set this users role. This property is a part of the Vue prototype so you can set it at any point in your application.

As soon as your user logs in or you know their role, you should assign it to:

```js
this.$userRole = 'admin';
```

## **Checking Permissions**

After you have created the permissions and set the user's role, you're ready to check for permissions.

Checking for permissions can be done with the `$can` prototype method.

For example, if you want to know if the current user can edit a page, you would do:

```js
const userHasPermission = this.$can('edit', 'page');
```

The first parameter is the action and the second parameter is the type. This makes it natural to read like: Can they edit a page?

You could also use this in a template to show/hide something or anything else with conditional rendering:

```html
<span v-if="$can('edit', 'page')">Hello World!</span>
```

## **Tests**

To run all of the available tests for Vue User Roles, use:

```bash
$ npm run test:unit
```

## **License**

MIT