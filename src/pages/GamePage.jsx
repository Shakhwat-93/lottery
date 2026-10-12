import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PAPERS = [
  { id: 1, label: 'Paper 01', src: '/assets/game/game-01.jpg', isLarge: true },
  { id: 2, label: 'Paper 02', src: '/assets/game/game-02.jpg' },
  { id: 3, label: 'Paper 03', src: '/assets/game/game-03.jpg' },
  { id: 4, label: 'Paper 04', src: '/assets/game/game-04.jpg' },
  { id: 5, label: 'Paper 05', src: '/assets/game/game-05.jpg' },
  { id: 6, label: 'Paper 06', src: '/assets/game/game-06.jpg' },
  { id: 7, label: 'Paper 07', src: '/assets/game/game-08.jpg' },
  { id: 8, label: 'Paper 08', src: '/assets/game/game-09.jpg' }
];

export default function GamePage() {
  useScrollReveal();

  useEffect(() => {
    document.body.classList.add('game-page');
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove('game-page');
    };
  }, []);

  return (
    <>
      <Header page="game" />
      <main>
        <section className="game-hero reveal-on-scroll">
          <div className="game-hero-copy">
            <p className="eyebrow">งวดปี 2569 • 100% Sure • ১০০% নিশ্চিত লটারি পেপার</p>
            <h1>Official 100% Sure Papers</h1>
            <p>
              থাইল্যান্ড লটারির প্রতিটি ড্রয়ের জন্য অনুমোদিত ১০০% নিশ্চিত পেপার এবং নম্বর চার্ট। মোবাইল থেকে সহজে দেখুন ও সরাসরি সংগ্রহ করুন।
            </p>

            <div className="badge-row" aria-label="Game trust badges">
              <span className="premium-badge badge-green">
                <span className="badge-symbol">&#10003;</span>
                <span>
                  <strong>Updated (আপডেট)</strong>
                  <small>งวดล่าสุด 2569</small>
                </span>
              </span>
              <span className="premium-badge badge-gold">
                <span className="badge-symbol">&#9733;</span>
                <span>
                  <strong>Premium Papers</strong>
                  <small>ชุดเอกสาร • অরিজিনাল</small>
                </span>
              </span>
            </div>
          </div>

          <figure className="game-hero-image">
            <span className="document-badge">Latest Paper</span>
            <img src="/assets/game/game-01.jpg" alt="Featured 100% Sure lottery paper" />
          </figure>
        </section>

        <section className="section game-gallery-section reveal-on-scroll" id="game-papers">
          <div className="section-heading">
            <p className="eyebrow">เอกสารเกม • Sure Game Papers • নিশ্চিত গেম পেপার</p>
            <h2>Official 100% Sure Paper Gallery</h2>
            <p>
              সকল অরিজিনাল পেপার স্পষ্ট রেজোলিউশনে নিচে সাজানো রয়েছে। প্রতিটি পেপার মনোযোগ সহকারে যাচাই করুন।
            </p>
          </div>

          <div className="game-gallery">
            {PAPERS.map((paper) => (
              <article
                key={paper.id}
                className={`game-card ${paper.isLarge ? 'game-card-large' : ''}`}
              >
                <span className="card-badge">{paper.label}</span>
                <img
                  src={paper.src}
                  alt={`Thailand lottery game ${paper.label}`}
                  loading="lazy"
                />
              </article>
            ))}
          </div>
        </section>

        <section className="game-panel reveal-on-scroll" id="download">
          <div>
            <p className="eyebrow">เข้าสู่หน้าเกม</p>
            <h2>DOWN GAME 100%</h2>
            <p>ตรวจดูเอกสารทั้งหมดในหน้านี้ หรือเปิดหน้าเกมต้นทางเพิ่มเติม</p>
          </div>
          <a
            className="button primary"
            href="https://sites.google.com/view/sakilkhan56/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            เปิดหน้าเดิม
          </a>
        </section>
      </main>
      <Footer page="game" />
    </>
  );
}
