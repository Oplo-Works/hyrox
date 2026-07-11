import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NextMeetup from "@/components/NextMeetup";
import TrainingTypes from "@/components/TrainingTypes";
import UpcomingEvents from "@/components/UpcomingEvents";
import AllLevelsWelcome from "@/components/AllLevelsWelcome";
import JoinOpenChat from "@/components/JoinOpenChat";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import ScrollEnergy from "@/components/ScrollEnergy";
import WorkoutSilhouettes from "@/components/WorkoutSilhouettes";
import { EditableDataProvider } from "@/components/EditableDataProvider";

/**
 * NY/NJ Hybrid Race Club — 메인 랜딩 페이지
 * 빌드 브리프 10장 순서대로 섹션 조립
 * EditableDataProvider: NextMeetup / UpcomingEvents 인라인 수정 기능 제공
 */
export default function Home() {
  return (
    <EditableDataProvider>
      <Header />
      <ScrollEnergy />
      <WorkoutSilhouettes />
      <main>
        {/* 10.2 Hero */}
        <Hero />

        {/* 10.3 Next Meetup */}
        <NextMeetup />

        {/* 10.4 What We Train */}
        <TrainingTypes />

        {/* 10.5 Upcoming Goals / Events */}
        <UpcomingEvents />

        {/* 10.6 All Levels Welcome */}
        <AllLevelsWelcome />

        {/* 10.7 Join Kakao OpenChat */}
        <JoinOpenChat />

        {/* 10.8 FAQ */}
        <FAQ />
      </main>

      {/* 10.9 Footer */}
      <Footer />

      {/* 11. Sticky Mobile CTA */}
      <StickyCTA />
    </EditableDataProvider>
  );
}
