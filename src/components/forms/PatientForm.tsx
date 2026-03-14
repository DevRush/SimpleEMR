import { useState } from 'react';
import { db } from '@/db';
import type { Patient } from '@/types/patient';
import { generateId } from '@/utils/id';
import { nowISO } from '@/utils/format';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { Button } from '@/components/shared/Button';

interface PatientFormProps {
  existing?: Patient;
  onSave: (id: string) => void;
  onCancel: () => void;
}

export function PatientForm({ existing, onSave, onCancel }: PatientFormProps) {
  const [firstName, setFirstName] = useState(existing?.firstName || '');
  const [lastName, setLastName] = useState(existing?.lastName || '');
  const [dob, setDob] = useState(existing?.dob || '');
  const [sex, setSex] = useState<'male' | 'female' | 'other'>(existing?.sex || 'female');
  const [phone, setPhone] = useState(existing?.phone || '');
  const [address, setAddress] = useState(existing?.address || '');
  const [notes, setNotes] = useState(existing?.notes || '');
  const [saving, setSaving] = useState(false);

  const isValid = firstName.trim() && lastName.trim() && dob && sex;

  async function handleSave() {
    if (!isValid || saving) return;
    setSaving(true);

    const now = nowISO();
    const id = existing?.id || generateId();

    const patient: Patient = {
      id,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dob,
      sex: sex as Patient['sex'],
      phone: phone.trim() || undefined,
      address: address.trim() || undefined,
      notes: notes.trim() || undefined,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };

    if (existing) {
      await db.patients.update(id, patient);
    } else {
      await db.patients.add(patient);
    }

    onSave(id);
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-6">
        {existing ? 'Edit Patient' : 'New Patient'}
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name *"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            autoFocus
          />
          <Input
            label="Last Name *"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Date of Birth *"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <Select
            label="Sex *"
            value={sex}
            onChange={(e) => setSex(e.target.value as 'male' | 'female' | 'other')}
            options={[
              { value: 'female', label: 'Female' },
              { value: 'male', label: 'Male' },
              { value: 'other', label: 'Other' },
            ]}
          />
        </div>

        <Input
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          type="tel"
        />

        <Input
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Village, district, or address"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes (allergies, chronic conditions, etc.)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., Penicillin allergy, Hypertension"
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid || saving} className="flex-1">
            {saving ? 'Saving...' : existing ? 'Update Patient' : 'Create Patient'}
          </Button>
        </div>
      </div>
    </div>
  );
}
