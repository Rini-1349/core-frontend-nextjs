export const routesPermissions = {
  // Correspondance Symfony -> Next.js
  usersList: ["/users"],
  newUser: ["/users/new"],
  userDetails: [/^\/users\/[0-9]+(\?mode=view)?$/],
  userEdit: [/^\/users\/[0-9]+\?mode=edit$/],
  userEditPassword: [/^\/users\/[0-9]+\/edit-password$/],
  removeUser: [/^\/users\/[0-9]+\/delete$/],
  rolesList: ["/roles"],
  newRole: ["/roles/new"],
  roleDetails: [/^\/roles\/[A-Z_]+(\?mode=view)?$/],
  roleEdit: [/^\/roles\/[A-Z_]+\?mode=edit$/],
  rolePermissionsList: [/^\/roles\/[A-Z_]+\/permissions$/],
  rolePermissionsEdit: [/^\/roles\/[A-Z_]+\/permissions$/],
};

export const routesGroups = {
  users: [...routesPermissions.usersList, ...routesPermissions.newUser, ...routesPermissions.userDetails, ...routesPermissions.userEdit, ...routesPermissions.userEditPassword, ...routesPermissions.removeUser],
  roles: [...routesPermissions.rolesList, ...routesPermissions.newRole, ...routesPermissions.roleDetails, ...routesPermissions.roleEdit, ...routesPermissions.rolePermissionsList, ...routesPermissions.rolePermissionsEdit],
};
