import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CurriculumProvider } from './contexts/CurriculumContext'
import { AppShell } from './components/common/AppShell'

// ── Critical path — eager ─────────────────────────────────────────────────────
import WorldMap from './pages/WorldMap'
import StageSession from './pages/StageSession'
import Portal from './pages/Portal'

// ── Lazy loaded ───────────────────────────────────────────────────────────────
const LanguageSelection      = lazy(() => import('./pages/LanguageSelection'))
const SortingCeremony        = lazy(() => import('./pages/SortingCeremony'))
const HogwartsMapEnhanced    = lazy(() => import('./pages/HogwartsMap_Enhanced'))
const LocationDetail         = lazy(() => import('./pages/LocationDetail'))
const QuestDetail            = lazy(() => import('./pages/QuestDetail'))
const Victory                = lazy(() => import('./pages/Victory'))
const CurriculumCenterEnhanced = lazy(() => import('./pages/CurriculumCenter_Enhanced'))
const Inventory              = lazy(() => import('./pages/Inventory'))
const DragonQuest            = lazy(() => import('./pages/DragonQuest'))
const CombatArena            = lazy(() => import('./pages/CombatArena'))
const MidnightDuelQuest      = lazy(() => import('./pages/MidnightDuelQuest'))
const SentenceStructureQuest = lazy(() => import('./pages/SentenceStructureQuest'))
const LessonEvanEnhanced     = lazy(() => import('./pages/LessonEvan_Enhanced'))
const Shop                   = lazy(() => import('./pages/Shop'))
const EquipmentDetail        = lazy(() => import('./pages/EquipmentDetail'))
const DailyQuests            = lazy(() => import('./pages/DailyQuests'))
const Titles                 = lazy(() => import('./pages/Titles'))
const Leaderboard            = lazy(() => import('./pages/Leaderboard'))
const Inbox                  = lazy(() => import('./pages/Inbox'))
const PotionBrewing          = lazy(() => import('./pages/PotionBrewing'))
const SeekerChallenge        = lazy(() => import('./pages/SeekerChallenge'))
const SphinxRiddle           = lazy(() => import('./pages/SphinxRiddle'))
const DragonDuel             = lazy(() => import('./pages/DragonDuel'))
const PatronusCharm          = lazy(() => import('./pages/PatronusCharm'))
const Transfiguration        = lazy(() => import('./pages/Transfiguration'))
const CareOfMagicalCreatures = lazy(() => import('./pages/CareOfMagicalCreatures'))
const HistoryOfMagic         = lazy(() => import('./pages/HistoryOfMagic'))
const AstronomyClass         = lazy(() => import('./pages/AstronomyClass'))
const HerbologyClass         = lazy(() => import('./pages/HerbologyClass'))
const BoggartClass           = lazy(() => import('./pages/BoggartClass'))
const ArithmancyClass        = lazy(() => import('./pages/ArithmancyClass'))
const FlyingClass            = lazy(() => import('./pages/FlyingClass'))
const HalloweenFeast         = lazy(() => import('./pages/HalloweenFeast'))
const MazeRiddle             = lazy(() => import('./pages/MazeRiddle'))
const QuidditchFinal         = lazy(() => import('./pages/QuidditchFinal'))
const ChamberOfSecrets       = lazy(() => import('./pages/ChamberOfSecrets'))
const LevitationClass        = lazy(() => import('./pages/LevitationClass'))
const HospitalWing           = lazy(() => import('./pages/HospitalWing'))
const ParentDashboard        = lazy(() => import('./pages/ParentDashboard'))
const PensieveMemory         = lazy(() => import('./pages/PensieveMemory'))
const RoomOfRequirement      = lazy(() => import('./pages/RoomOfRequirement'))
const Profile                = lazy(() => import('./pages/Profile'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'transparent' }}>
      <span className="material-symbols-outlined text-5xl animate-pulse" style={{ color: '#d4af37' }}>auto_fix_high</span>
    </div>
  )
}

export default function App() {
  return (
    <CurriculumProvider>
      <AppShell>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/portal"          element={<Portal />} />
            <Route path="/"                element={<WorldMap />} />
            <Route path="/map"             element={<WorldMap />} />
            <Route path="/stage"           element={<StageSession />} />
            <Route path="/select-language" element={<LanguageSelection />} />
            <Route path="/sorting"         element={<SortingCeremony />} />
            <Route path="/hogwarts-map"    element={<HogwartsMapEnhanced />} />
            <Route path="/location/:locationKey"  element={<LocationDetail />} />
            <Route path="/location/hospital" element={<HospitalWing />} />
            <Route path="/lesson/evan"     element={<LessonEvanEnhanced />} />
            <Route path="/curriculum"      element={<CurriculumCenterEnhanced />} />
            <Route path="/quest/y4-dragon" element={<DragonQuest />} />
            <Route path="/quest/1-daily-warm-ups-reading-grade-1-p100" element={<SentenceStructureQuest />} />
            <Route path="/quest/1-daily-warm-ups-reading-grade-1-p101" element={<MidnightDuelQuest />} />
            <Route path="/quest/potion"    element={<PotionBrewing />} />
            <Route path="/quest/seeker"    element={<SeekerChallenge />} />
            <Route path="/quest/sphinx"    element={<SphinxRiddle />} />
            <Route path="/quest/dragon"    element={<DragonDuel />} />
            <Route path="/quest/patronus"  element={<PatronusCharm />} />
            <Route path="/quest/transfiguration" element={<Transfiguration />} />
            <Route path="/quest/maze"      element={<MazeRiddle />} />
            <Route path="/quest/quidditch-final" element={<QuidditchFinal />} />
            <Route path="/quest/chamber"   element={<ChamberOfSecrets />} />
            <Route path="/quest/pensieve"  element={<PensieveMemory />} />
            <Route path="/quest/room-of-requirement" element={<RoomOfRequirement />} />
            <Route path="/quest/:id"       element={<QuestDetail />} />
            <Route path="/lesson/creatures" element={<CareOfMagicalCreatures />} />
            <Route path="/lesson/astronomy" element={<AstronomyClass />} />
            <Route path="/lesson/herbology" element={<HerbologyClass />} />
            <Route path="/lesson/boggart"  element={<BoggartClass />} />
            <Route path="/lesson/arithmancy" element={<ArithmancyClass />} />
            <Route path="/lesson/flying"   element={<FlyingClass />} />
            <Route path="/lesson/levitation" element={<LevitationClass />} />
            <Route path="/event/halloween" element={<HalloweenFeast />} />
            <Route path="/library"         element={<HistoryOfMagic />} />
            <Route path="/combat"          element={<CombatArena />} />
            <Route path="/inventory"       element={<Inventory />} />
            <Route path="/profile"         element={<Profile />} />
            <Route path="/shop"            element={<Shop />} />
            <Route path="/equipment/:id"   element={<EquipmentDetail />} />
            <Route path="/daily-quests"    element={<DailyQuests />} />
            <Route path="/titles"          element={<Titles />} />
            <Route path="/leaderboard"     element={<Leaderboard />} />
            <Route path="/inbox"           element={<Inbox />} />
            <Route path="/parent-portal"   element={<ParentDashboard />} />
            <Route path="/victory"         element={<Victory />} />
          </Routes>
        </Suspense>
      </AppShell>
    </CurriculumProvider>
  )
}
