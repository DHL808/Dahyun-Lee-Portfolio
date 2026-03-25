import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  name: "Dahyun Lee",
  role: "UX / UI Designer · Visual Creator",
  description: "사용자 경험을 중심에 두고 게임, 그래픽, 비디오 전반에 걸쳐 브랜드와 서비스를 시각화합니다.",
  email: "dahyun@example.com",
  behance: "behance.net/dahyunlee",
  linkedin: "linkedin.com/in/dahyunlee",
  resumeImageUrl: "", // 여기에 이력서 이미지 URL을 넣으면 자동으로 표시됩니다.
  categories: [
    {
      id: "game",
      name: "Game",
      letter: "G",
      description: "인게임 UX/UI 시스템 설계, HUD 디자인, 메뉴 플로우, 플레이어 경험 최적화.",
      projects: [
        { id: "g1", title: "Nexus HUD System", type: "Game UI/UX", year: "2024", tag: "HUD", placeholder: "G1" },
        { id: "g2", title: "Lobby UI Flow", type: "UX Design", year: "2024", tag: "Menu", placeholder: "G2" },
        { id: "g3", title: "In-Game Icon Pack", type: "Visual", year: "2023", tag: "Icon", placeholder: "G3" },
        { id: "g4", title: "Onboarding Flow", type: "UX Research", year: "2023", tag: "UX", placeholder: "G4" },
        { id: "g5", title: "Inventory System UI", type: "Game UI", year: "2023", tag: "UI", placeholder: "G5" },
        { id: "g6", title: "Key Visual", type: "Visual Design", year: "2022", tag: "KV", placeholder: "G6" },
      ]
    },
    {
      id: "graphic",
      name: "Graphic",
      letter: "G",
      description: "서비스 디자인, 편집 디자인, 인포메이션 디자인, 브랜딩, 그래픽 아이덴티티.",
      projects: [
        { id: "gr1", title: "서비스 디자인 프로젝트", type: "Service Design", year: "2024", tag: "Service", placeholder: "GR1" },
        { id: "gr2", title: "매거진 편집 디자인", type: "Editorial", year: "2024", tag: "Editorial", placeholder: "GR2" },
        { id: "gr3", title: "인포그래픽 시스템", type: "Information Design", year: "2024", tag: "Info", placeholder: "GR3" },
        { id: "gr4", title: "브랜드 아이덴티티", type: "Branding", year: "2023", tag: "Brand", placeholder: "GR4" },
        { id: "gr5", title: "포스터 시리즈", type: "Graphic", year: "2023", tag: "Graphic", placeholder: "GR5" },
        { id: "gr6", title: "패키지 디자인", type: "Branding", year: "2022", tag: "Brand", placeholder: "GR6" },
      ]
    },
    {
      id: "video",
      name: "Video",
      letter: "V",
      description: "모션 그래픽, 뮤직비디오 디렉션, 영상 편집. 움직임으로 이야기를 만듭니다.",
      projects: [
        { id: "v1", title: "브랜드 모션 그래픽", type: "Motion Graphic", year: "2024", tag: "Motion", placeholder: "V1" },
        { id: "v2", title: "타이틀 시퀀스", type: "Motion Graphic", year: "2024", tag: "Motion", placeholder: "V2" },
        { id: "v3", title: "뮤직비디오 디렉션", type: "Music Video", year: "2023", tag: "MV", placeholder: "V3" },
        { id: "v4", title: "MV 아트 디렉션", type: "Music Video", year: "2023", tag: "MV", placeholder: "V4" },
        { id: "v5", title: "단편 영상 편집", type: "Video Editing", year: "2022", tag: "Edit", placeholder: "V5" },
        { id: "v6", title: "광고 영상 편집", type: "Video Editing", year: "2022", tag: "Edit", placeholder: "V6" },
      ]
    }
  ]
};
