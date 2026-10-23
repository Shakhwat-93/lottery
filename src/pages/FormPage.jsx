import React, { useEffect } from 'react';
import OnlineForm from '../components/OnlineForm';

export default function FormPage() {
  useEffect(() => {
    document.body.classList.add('form-page');
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove('form-page');
    };
  }, []);

  return (
    <main className="form-page-main form-page-standalone">
      <OnlineForm isStandalonePage={true} />
    </main>
  );
}
