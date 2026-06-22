import Button from '../../components/forms/Button';

const users = [
  {
    id: 1,
    name: 'Guild Member',
    email: 'member@example.com',
    role: 'Member',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Guild Admin',
    email: 'admin@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Guild Member',
    email: 'member2@example.com',
    role: 'Member',
    status: 'Inactive',
  },
];

function AdminUsersPage() {
  return (
    <section className="admin-form-page">
      <h1>Guild Members</h1>

      <div className="admin-user-list">
        {users.map((user) => (
          <article className="admin-user-card" key={user.id}>
            <div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>

            <div>
              <p>{user.role}</p>
              <p>{user.status}</p>
            </div>

            <Button type="button">View Profile</Button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AdminUsersPage;
