import { useState } from 'react';
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';
import api from '../../services/api';

function AdminContractsPage() {
  
const [form, setForm] = useState({
  title: '',
  type: '',
  difficulty: '',
  startAt: '',
  endAt: '',
  rewardDescription: '',
  rewardAmount: '',
  maxAcceptances: '',
  description: '',
});


  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  
async function handleSubmit(e) {
  e.preventDefault();

  try {
    await api.post('/contracts', {
      ...form,
      rewardAmount: Number(form.rewardAmount),
      maxAcceptances: Number(form.maxAcceptances),
    });

    alert('Contract saved successfully!');
  } catch (error) {
    console.error('Failed to save contract:', error);
    alert('Unable to save contract. Please try again.');
  }
}

  return (
    <section className="admin-form-page">
      <h1>Manage Contracts</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <Input
          label="Contract Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter contract title"
          required
        />

        
<Input
  label="Contract Type"
  name="type"
  value={form.type}
  onChange={handleChange}
  placeholder="Enter contract type"
  required
/>

<Input
  label="Difficulty"
  name="difficulty"
  value={form.difficulty}
  onChange={handleChange}
  placeholder="Enter difficulty level"
  required
/>


        
        
<Input
  label="Open Date"
  name="startAt"
  type="date"
  value={form.startAt}
  onChange={handleChange}
  required
/>

<Input
  label="Close Date"
  name="endAt"
  type="date"
  value={form.endAt}
  onChange={handleChange}
  required
/>


        
<Input
  label="Reward Description"
  name="rewardDescription"
  value={form.rewardDescription}
  onChange={handleChange}
  placeholder="Enter reward description"
  required
/>

<Input
  label="Reward Amount"
  name="rewardAmount"
  type="number"
  value={form.rewardAmount}
  onChange={handleChange}
  placeholder="Enter reward amount"
  required
/>


        
<Input
  label="Places Available"
  name="maxAcceptances"
  type="number"
  min="1"
  value={form.maxAcceptances}
  onChange={handleChange}
  placeholder="Enter available places"
  required
/>


        <Input
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter contract description"
          required
        />

        <Button type="submit">Save Contract</Button>
      </form>
    </section>
  );
}

export default AdminContractsPage;
