import { useState } from 'react';
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';

function AdminItemPage() {
  const [form, setForm] = useState({
    itemName: '',
    category: '',
    price: '',
    availability: '',
    description: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // eslint-disable-next-line no-console
    console.log('Item saved:', form);
  }

  return (
    <section className="admin-form-page">
      <h1>Manage Items</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <Input
          label="Item Name"
          name="itemName"
          value={form.itemName}
          onChange={handleChange}
          placeholder="Enter item name"
          required
        />

        <Input
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Enter item category"
          required
        />

        <Input
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="50"
          required
        />

        <Input
          label="Availability"
          name="availability"
          value={form.availability}
          onChange={handleChange}
          placeholder="Available"
          required
        />

        <Input
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter item description"
        />

        <Button type="submit">Save Item</Button>
      </form>
    </section>
  );
}

export default AdminItemPage;
