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
  roleDetails: [/^\/roles\/[0-9]+(\?mode=view)?$/],
  roleEdit: [/^\/roles\/[0-9]+\?mode=edit$/],
  rolePermissionsList: [/^\/roles\/[0-9]+\/permissions$/],
  rolePermissionsEdit: [/^\/roles\/[0-9]+\/permissions$/],
};
