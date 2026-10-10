# Users, Roles, and Access Control

## User Types

- **Super Admin**: Platform-level administrator. Can manage all organisations and has unrestricted access.
- **Org Admin**: Administrator for a single organisation. Can manage users, roles, branches, and all org-level data.
- **Branch Manager**: Manages a specific branch (location group). Access is restricted to data within their branch.
- **Driver**: Field staff user. Access is limited to delivery and trip operations.
- **Packer**: Warehouse staff. Access is limited to order packing and stock operations.

## Roles and Permissions

Roles define what actions a user can perform. Each role has a set of permissions. Users can be assigned one or more roles within an organisation.

### Assigning Roles

1. Go to Users and select the user.
2. Click "Assign Role".
3. Choose the role and, if applicable, the branch scope.

### Custom Roles

Org admins can create custom roles with specific permission sets. Permissions are assigned at the page and action level.

## Branch Access

A user assigned to a branch can only see and operate on data belonging to that branch (locations within the branch). A user with no branch assignment has org-wide access — they can see all branches and locations.

## Authentication

Authentication is handled via Clerk. Users log in with their Clerk account. The ERP maps the Clerk user to an internal user record using the Clerk user ID.

## Inviting Users

Org admins can invite new users by email. The invitee receives an email with a sign-up link. Once they complete sign-up through Clerk, their account is linked to the organisation automatically.

## Locations and Branches

- **Location**: A physical place — a warehouse, store, or factory.
- **Branch**: A group of locations managed together. A branch manager oversees all locations within their branch.

When creating a location, select the branch it belongs to. A location can only belong to one branch.
