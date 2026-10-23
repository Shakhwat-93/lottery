import React, { useEffect, useState } from 'react';
import OnlineForm from '../components/OnlineForm';
import LogoPageTransition from '../components/LogoPageTransition';

export default function FormPage() {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    document.body.classList.add('form-page');
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove('form-page');
    };
  }, []);

  return (
    <>
      {showTransition && (
        <LogoPageTransition onComplete={() => setShowTransition(false)} />
      )}
      <main className="form-page-main form-page-standalone">
        <OnlineForm isStandalonePage={true} />
      </main>
    </>
  );
}
