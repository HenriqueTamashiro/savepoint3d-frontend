import { useState } from 'react';
import { subscribeNewsletter } from '../../services/api';

export function useNewsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await subscribeNewsletter(email);
    setSubmitted(true);
  }

  return { email, setEmail, submitted, handleSubmit };
}
