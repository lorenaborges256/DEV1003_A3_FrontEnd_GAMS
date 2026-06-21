import { useState } from 'react';
import Input from '../../components/forms/Input';

function AdminContractsPage() {
  const [form, setForm] = useState({
    title: '',
    difficultyType: '',
    availability: '',
    openDate: '',
    closeDate: '',
    reward: '',
    placesAvailable: '',
    description: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // eslint-disable-next-line no-console
    console.log('Contract saved:', form);
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
          label="Difficulty / Type"
          name="difficultyType"
          value={form.difficultyType}
          onChange={handleChange}
          placeholder="Easy / Combat"
          required
        />

        <Input
          label="Availability"
          name="availability"
          value={form.availability}
          onChange={handleChange}
          placeholder="Available or Upcoming"
          required
        />

        <Input
          label="Open Date"
          name="openDate"
          type="date"
          value={form.openDate}
          onChange={handleChange}
          required
        />

        <Input
          label="Close Date"
          name="closeDate"
          type="date"
          value={form.closeDate}
          onChange={handleChange}
          required
        />

        <Input
          label="Reward"
          name="reward"
          type="number"
          value={form.reward}
          onChange={handleChange}
          placeholder="200"
          required
        />

        <Input
          label="Places Available"
          name="placesAvailable"
          type="number"
          value={form.placesAvailable}
          onChange={handleChange}
          placeholder="3"
          required
        />

        <Input
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter contract description"
        />

        <button type="submit" className="admin-form-button">
          Save Contract
        </button>
      </form>
    </section>
  );
}

export default AdminContractsPage;
