import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, MapPin, Check } from "lucide-react";

import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../../services/address.service";

import styles from "./Addresses.module.css";

const initialForm = {
  name: "",
  phone: "",
  house: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
};

const Addresses = ({ onSelectAddress }) => {
  const [addresses, setAddresses] = useState([]);

  const [form, setForm] = useState(initialForm);

  const [editingId, setEditingId] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const fetchAddresses = async () => {
    try {
      const res = await getAddresses();

      console.log("ADDRESS DATA:", res);

      setAddresses(res || []);
    } catch (error) {
      console.log("Address fetch error:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateAddress(editingId, form);
      } else {
        await createAddress(form);
      }

      setForm(initialForm);

      setEditingId(null);

      setShowForm(false);

      fetchAddresses();
    } catch (error) {
      console.log("Save address error:", error);
    }
  };

  const handleEdit = (address) => {
    setForm({
      name: address.name || "",

      phone: address.phone || "",

      house: address.house || "",

      city: address.city || "",

      state: address.state || "",

      pincode: address.pincode || "",

      country: address.country || "India",
    });

    setEditingId(address.id);

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAddress(id);

      fetchAddresses();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const handleSelect = (address) => {
    console.log("ADDRESS SELECTED:", address);

    setSelectedAddress(address);

    if (onSelectAddress) {
      onSelectAddress(address);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>
          <MapPin size={22} />
          My Addresses
        </h2>

        <button
          type="button"
          onClick={() => {
            setShowForm(!showForm);

            setEditingId(null);

            setForm(initialForm);
          }}
        >
          <Plus size={18} />
          Add Address
        </button>
      </div>

      {showForm && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            name="house"
            placeholder="House / Address"
            value={form.house}
            onChange={handleChange}
            required
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />

          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            required
          />

          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {editingId ? "Update Address" : "Save Address"}
          </button>
        </form>
      )}

      <div className={styles.addressGrid}>
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`${styles.card}

                ${selectedAddress?.id === address.id ? styles.selected : ""}`}
          >
            <h3>{address.name}</h3>

            <p>{address.phone}</p>

            <p>{address.house}</p>

            <p>
              {address.city},{address.state}
            </p>

            <p>
              {address.pincode},{address.country}
            </p>

            <div className={styles.actions}>
              <button type="button" onClick={() => handleSelect(address)}>
                {selectedAddress?.id === address.id ? (
                  <Check size={16} />
                ) : (
                  "Select"
                )}
              </button>

              <button type="button" onClick={() => handleEdit(address)}>
                <Edit size={16} />
              </button>

              <button type="button" onClick={() => handleDelete(address.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addresses;
