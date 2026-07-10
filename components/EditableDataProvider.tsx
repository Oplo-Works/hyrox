"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { siteConfig } from "@/data/site";

/**
 * EditableDataProvider
 *
 * 클라이언트 사이드에서 모임/이벤트 데이터를 localStorage에 저장하고
 * 하위 컴포넌트에 제공합니다.
 *
 * - 초기 로드: localStorage에 저장된 값이 있으면 사용, 없으면 siteConfig 기본값
 * - 인증 상태: manager가 비밀번호 통과 시 isManagerAuthed = true
 * - 업데이트: updateNextMeetup / updateUpcomingEvents / resetToDefaults
 *
 * NOTE: localStorage는 브라우저별로 저장되므로, 운영자가 수정한 내용은
 * 해당 브라우저에서만 보입니다. 영구 반영을 위해서는 data/site.ts를 직접 수정해야 합니다.
 */

const STORAGE_KEY = "nynj-hybrid-race-club:editable-data";
const AUTH_KEY = "nynj-hybrid-race-club:manager-auth";

type NextMeetupData = typeof siteConfig.nextMeetup;
type UpcomingEventData = (typeof siteConfig.upcomingEvents)[number];
type UpcomingEventsData = UpcomingEventData[];

type EditableData = {
  nextMeetup: NextMeetupData;
  upcomingEvents: UpcomingEventsData;
};

type EditableDataContextValue = {
  data: EditableData;
  isManagerAuthed: boolean;
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
  authenticate: (password: string) => boolean;
  logout: () => void;
  updateNextMeetup: (nextMeetup: NextMeetupData) => void;
  updateUpcomingEvents: (events: UpcomingEventsData) => void;
  resetToDefaults: () => void;
};

const EditableDataContext = createContext<EditableDataContextValue | null>(null);

export function useEditableData() {
  const ctx = useContext(EditableDataContext);
  if (!ctx) {
    throw new Error("useEditableData must be used within EditableDataProvider");
  }
  return ctx;
}

export function EditableDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<EditableData>({
    nextMeetup: siteConfig.nextMeetup,
    upcomingEvents: siteConfig.upcomingEvents,
  });
  const [isManagerAuthed, setIsManagerAuthed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // 초기 로드: localStorage에서 데이터 복원
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as EditableData;
        setData(parsed);
      }
      const authed = sessionStorage.getItem(AUTH_KEY) === "true";
      if (authed) setIsManagerAuthed(true);
    } catch {
      // localStorage 접근 실패 시 기본값 유지
    }
    setHydrated(true);
  }, []);

  // 데이터 저장
  const persistData = useCallback((newData: EditableData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch {
      // 저장 실패 시 무시
    }
  }, []);

  const updateNextMeetup = useCallback(
    (nextMeetup: NextMeetupData) => {
      setData((prev) => {
        const updated = { ...prev, nextMeetup };
        persistData(updated);
        return updated;
      });
    },
    [persistData]
  );

  const updateUpcomingEvents = useCallback(
    (events: UpcomingEventsData) => {
      setData((prev) => {
        const updated = { ...prev, upcomingEvents: events };
        persistData(updated);
        return updated;
      });
    },
    [persistData]
  );

  const resetToDefaults = useCallback(() => {
    const defaults: EditableData = {
      nextMeetup: siteConfig.nextMeetup,
      upcomingEvents: siteConfig.upcomingEvents,
    };
    setData(defaults);
    persistData(defaults);
  }, [persistData]);

  const authenticate = useCallback((password: string) => {
    if (password === siteConfig.managerPassword) {
      setIsManagerAuthed(true);
      try {
        sessionStorage.setItem(AUTH_KEY, "true");
      } catch {
        // sessionStorage 접근 실패 시 무시
      }
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsManagerAuthed(false);
    setIsEditing(false);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      // 무시
    }
  }, []);

  // hydrated 전에는 기본값 렌더 (hydration mismatch 방지)
  const value: EditableDataContextValue = {
    data: hydrated ? data : { nextMeetup: siteConfig.nextMeetup, upcomingEvents: siteConfig.upcomingEvents },
    isManagerAuthed: hydrated && isManagerAuthed,
    isEditing,
    setIsEditing,
    authenticate,
    logout,
    updateNextMeetup,
    updateUpcomingEvents,
    resetToDefaults,
  };

  return (
    <EditableDataContext.Provider value={value}>
      {children}
    </EditableDataContext.Provider>
  );
}