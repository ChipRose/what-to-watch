export type TabButtonType = {
  id: number;
  title: string;
}

export type TabType = TabButtonType & {
  component: JSX.Element;
}

export type TabsType = TabType[];
