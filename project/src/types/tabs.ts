
import { ComponentType } from 'react';
import { FilmDescription, FilmDetails } from './film';

export type Tab<T> = {
  id: number;
  title: string;
  props: T;
  component: ComponentType<T>;
}

export type FilmTabs = [
  Tab<FilmDescription>,
  Tab<FilmDetails>
];
