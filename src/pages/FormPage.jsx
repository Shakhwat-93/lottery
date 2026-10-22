import React, { useEffect } from 'react';
import OnlineForm from '../components/OnlineForm';
import FormVideoPopup from '../components/FormVideoPopup';

export default function FormPage() {
  useEffect(() => {
    document.body.classList.add('form-page');
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove('form-page');
    };
  }, []);

  return (
    <>
      <FormVideoPopup videoSrc="/form-intro-video.mp4" />
      <main className="form-page-main form-page-standalone">
        <OnlineForm isStandalonePage={true} />
      </main>
    </>
  );
}
