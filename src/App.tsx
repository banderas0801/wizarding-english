import { Routes, Route } from 'react-router-dom'
import { CurriculumProvider } from './contexts/CurriculumContext'
import Portal from './pages/Portal'
import LanguageSelection from './pages/LanguageSelection'
import SortingCeremony from './pages/SortingCeremony'
import HogwartsMapEnhanced from './pages/HogwartsMap_Enhanced'
import LocationDetail from './pages/LocationDetail'
import QuestDetail from './pages/QuestDetail'
import Victory from './pages/Victory'
import CurriculumCenterEnhanced from './pages/CurriculumCenter_Enhanced'
import Inventory from './pages/Inventory'
import DragonQuest from './pages/DragonQuest'
import CombatArena from './pages/CombatArena'
import MidnightDuelQuest from './pages/MidnightDuelQuest'
import SentenceStructureQuest from './pages/SentenceStructureQuest'
import LessonEvan from './pages/LessonEvan'
import StageSession from './pages/StageSession'
import Shop from './pages/Shop'
import EquipmentDetail from './pages/EquipmentDetail'
import DailyQuests from './pages/DailyQuests'
import Titles from './pages/Titles'
import Leaderboard from './pages/Leaderboard'
import Inbox from './pages/Inbox'
import PotionBrewing from './pages/PotionBrewing'
import SeekerChallenge from './pages/SeekerChallenge'
import SphinxRiddle from './pages/SphinxRiddle'
import DragonDuel from './pages/DragonDuel'
import PatronusCharm from './pages/PatronusCharm'
import Transfiguration from './pages/Transfiguration'
import WorldMap from './pages/WorldMap'
import CareOfMagicalCreatures from './pages/CareOfMagicalCreatures'
import HistoryOfMagic from './pages/HistoryOfMagic'
import AstronomyClass from './pages/AstronomyClass'
import HerbologyClass from './pages/HerbologyClass'
import BoggartClass from './pages/BoggartClass'
import ArithmancyClass from './pages/ArithmancyClass'
import FlyingClass from './pages/FlyingClass'
import HalloweenFeast from './pages/HalloweenFeast'
import MazeRiddle from './pages/MazeRiddle'
import QuidditchFinal from './pages/QuidditchFinal'
import ChamberOfSecrets from './pages/ChamberOfSecrets'
import LevitationClass from './pages/LevitationClass'
import HospitalWing from './pages/HospitalWing'
import ParentDashboard from './pages/ParentDashboard'
import PensieveMemory from './pages/PensieveMemory'
import RoomOfRequirement from './pages/RoomOfRequirement'
import Profile from './pages/Profile'

export default function App() {
  return (
    <CurriculumProvider>
      <div
        className="relative mx-auto overflow-y-auto overflow-x-hidden bg-black"
        style={{ width: '100vw', height: '100dvh', boxShadow: '0 0 40px rgba(0,0,0,0.3)' }}
      >
        <Routes>
        {/* Entry Portal */}
        <Route path="/portal" element={<Portal />} />
        
        {/* MVP Flow: Language → Sorting → Map → Lesson → Victory */}
        <Route path="/select-language" element={<LanguageSelection />} />
        <Route path="/sorting" element={<SortingCeremony />} />
        <Route path="/" element={<WorldMap />} />
        <Route path="/hogwarts-map" element={<HogwartsMapEnhanced />} />
        <Route path="/location/:name" element={<LocationDetail />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/equipment/:id" element={<EquipmentDetail />} />
        <Route path="/combat" element={<CombatArena />} />
        <Route path="/lesson/evan" element={<LessonEvan />} />
        <Route path="/stage" element={<StageSession />} />
        <Route path="/quest/y4-dragon" element={<DragonQuest />} />
        <Route path="/quest/1-daily-warm-ups-reading-grade-1-p100" element={<SentenceStructureQuest />} />
        <Route path="/quest/1-daily-warm-ups-reading-grade-1-p101" element={<MidnightDuelQuest />} />
        <Route path="/quest/:id" element={<QuestDetail />} />
        <Route path="/curriculum" element={<CurriculumCenterEnhanced />} />
        <Route path="/daily-quests" element={<DailyQuests />} />
        <Route path="/titles" element={<Titles />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/quest/potion" element={<PotionBrewing />} />
        <Route path="/quest/seeker" element={<SeekerChallenge />} />
        <Route path="/quest/sphinx" element={<SphinxRiddle />} />
        <Route path="/quest/dragon" element={<DragonDuel />} />
        <Route path="/quest/patronus" element={<PatronusCharm />} />
        <Route path="/quest/transfiguration" element={<Transfiguration />} />
        <Route path="/map" element={<WorldMap />} />
        <Route path="/lesson/creatures" element={<CareOfMagicalCreatures />} />
        <Route path="/library" element={<HistoryOfMagic />} />
        <Route path="/lesson/astronomy" element={<AstronomyClass />} />
        <Route path="/lesson/herbology" element={<HerbologyClass />} />
        <Route path="/lesson/boggart" element={<BoggartClass />} />
        <Route path="/lesson/arithmancy" element={<ArithmancyClass />} />
        <Route path="/lesson/flying" element={<FlyingClass />} />
        <Route path="/event/halloween" element={<HalloweenFeast />} />
        <Route path="/quest/maze" element={<MazeRiddle />} />
        <Route path="/quest/quidditch-final" element={<QuidditchFinal />} />
        <Route path="/quest/chamber" element={<ChamberOfSecrets />} />
        <Route path="/lesson/levitation" element={<LevitationClass />} />
        <Route path="/location/hospital" element={<HospitalWing />} />
        <Route path="/parent-portal" element={<ParentDashboard />} />
        <Route path="/quest/pensieve" element={<PensieveMemory />} />
        <Route path="/quest/room-of-requirement" element={<RoomOfRequirement />} />
        <Route path="/victory" element={<Victory />} />
      </Routes>
      </div>
    </CurriculumProvider>
  )
}
