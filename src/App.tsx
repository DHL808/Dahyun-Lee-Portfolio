import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Mail, 
  Linkedin, 
  ExternalLink, 
  Download, 
  Upload, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Menu
} from 'lucide-react';
import { portfolioData } from './data/portfolio';
import { Category, Project } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'profile' | 'contact'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>(portfolioData.resumeImageUrl ? [portfolioData.resumeImageUrl] : []);
  const [resumePage, setResumePage] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom Cursor Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const followMouse = () => {
      setRingPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.15,
        y: prev.y + (mousePos.y - prev.y) * 0.15,
      }));
      requestAnimationFrame(followMouse);
    };
    const frame = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(frame);
  }, [mousePos]);

  const handlePageChange = (page: 'home' | 'profile' | 'contact') => {
    setCurrentPage(page);
    setSelectedCategory(null);
    window.scrollTo(0, 0);
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    window.scrollTo(0, 0);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    processFiles(files);
  };

  const processFiles = (files: FileList) => {
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    const readers = imageFiles.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(results => {
      setUploadedImages(results);
      setResumePage(0);
    });
  };

  const removeImage = () => {
    setUploadedImages([]);
    setResumePage(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadResume = () => {
    if (uploadedImages.length === 0) {
      alert('먼저 이력서 이미지를 업로드해주세요.');
      return;
    }
    uploadedImages.forEach((src, i) => {
      const a = document.createElement('a');
      a.href = src;
      a.download = `Dahyun_Lee_Resume_${i + 1}.png`;
      a.click();
    });
  };

  return (
    <div className="min-h-screen selection:bg-green-mid selection:text-white">
      {/* Custom Cursor */}
      <div 
        className="cursor" 
        style={{ left: mousePos.x, top: mousePos.y, transform: `translate(-50%, -50%) scale(${isHovering ? 2.2 : 1})` }} 
      />
      <div 
        className="cursor-ring" 
        style={{ left: ringPos.x, top: ringPos.y, transform: 'translate(-50%, -50%)' }} 
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-8 md:px-20 py-6 bg-[rgba(247,245,240,0.9)] backdrop-blur-xl border-b border-[var(--line)]">
        <button 
          onClick={() => handlePageChange('home')}
          className="font-serif text-lg text-[var(--ink)] tracking-tight cursor-none"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Dahyun <span className="italic text-[var(--green)]">Lee</span>
        </button>
        <ul className="flex items-center gap-10">
          <li className="relative group">
            <button 
              onClick={() => handlePageChange('home')}
              className={`font-mono text-[11px] tracking-[0.18em] uppercase transition-colors cursor-none ${currentPage === 'home' ? 'text-[var(--ink)]' : 'text-[var(--ink3)] hover:text-[var(--ink)]'}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Home
              {currentPage === 'home' && <div className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[var(--green)]" />}
            </button>
            {/* Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-[-6px] group-hover:translate-y-0">
              <div className="bg-white border border-[var(--line)] min-w-[180px] shadow-xl">
                {portfolioData.categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat)}
                    className="w-full text-left px-5 py-3 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--ink3)] hover:text-[var(--green)] hover:bg-[var(--green-lt)] border-b border-[var(--line)] last:border-0 transition-all cursor-none"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </li>
          <li>
            <button 
              onClick={() => handlePageChange('profile')}
              className={`font-mono text-[11px] tracking-[0.18em] uppercase transition-colors cursor-none relative ${currentPage === 'profile' ? 'text-[var(--ink)]' : 'text-[var(--ink3)] hover:text-[var(--ink)]'}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Profile
              {currentPage === 'profile' && <div className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[var(--green)]" />}
            </button>
          </li>
          <li>
            <button 
              onClick={() => handlePageChange('contact')}
              className={`font-mono text-[11px] tracking-[0.18em] uppercase transition-colors cursor-none relative ${currentPage === 'contact' ? 'text-[var(--ink)]' : 'text-[var(--ink3)] hover:text-[var(--ink)]'}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Contact
              {currentPage === 'contact' && <div className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[var(--green)]" />}
            </button>
          </li>
        </ul>
      </nav>

      {/* Status Bar */}
      <div className="fixed bottom-8 left-8 md:left-20 flex items-center gap-3 z-[100]">
        <div className="w-[7px] h-[7px] rounded-full bg-[var(--green-mid)] animate-pulse-custom" />
        <span className="font-mono text-[10px] tracking-[0.15em] text-[var(--ink3)] uppercase">
          {currentPage === 'home' ? (selectedCategory ? selectedCategory.name : 'Portfolio 2026') : currentPage === 'profile' ? 'UX/UI Designer' : 'Seoul, KR'}
        </span>
      </div>
      <div className="fixed bottom-8 right-8 md:right-20 font-mono text-[10px] text-[var(--ink3)] tracking-[0.1em] z-[100]">
        {currentPage === 'home' ? '01 / 03' : currentPage === 'profile' ? '02 / 03' : '03 / 03'}
      </div>

      <main className="pt-24">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && !selectedCategory && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Section */}
              <section className="min-h-[calc(100vh-96px)] flex flex-col justify-end px-8 md:px-20 pb-24 relative overflow-hidden">
                <div className="hero-deco absolute top-0 right-0 bottom-0 w-[45%] bg-[var(--bg2)] z-0" />
                <div className="absolute top-24 right-20 w-[180px] h-[180px] rounded-full border border-[var(--line)] z-1" />
                <div className="absolute top-1/2 right-[18%] w-[1px] h-[30vh] bg-linear-to-b from-transparent via-[var(--green-mid)] to-transparent z-1" />
                
                <div className="relative z-10">
                  <span className="font-mono text-[11px] tracking-[0.28em] text-[var(--green)] uppercase mb-5 block">— UX/UI Designer</span>
                  <h1 className="font-serif text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.95] tracking-tight text-[var(--ink)] mb-4">
                    Dahyun<br /><span className="italic text-[var(--green)]">Lee</span>
                  </h1>
                  <p className="font-mono text-[12px] tracking-[0.22em] text-[var(--ink3)] uppercase mb-8">{portfolioData.role}</p>
                  <p className="max-w-[400px] text-[14px] text-[var(--ink2)] leading-[1.85] font-light">{portfolioData.description}</p>
                </div>

                <div className="absolute right-20 bottom-16 z-10 flex flex-col items-center gap-3">
                  <div className="w-[1px] h-[50px] bg-[var(--line)] relative overflow-hidden animate-scroll-down" />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--ink3)] uppercase [writing-mode:vertical-rl]">Scroll</span>
                </div>
              </section>

              {/* Category Grid */}
              <div className="px-8 md:px-20 py-8 flex items-center gap-4">
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--ink3)]">Works</span>
                <div className="flex-1 h-[1px] bg-[var(--line)]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 md:px-20 pb-24 border-t border-[var(--line)] pt-12">
                {portfolioData.categories.map((cat, idx) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="group border border-[var(--line)] bg-white p-10 text-left relative overflow-hidden transition-all duration-300 hover:border-[var(--green)] hover:shadow-2xl hover:-translate-y-1 rounded-sm cursor-none"
                  >
                    <div className="font-mono text-[10px] tracking-[0.15em] text-[var(--ink3)] mb-8">0{idx + 1}</div>
                    <div className="font-serif text-[4rem] text-[var(--green-lt)] leading-none mb-5 transition-colors group-hover:text-[var(--green-mid)]">{cat.letter}</div>
                    <h3 className="font-serif text-[1.4rem] text-[var(--ink)] mb-3 tracking-tight">{cat.name}</h3>
                    <p className="text-[13px] text-[var(--ink3)] leading-relaxed font-light">{cat.description}</p>
                    <div className="absolute bottom-6 right-6 w-[34px] h-[34px] border border-[var(--line)] rounded-full flex items-center justify-center transition-all group-hover:bg-[var(--green)] group-hover:border-[var(--green)]">
                      <ArrowUpRight className="w-4 h-4 text-[var(--ink3)] group-hover:text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {currentPage === 'home' && selectedCategory && (
            <motion.div
              key={selectedCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-8 md:px-20 py-24 min-h-screen"
            >
              <div className="flex items-baseline gap-6 mb-16 border-b border-[var(--line)] pb-8">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="font-mono text-[11px] tracking-[0.15em] text-[var(--ink3)] uppercase border border-[var(--line)] px-4 py-2 rounded-sm hover:border-[var(--green)] hover:text-[var(--green)] transition-all cursor-none"
                >
                  ← Back
                </button>
                <h2 className="font-serif text-[clamp(3rem,6vw,5.5rem)] text-[var(--ink)] leading-none flex-1">{selectedCategory.name}</h2>
                <span className="font-mono text-[11px] text-[var(--green)] tracking-[0.15em]">// {selectedCategory.projects.length} works</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedCategory.projects.map(project => (
                  <div 
                    key={project.id}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="group cursor-none overflow-hidden rounded-sm border border-[var(--line)] bg-white transition-all hover:shadow-2xl hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] bg-[var(--bg2)] flex items-center justify-center relative overflow-hidden">
                      <span className="font-serif text-[3rem] text-[var(--bg3)] italic transition-transform duration-500 group-hover:scale-110">{project.placeholder}</span>
                      <span className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.12em] uppercase bg-[var(--green)] text-white px-2 py-1 rounded-[2px]">{project.tag}</span>
                    </div>
                    <div className="p-5">
                      <h4 className="text-[14px] font-medium text-[var(--ink)] mb-1">{project.title}</h4>
                      <p className="font-mono text-[10px] text-[var(--green)] tracking-[0.1em]">{project.type} · {project.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentPage === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen"
            >
              <div className="h-[46vh] flex items-end px-8 md:px-20 pb-14 bg-[var(--bg2)] border-b border-[var(--line)] relative overflow-hidden">
                <div className="absolute -bottom-16 right-20 font-serif italic text-[14rem] text-transparent [-webkit-text-stroke:1px_var(--line)] select-none pointer-events-none leading-none">DL</div>
                <div className="flex items-end gap-10 w-full relative z-10">
                  <div className="w-[100px] h-[100px] rounded-full bg-[var(--green-lt)] border-2 border-[var(--green-mid)] flex items-center justify-center font-serif text-[2.2rem] text-[var(--green)] italic shrink-0">D</div>
                  <div className="flex-1">
                    <h1 className="font-serif text-[2.8rem] text-[var(--ink)] leading-tight mb-2">{portfolioData.name}</h1>
                    <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--green)] uppercase">{portfolioData.role}</p>
                  </div>
                  <button 
                    onClick={downloadResume}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="px-8 py-4 border-[1.5px] border-[var(--green)] font-mono text-[11px] tracking-[0.18em] text-[var(--green)] uppercase transition-all hover:bg-[var(--green)] hover:text-white rounded-sm cursor-none"
                  >
                    <Download className="inline-block w-4 h-4 mr-2 -mt-1" /> 이력서 다운로드
                  </button>
                </div>
              </div>

              <div className="px-8 md:px-20 py-16 flex flex-col items-center gap-8">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--ink3)] text-center">— Resume Image Socket —</p>
                <p className="text-[13px] text-[var(--ink3)] max-w-[500px] text-center font-light">
                  이곳은 이력서 이미지가 들어가는 자리입니다. <br />
                  `src/data/portfolio.ts`의 `resumeImageUrl`에 이미지 경로를 입력하거나, 아래에 이미지를 직접 업로드하세요.
                </p>
                
                {uploadedImages.length === 0 ? (
                  <div 
                    className="w-full max-w-[860px] border-2 border-dashed border-[var(--line)] rounded-lg bg-white min-h-[480px] flex flex-col items-center justify-center relative overflow-hidden transition-all hover:border-[var(--green-mid)] hover:bg-[var(--green-lt)] cursor-none"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      processFiles(e.dataTransfer.files);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center gap-4 pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-[var(--green-lt)] flex items-center justify-center">
                        <Upload className="w-6 h-6 text-[var(--green)]" />
                      </div>
                      <p className="text-[15px] text-[var(--ink2)] font-medium">이미지를 여기에 드롭하세요</p>
                      <p className="font-mono text-[11px] text-[var(--ink3)] tracking-tight">PNG · JPG · WEBP &nbsp;|&nbsp; 여러 파일 선택 가능</p>
                      <button className="mt-4 px-7 py-3 border-[1.5px] border-[var(--green)] rounded-sm font-mono text-[11px] tracking-[0.15em] uppercase text-[var(--green)] hover:bg-[var(--green)] hover:text-white transition-all">파일 선택하기</button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-[860px] flex flex-col items-center gap-6">
                    <div className="w-full border border-[var(--line)] rounded-md bg-white overflow-hidden shadow-xl relative group">
                      <img src={uploadedImages[resumePage]} alt="Resume" className="w-full block" />
                      <button 
                        onClick={removeImage}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-[var(--line)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:border-red-200 cursor-none"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    {uploadedImages.length > 1 && (
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => setResumePage(prev => Math.max(0, prev - 1))}
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                          className="p-2 border border-[var(--line)] rounded-sm hover:border-[var(--green)] hover:text-[var(--green)] transition-all cursor-none"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="font-mono text-[11px] text-[var(--ink3)] tracking-widest">{resumePage + 1} / {uploadedImages.length}</span>
                        <button 
                          onClick={() => setResumePage(prev => Math.min(uploadedImages.length - 1, prev + 1))}
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                          className="p-2 border border-[var(--line)] rounded-sm hover:border-[var(--green)] hover:text-[var(--green)] transition-all cursor-none"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                    <button 
                      onClick={removeImage}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className="px-6 py-2 border border-red-200 text-red-500 font-mono text-[10px] tracking-widest uppercase rounded-sm hover:bg-red-50 transition-all cursor-none"
                    >
                      이미지 제거
                    </button>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  multiple 
                  onChange={handleFileUpload} 
                />
              </div>
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-8 md:px-20 py-36 relative overflow-hidden min-h-screen"
            >
              <div className="contact-stripe absolute top-0 right-0 bottom-0 w-[38%] bg-[var(--bg2)] z-0" />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.25em] text-[var(--green)] uppercase mb-5">— 함께 만들어봐요</p>
                  <h1 className="font-serif text-[clamp(2.8rem,5vw,4.5rem)] leading-[1.05] text-[var(--ink)] mb-10 tracking-tight">
                    Let's<br />work<br /><span className="italic text-[var(--green)]">together.</span>
                  </h1>
                  <div className="flex flex-col gap-1">
                    {[
                      { label: 'Email', value: portfolioData.email, href: `mailto:${portfolioData.email}` },
                      { label: 'Behance', value: portfolioData.behance, href: '#' },
                      { label: 'LinkedIn', value: portfolioData.linkedin, href: '#' },
                    ].map((link, idx) => (
                      <a 
                        key={idx}
                        href={link.href}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="flex items-center gap-5 py-4 border-b border-[var(--line)] group transition-all hover:border-[var(--green-mid)] cursor-none"
                      >
                        <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--ink3)] uppercase min-w-[80px]">{link.label}</span>
                        <span className="text-[15px] text-[var(--ink2)] group-hover:text-[var(--green)] transition-colors flex-1">{link.value}</span>
                        <ArrowUpRight className="w-4 h-4 text-[var(--line)] group-hover:text-[var(--green)] transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-8 rounded-sm border border-[var(--line)]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-[0.18em] text-[var(--ink3)] uppercase">이름</label>
                      <input type="text" className="bg-white border border-[var(--line)] rounded-sm p-3 text-[14px] outline-none focus:border-[var(--green-mid)] transition-all cursor-none" placeholder="홍길동" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-[0.18em] text-[var(--ink3)] uppercase">이메일</label>
                      <input type="email" className="bg-white border border-[var(--line)] rounded-sm p-3 text-[14px] outline-none focus:border-[var(--green-mid)] transition-all cursor-none" placeholder="hello@example.com" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mb-6">
                    <label className="font-mono text-[10px] tracking-[0.18em] text-[var(--ink3)] uppercase">프로젝트 유형</label>
                    <input type="text" className="bg-white border border-[var(--line)] rounded-sm p-3 text-[14px] outline-none focus:border-[var(--green-mid)] transition-all cursor-none" placeholder="Game UI, 브랜딩, 모션 그래픽..." onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} />
                  </div>
                  <div className="flex flex-col gap-2 mb-8">
                    <label className="font-mono text-[10px] tracking-[0.18em] text-[var(--ink3)] uppercase">메시지</label>
                    <textarea className="bg-white border border-[var(--line)] rounded-sm p-3 text-[14px] h-[130px] resize-none outline-none focus:border-[var(--green-mid)] transition-all cursor-none" placeholder="프로젝트에 대해 이야기해주세요" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} />
                  </div>
                  <button 
                    className="w-full py-4 bg-[var(--green)] text-white font-mono text-[11px] tracking-[0.18em] uppercase rounded-sm hover:bg-[#235c42] active:scale-[0.98] transition-all cursor-none"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    Send Message →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
