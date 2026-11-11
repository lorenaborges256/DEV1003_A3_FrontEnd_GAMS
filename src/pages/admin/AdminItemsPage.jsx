import { useState } from 'react';
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';
import api from '../../services/api';

function AdminItemPage() {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    stockQuantity: '',
    description: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  
async function handleSubmit(e) {
  e.preventDefault();

  try {
    await api.post('/items', {
      ...form,
      price: Number(form.price),
      stockQuantity: Number(form.stockQuantity),
    });

    alert('Item saved successfully!');
  } catch (error) {
    console.error('Failed to save item:', error);
    alert('Unable to save item. Please try again.');
  }
}


  return (
    <section className="admin-form-page">
      <h1>Manage Items</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <Input
          label="Item Name"
          name="name"
          value={form.name}
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
  label="Stock Quantity"
  name="stockQuantity"
  type="number"
  min="0"
  value={form.stockQuantity}
  onChange={handleChange}
  placeholder="Enter quantity"
  required
/>


        <Input
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter item description"
          required
        />

        <Button type="submit">Save Item</Button>
      </form>
    </section>
  );
}

export default AdminItemPage;
