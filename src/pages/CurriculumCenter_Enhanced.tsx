import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useCurriculum } from '../contexts/CurriculumContext';

export default function CurriculumCenterEnhanced() {
  const navigate = useNavigate();
  const { curriculum, loading, error, getTotalLessons, getTotalXp } = useCurriculum();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeYear, setActiveYear] = useState<number>(3); // Default to year 3 for demo
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const subjectTranslations: Record<string, string> = {
    'reading': 'Bùa Chú Căn Bản',
    'writing': 'Độc Dược Căn Bản',
    'math': 'Số Học Phép Thuật',
    'science': 'Thảo Dược Học',
    'vocabulary': 'Từ Vựng Cổ Ngữ',
    'grammar': 'Ngữ Pháp Cổ Ngữ',
    'phonics': 'Ngữ Âm Cổ Ngữ',
  };

  // Calculate actual progress based on real curriculum data
  const totalLessons = getTotalLessons() || 250;
  // Mock completed lessons for UI until user progress state is implemented globally
  const completedLessons = Math.floor(totalLessons * 0.496); 
  const totalXp = getTotalXp() || 14250;
  
  // Get active subjects
  const activeSubjects = useMemo(() => {
    if (!curriculum) return [];
    const level = curriculum.levels.find(l => l.level === activeYear);
    return level ? level.subjects : [];
  }, [curriculum, activeYear]);

  // When a subject is selected
  const selectedSubject = useMemo(() => {
    return activeSubjects.find(s => s.id === selectedSubjectId) || null;
  }, [activeSubjects, selectedSubjectId]);

  // Reset selected subject when year changes
  React.useEffect(() => {
    setSelectedSubjectId(null);
  }, [activeYear]);

  return (
    <div className="bg-surface text-on-surface parchment-texture min-h-[100dvh] overflow-y-auto pb-[34px]">
      {/* Top App Bar with Mobile Safe Area (Top 44px) */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-padding-mobile md:px-container-padding-desktop pt-[44px] pb-4 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            className="w-[48px] h-[48px] flex items-center justify-center rounded-full hover:bg-surface-container active:scale-95 active:brightness-90 transition-all"
            onClick={() => navigate('/')}
            aria-label="Back"
          >
            <span className="material-symbols-outlined text-primary text-2xl">arrow_back</span>
          </button>
          <h1 className="font-headline-md text-primary tracking-tight">Từ Điển Huyền Bí</h1>
        </div>
        <div className="w-[48px] h-[48px] rounded-full overflow-hidden border-2 border-primary/20 shadow-md flex-shrink-0 cursor-pointer active:scale-95 transition-transform">
          <img alt="Ancient Grimoire Profile Icon" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSP4gd1vjt9RX3gDhG2U9GOzqWzOTOogcOXorvWEWcrDqYp1eqhqREEf1WX4h4qhgeftFhneZVKa4RUMgH1McDP0Ubcf3yDKe1dJ0M44iZOg9qiNZeB38j5qno2jWRoV7ABkOP5Vbi99FF6TtRGHRh_JHjDz-w6vbSoEkleLVSVl-t8oj11-oERn69S4Lonfvpy1Q8OlROo3WMbaxtyFohs8JsoHe6EVlDz9_LGaJ3s8jVf-Z5WA0CbwAhH0SmND-UQHH9a6bETDY"/>
        </div>
      </header>

      <main className="pt-[110px] px-container-padding-mobile md:px-container-padding-desktop max-w-5xl mx-auto space-y-10 pb-20">
        {/* Hero & Search Section */}
        <section className="relative overflow-hidden rounded-[16px] p-6 md:p-10 bg-white shadow-md shadow-[rgba(60,47,47,0.1)] border border-outline-variant/30">
          <div className="relative z-10">
            <span className="font-label-md text-outline mb-2 block tracking-widest uppercase opacity-70 text-[12px]">Curriculum Center</span>
            <h2 className="text-[32px] md:font-display-lg text-primary mb-4 leading-tight font-display-lg-mobile">Lộ Trình Học Thuật</h2>
            <p className="text-[16px] font-body-md text-on-surface-variant max-w-2xl mb-8 leading-[1.5]">
              Khám phá những bí mật cổ xưa và làm chủ nghệ thuật phù thủy qua 7 năm học tại học viện huyền bí.
            </p>
            <div className="relative max-w-xl group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">search</span>
              </div>
              <input 
                className="w-full min-h-[48px] pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant/50 focus:border-primary/50 rounded-lg font-body-md text-on-surface focus:ring-0 placeholder:text-outline/60 transition-all shadow-inner" 
                placeholder="Tìm kiếm phép thuật..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          {/* Decorative subtle background */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none">
            <span className="material-symbols-outlined text-[200px]">auto_stories</span>
          </div>
        </section>

        {/* Progression Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-[16px] shadow-sm shadow-[rgba(60,47,47,0.1)] border border-outline-variant flex flex-col items-center text-center active:scale-95 transition-transform cursor-pointer">
            <div className="w-[48px] h-[48px] rounded-full bg-surface-container flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
            </div>
            <span className="font-label-md text-[12px] text-on-surface-variant uppercase tracking-widest mb-1">BÀI HỌC HOÀN THÀNH</span>
            <span className="font-headline-md text-[24px] text-primary">{completedLessons} / {totalLessons}</span>
            <div className="w-full bg-surface-container-highest h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${(completedLessons / totalLessons) * 100}%` }}></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[16px] shadow-sm shadow-[rgba(60,47,47,0.1)] border border-outline-variant flex flex-col items-center text-center active:scale-95 transition-transform cursor-pointer">
            <div className="w-[48px] h-[48px] rounded-full bg-surface-container flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[#D4AF37] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <span className="font-label-md text-on-surface-variant uppercase tracking-widest mb-1">TỔNG MANA (XP)</span>
            <span className="font-headline-md text-primary text-3xl">{totalXp.toLocaleString()}</span>
            <span className="font-caption text-secondary mt-4 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span> +850 tuần này
            </span>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center p-8"><span className="material-symbols-outlined animate-spin text-primary text-4xl">autorenew</span></div>
        )}
        {error && (
          <div className="p-4 bg-error-container text-on-error-container rounded-xl">{error}</div>
        )}

        {/* Vertical Timeline Section */}
        {!loading && !error && curriculum && (
          <section>
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-headline-md text-primary">Hành Trình Học Thuật</h3>
              <span className="font-label-md text-secondary bg-secondary-container px-4 py-2 rounded-full shadow-sm">
                Năm thứ {activeYear}: Đang diễn ra
              </span>
            </div>
            <div className="space-y-8 relative">
              {curriculum.levels.slice(0, 4).map((level, idx) => {
                const isActive = level.level === activeYear;
                const isLocked = level.level > activeYear;
                const isCompleted = level.level < activeYear;
                
                return (
                  <div key={level.level} 
                       className={`flex items-center gap-6 group relative ${idx < 3 ? 'timeline-connector' : ''} ${isLocked ? 'opacity-40' : 'cursor-pointer'}`}
                       onClick={() => !isLocked && setActiveYear(level.level)}>
                    
                    {isActive ? (
                      <div className="w-20 h-20 rounded-full bg-primary-container border-4 border-[#D4AF37] flex items-center justify-center relative z-10 shadow-xl scale-110">
                        <span className="material-symbols-outlined text-[#D4AF37] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>history_toggle_off</span>
                      </div>
                    ) : isCompleted ? (
                      <div className="w-16 h-16 rounded-full bg-surface-container-highest border-2 border-outline flex items-center justify-center relative z-10 shadow-md group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-primary text-3xl">done_all</span>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-surface-container-low border-2 border-dashed border-outline flex items-center justify-center relative z-10">
                        <span className="material-symbols-outlined text-outline text-3xl">lock</span>
                      </div>
                    )}

                    <div className="flex flex-col">
                      <span className={`font-label-md text-sm ${isActive ? 'text-primary font-bold' : 'text-outline'}`}>
                        {level.level === 0 ? 'MẪU GIÁO' : `NĂM ${level.level}`} {isActive ? '(HIỆN TẠI)' : ''}
                      </span>
                      <span className={`font-headline-sm ${isActive ? 'text-primary font-extrabold gold-shimmer' : 'text-on-surface'}`}>
                        {level.title}
                      </span>
                    </div>
                  </div>
                );
              })}
              
              <div className="pl-20 py-2">
                <button className="text-primary font-label-md flex items-center gap-2 hover:underline">
                  Xem toàn bộ hành trình <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Active Lesson Focus Card */}
        <section className="bg-white border border-outline-variant p-6 md:p-8 rounded-[16px] shadow-md shadow-[rgba(60,47,47,0.1)] relative overflow-hidden">
          <div className="absolute top-[-10px] right-[-10px] w-32 h-32 opacity-[0.05] pointer-events-none">
            <span className="material-symbols-outlined text-[120px] text-primary">menu_book</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <h4 className="font-label-md text-[12px] text-secondary uppercase tracking-widest">BÀI HỌC TIẾP THEO</h4>
            </div>
            <h3 className="font-headline-md text-[24px] text-primary mb-4 leading-tight max-w-2xl">Lịch Sử Phép Thuật: Khởi Nghĩa Của Yêu Tinh</h3>
            <p className="text-[16px] font-body-md text-on-surface-variant mb-6 max-w-xl leading-[1.5]">
              Nghiên cứu về các cuộc xung đột quan trọng trong thế giới phù thủy thế kỷ 18.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-outline-variant/20 pt-6">
              <button 
                onClick={() => navigate('/library')}
                className="w-full sm:w-auto min-h-[56px] min-w-[48px] bg-primary hover:bg-primary/90 active:scale-95 active:brightness-90 text-white font-label-md px-8 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                Tiếp Tục Học
                <span className="material-symbols-outlined">play_arrow</span>
              </button>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPPGv5FuLwwuHZgmcdHy0jlE2VdlBe4hrd1bOkBu-SgBJbjFWpEOpO1GGbmmD_t4xlyjeCXVn6f0PLenf8dCrG6PScT4dO9q9L8qwJHdlUF0lUSZlwRJdrIYdoxlVt8AU5tIXdV35nX3LFI6ZkmsWrpnFB4DJBrlYutXD5TQo9-jsJWG2G8Il5cFF19KtgmB1sftMmY0fgSIF0D5RzDKn3Is28u4UHiE6XZXUQ4c0E_QZmujbVcQE4ZIkccVHC9dQ1VFc3dmm5C8s"/>
                  <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-kU5s953m_iD75zthqVM1mYNF-ctfp3aS4NhkL9LKAGRHAzSBXJC6PA4Mi1NpnN4QXIcOd1nKNcANSxHc6OCwgPE4LZ_M6XdYG4H4-SgO6QkxtMbdy7lip71a-jUwmDQG3cQq1pjwZzBx34o6x6fkd1Y3_2Oe2eu19q4Tf7TCvoK0LQLxVgLqP9vGnN6dJL9hMrY4W_xUWI_7umhfO0tyHnn9mePUgXl4fb3LE-KuYwaeoMlg3kRZmZuw_qHBLobcb0Um0NxgQpE"/>
                  <div className="w-10 h-10 rounded-full bg-secondary-container border-2 border-white flex items-center justify-center text-xs font-bold text-on-secondary-container shadow-sm">+12</div>
                </div>
                <span className="font-caption text-on-surface-variant italic">Bạn bè đang cùng học bài này</span>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Subject Details */}
        {!loading && !error && selectedSubject && (
          <section className="animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => setSelectedSubjectId(null)}
                className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high active:scale-95 active:brightness-90 transition-all border border-outline-variant"
              >
                <span className="material-symbols-outlined text-primary">arrow_back</span>
              </button>
              <div>
                <h3 className="font-headline-md text-[24px] text-primary">{subjectTranslations[selectedSubject.id] || selectedSubject.name}</h3>
                <p className="font-body-md text-on-surface-variant">{selectedSubject.totalLessons} Bài giảng trong {selectedSubject.units.length} Chương</p>
              </div>
            </div>

            <div className="space-y-6">
              {selectedSubject.units.map((unit, unitIdx) => (
                <div key={unit.id} className="bg-white border border-outline-variant p-6 rounded-[16px] shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-[40px] h-[40px] rounded-full bg-primary-container text-primary flex items-center justify-center font-bold shadow-inner">
                      {unitIdx + 1}
                    </div>
                    <h4 className="font-headline-sm text-[20px] text-primary">{unit.title}</h4>
                  </div>
                  
                  <div className="space-y-3 pl-[52px]">
                    {unit.lessons.map(lesson => (
                      <button 
                        key={lesson.lessonId}
                        onClick={() => navigate(`/lesson/evan?id=${encodeURIComponent(lesson.lessonId)}`)}
                        className="w-full min-h-[56px] flex items-center justify-between p-4 rounded-xl border border-outline-variant/50 hover:border-primary/50 hover:bg-primary/5 active:scale-95 active:brightness-90 transition-all text-left group bg-surface-container-low"
                      >
                        <div>
                          <p className="font-label-md text-[16px] text-primary group-hover:underline">{lesson.title}</p>
                          <p className="text-sm text-on-surface-variant mt-1 font-bold">✨ {lesson.spellName} • {lesson.completionXp} XP</p>
                        </div>
                        <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-3xl">play_circle</span>
                      </button>
                    ))}
                    {unit.lessons.length === 0 && (
                      <p className="text-sm text-on-surface-variant italic py-2">Chưa có bài học nào trong chương này.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Curriculum Grid (Bento) */}
        {!loading && !error && activeSubjects.length > 0 && !selectedSubject && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-headline-md text-primary">Danh Sách Môn Học</h3>
              <button className="text-primary font-label-md text-sm flex items-center gap-1">Lọc theo năm <span className="material-symbols-outlined text-sm">filter_list</span></button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeSubjects.map((subject, idx) => {
                const isWide = idx === 0 || idx === 3;
                
                if (idx % 2 === 1) {
                  return (
                    <div key={subject.id} className="bg-primary-container text-white p-6 rounded-[16px] border border-primary/20 flex flex-col justify-between active:scale-95 transition-transform cursor-pointer shadow-sm shadow-[rgba(60,47,47,0.1)] relative overflow-hidden min-h-[200px]">
                      <div className="absolute -right-4 -top-4 opacity-10">
                        <span className="material-symbols-outlined text-[80px]">{subject.icon}</span>
                      </div>
                      <div className="relative z-10">
                        <span className="material-symbols-outlined text-[32px] mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>{subject.icon}</span>
                        <h4 className="font-headline-sm text-[20px] mb-2">{subjectTranslations[subject.id] || subject.name}</h4>
                        <p className="text-[16px] font-body-md text-white/80 line-clamp-2 leading-[1.4]">{subject.description}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedSubjectId(subject.id)}
                        className="mt-6 w-full min-h-[48px] text-primary bg-white font-label-md rounded-[8px] active:scale-95 active:brightness-90 transition-all hover:bg-surface-container-lowest"
                      >
                        Vào Lớp Học
                      </button>
                    </div>
                  );
                }

                return (
                  <div 
                    key={subject.id} 
                    onClick={() => setSelectedSubjectId(subject.id)}
                    className={`${isWide ? 'lg:col-span-2' : ''} bg-white p-6 rounded-[16px] border border-outline-variant active:scale-95 active:brightness-90 transition-all cursor-pointer shadow-sm shadow-[rgba(60,47,47,0.1)] hover:border-primary/50`}
                  >
                    <div className="flex justify-between items-start mb-10">
                      <div className="space-y-1">
                        <h4 className="font-headline-sm text-primary">{subjectTranslations[subject.id] || subject.name}</h4>
                        <p className="font-body-md text-on-surface-variant flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary text-lg">location_on</span>
                          {subject.totalLessons} Bài giảng
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl bg-secondary-container text-on-secondary-container group-hover:scale-110 transition-transform shadow-sm">
                        <span className="material-symbols-outlined text-3xl">{subject.icon}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="font-label-md text-on-surface text-sm">Tiến độ khóa học</span>
                        <span className="font-headline-sm text-secondary">0%</span>
                      </div>
                      <div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden shadow-inner">
                        <div className="bg-secondary h-full w-[0%] rounded-full"></div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <span className="font-caption text-on-surface-variant">0/{subject.totalLessons} Bài học</span>
                        <span className="font-caption text-secondary font-bold">Chưa bắt đầu</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
}
