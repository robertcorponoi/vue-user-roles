'use strict'

export default {
  /**
   * A collection of the roles created.
   * 
   * @property {Object}
   */
  roles: {},

  /**
   * Adds a role to the collection of user roles.
   * 
   * If an asterisk is used as the value when all actions are considered valid for that type.
   * 
   * If an asterisk used as the key, then the specified actions are valid for all types.
   * 
   * @param {string} name The name of the role to add.
   * @param {Object} permissions An object of permissions with the permission name as the key and the permission actions as an array.
   * 
   * @example
   * 
   * const adminRole = {
   *  user: ['edit', 'add'],
   *  page: ['edit', 'delete']
   * };
   * 
   * VueUserRoles.add('admin', adminRole);
   * 
   * @example
   * 
   * const adminRole = {
   *  user: '*',
   *  page: 'edit'
   * };
   * 
   * VueUserRoles.add('admin', adminRole);
   * 
   * @example
   * 
   * cosnt adminRole = {
   *  '*': '*'
   * };
   * 
   * VueUserRoles.add('admin', adminRole);
   */
  add(name, permissions) {
    this.roles[name] = permissions;
  },

  /**
   * Checks the provided user permissions against the type and action to see if there's a match.
   * 
   * @private
   * 
   * @param {Object} userPermissions The permissons specific to the user of the application.
   * @param {string} type The type of action to perform.
   * @param {string} action The action to perform.
   * 
   * @returns {boolean} Returns true if the user has permission to perform the action or false otherwise.
   */
  _checkTypePermissions(userPermissions, type, action) {
    if (Array.isArray(userPermissions[type])) return userPermissions[type].includes(action);
    else if (userPermissions[type] === '*') return true;
  },

  /**
   * @param {Vue} vue A reference to the local Vue object.
   */
  install(Vue) {
    /**
     * The role of the user using the application.
     * 
     * @property {string}
     */
    Vue.prototype.$userRole = '';

    /**
     * Determines if the user has the permissions to perform an operation.
     * 
     * @param {string} action The action to perform.
     * @param {string} type The type of action to perform.
     * 
     * @example
     * 
     * <router-link to="users" v-if="$can('view', 'users')">Users</router-link>
     * 
     * @example
     * 
     * methods: {
     *  editUser() {
     *    if (this.$can('edit', 'users')) {
     *      /// The user has permission.
     *    }
     *  }
     * }
     */
    Vue.prototype.$can = (action, type) => {
      const userPermissions = this.roles[Vue.prototype.$userRole];

      const isAnyType = Object.keys(userPermissions)[0] === '*';

      if (isAnyType) {
        return this._checkTypePermissions(userPermissions, '*', action);
      } else {
        if (!userPermissions[type]) return false;

        return this._checkTypePermissions(userPermissions, type, action);
      }
    }
  }
};