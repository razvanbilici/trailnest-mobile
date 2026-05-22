import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  TrailDetails: { trailId: string };
  GlampingDetails: { glampingId: string };
};

export type TrailsStackParamList = {
  Trails: undefined;
  TrailDetails: { trailId: string };
};

export type GlampingStackParamList = {
  Glamping: undefined;
  GlampingDetails: { glampingId: string };
};

export type ExcursionsStackParamList = {
  Excursions: undefined;
  TrailDetails: { trailId: string };
  GlampingDetails: { glampingId: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
};

export type StoriesStackParamList = {
  Stories: undefined;
  StoryViewer: { storyId: string };
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  TrailsTab: NavigatorScreenParams<TrailsStackParamList>;
  StoriesTab: NavigatorScreenParams<StoriesStackParamList>;
  GlampingTab: NavigatorScreenParams<GlampingStackParamList>;
  ExcursionsTab: NavigatorScreenParams<ExcursionsStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};
