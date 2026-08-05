import { useState } from 'react';
import { submitCustomRequest } from '../../services/api';

export function useContatoPage() {
  const [form, setForm] = useState({ nome: '', email: '', whatsapp: '', ideia: '' });
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function setField<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submitCustomRequest({ ...form, referenceImage });
    setSubmitted(true);
  }

  return { form, setField, referenceImage, setReferenceImage, submitted, handleSubmit };
}
