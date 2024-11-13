
import { ComponentType } from 'react';
import { FilmDescription } from './film';

export type Tab = {
  id: number;
  title: string;
}

export type TabContent<T> = {
  id: number;
  component: ComponentType<T>;
}

export type Tabs = Tab[]
export type TabsContent = [
  TabContent<FilmDescription>,
  TabContent<FilmDescription>,
  TabContent<FilmDescription>,
]
